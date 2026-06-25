import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import App from "./App";

describe("Nutri Broow landing page", () => {
  it("renders all required landing sections with UTF-8 accents", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Nutri Broow/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /benefícios/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /conheça o nutricionista/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /jornada de acompanhamento/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /depoimentos/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /faq/i })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });



  it("keeps benefit cards readable on the light background", () => {
    render(<App />);

    const title = screen.getByText(/Plano alimentar sem terrorismo/i);
    const card = title.closest("article");
    expect(card).toHaveClass("bg-white/80");
    expect(card).toHaveClass("border-broow-orange/20");
    expect(title).toHaveClass("text-broow-black");
    expect(screen.getByText(/Estratégia nutricional/i)).toHaveClass("text-zinc-700");
  });

  it("keeps the page sections aligned to only two background families", () => {
    render(<App />);

    const sectionLabels = [
      /benefícios/i,
      /conheça o nutricionista/i,
      /jornada de acompanhamento/i,
      /depoimentos/i,
      /contato/i,
      /faq/i,
    ];

    for (const label of sectionLabels) {
      const section = screen.getByRole("region", { name: label });
      const hasLight = section.classList.contains("site-section-light");
      const hasDark = section.classList.contains("site-section-dark");
      expect(hasLight || hasDark).toBe(true);
      expect(hasLight && hasDark).toBe(false);
    }
  });

  it("uses a pastel orange nutritionist section with a dedicated photo slot", () => {
    render(<App />);

    const section = screen.getByRole("region", { name: /conheça o nutricionista/i });
    expect(section).toHaveClass("nutritionist-intro-section");
    expect(section).toHaveClass("bg-[#FCA311]");

    const photo = screen.getByRole("img", { name: /foto do nutricionista/i });
    expect(photo).toHaveAttribute("src", "/assets/foto-nutricionista.jpg");
    expect(photo).toHaveClass("object-cover");
  });

  it("makes the hero feel personal, readable and action oriented", () => {
    render(<App />);

    expect(screen.getByText(/consultório real/i)).toBeInTheDocument();
    expect(screen.getByText(/atendimento direto com o nutricionista/i)).toBeInTheDocument();
    expect(screen.getAllByText(/composição corporal/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /falar no whatsapp/i })[0]).toHaveAttribute(
      "href",
      "https://wa.me/5521980966678",
    );
    expect(screen.getByRole("link", { name: /conhecer o acompanhamento/i })).toHaveAttribute("href", "#jornada");
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/nutribroow/",
    );
  });

  it("shows the Nutri Broow logo as a round badge without distorting the logo", () => {
    render(<App />);

    const logo = screen.getByRole("img", { name: /logo nutri broow/i });
    expect(logo).toHaveAttribute("src", "/assets/nutri-broow-logo-cropped.png");
    expect(logo).toHaveClass("object-contain");
    expect(logo).toHaveClass("w-24");
    expect(logo).not.toHaveClass("object-cover");
    expect(logo.closest("span")).toHaveClass("rounded-full");

    expect(screen.getAllByRole("img", { name: /nutricionista em atendimento/i })[0]).toHaveAttribute(
      "src",
      "/assets/nutricionista.jpeg",
    );
  });

  it("uses a readable animated caption over the hero photo", () => {
    render(<App />);

    const caption = screen.getByText(/consulta com leitura de rotina/i).closest("div");
    expect(caption).toHaveClass("hero-photo-caption");
    expect(caption).toHaveClass("animate-caption-rise");
  });

  it("presents the offer as a nutrition journey instead of static plans", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /uma jornada clara/i })).toBeInTheDocument();
    expect(screen.getByText(/1. Avaliação/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Plano alimentar/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Ajustes e acompanhamento/i)).toBeInTheDocument();
    expect(screen.getByText(/Escolher próximo passo/i)).toBeInTheDocument();
  });

  it("uses noopener noreferrer on every external blank link", () => {
    render(<App />);

    const blankLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank");

    expect(blankLinks.length).toBeGreaterThan(0);
    for (const link of blankLinks) {
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    }
  });


  it("uses the requested lead contact copy", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Entre em contato com o NutriBroow/i })).toBeInTheDocument();
    expect(screen.getByText(/Preencha o formulário com seu nome, telefone e objetivo/i)).toBeInTheDocument();
    expect(screen.getByText(/a equipe NutriBroow vai retornar/i)).toBeInTheDocument();
  });

  it("validates lead fields before submitting", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /quero minha avaliação/i }));

    expect(await screen.findByText(/informe seu nome/i)).toBeInTheDocument();
    expect(screen.getByText(/email válido/i)).toBeInTheDocument();
    expect(screen.getByText(/telefone com ddd/i)).toBeInTheDocument();
  });

  it("opens WhatsApp with the validated lead message", async () => {
    const openMock = vi.spyOn(window, "open").mockImplementation(() => null);
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/nome/i), "Ana Silva");
    await user.type(screen.getByLabelText(/email/i), "ana@example.com");
    await user.type(screen.getByLabelText(/telefone/i), "+55 11 99999-0000");
    await user.type(screen.getByLabelText(/objetivo/i), "Emagrecimento saudável");
    await user.click(screen.getByRole("button", { name: /quero minha avaliação/i }));

    expect(await screen.findByText(/mensagem pronta no whatsapp/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(openMock).toHaveBeenCalledWith(expect.stringContaining("https://wa.me/5521980966678?text="), "_blank", "noopener,noreferrer");

    const [url] = openMock.mock.calls[0];
    const message = decodeURIComponent(String(url).split("text=")[1]);
    expect(message).toContain("Ana Silva");
    expect(message).toContain("ana@example.com");
    expect(message).toContain("+55 11 99999-0000");
    expect(message).toContain("Emagrecimento saudável");

    openMock.mockRestore();
    fetchMock.mockRestore();
  });
});
