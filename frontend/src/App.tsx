import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Star,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "./index.css";

const whatsappUrl = "https://wa.me/5521980966678";

const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um email válido."),
  phone: z.string().min(8, "Informe um telefone com DDD."),
  goal: z.string().min(6, "Conte seu objetivo em poucas palavras."),
});

type LeadFormData = z.infer<typeof leadSchema>;

const benefits = [
  {
    icon: Utensils,
    title: "Plano alimentar sem terrorismo",
    copy: "Estratégia nutricional que respeita sua rotina, preferências e vida social.",
  },
  {
    icon: Dumbbell,
    title: "Performance e composição corporal",
    copy: "Ajustes para energia, treino, recuperação e evolução mensurável.",
  },
  {
    icon: ShieldCheck,
    title: "Acompanhamento seguro",
    copy: "Conduta guiada por dados, sintomas, histórico e consistência possível.",
  },
];

const journeySteps = [
  {
    title: "1. Avaliação",
    copy: "Primeiro contato para entender rotina, objetivo, histórico, exames e o que já funcionou ou travou antes.",
  },
  {
    title: "2. Plano alimentar",
    copy: "Conduta montada com metas práticas, substituições inteligentes e direção clara para treino, trabalho e fim de semana.",
  },
  {
    title: "3. Ajustes e acompanhamento",
    copy: "Retornos com leitura de progresso, ajustes finos e próximos passos para manter evolução sem extremos.",
  },
];

const testimonials = [
  "Voltei a comer bem sem sentir que estava presa numa dieta.",
  "O acompanhamento encaixou treino, trabalho e fim de semana.",
  "Finalmente entendi o que ajustar sem cortar tudo de uma vez.",
];

const faqs = [
  ["A consulta pode ser online?", "Sim. O atendimento pode ser online, com anamnese e plano individualizado."],
  ["O plano é restritivo?", "A proposta é construir consistência com comida de verdade, sem extremos desnecessários."],
  ["Como funciona o primeiro contato?", "Você envia seus dados, a equipe entende seu objetivo e retorna para alinhar agenda."],
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/nutribroow/", icon: Instagram },
  { label: "WhatsApp", href: whatsappUrl, icon: MessageCircle },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-semibold text-amber-200">{message}</p>;
}

function App() {
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema) });

  function onSubmit(values: LeadFormData) {
    setSubmitState("idle");

    const message = [
      "Olá, NutriBroow! Vim pela landing page e gostaria de agendar uma avaliação.",
      "",
      `Nome: ${values.name}`,
      `Email: ${values.email}`,
      `Telefone: ${values.phone}`,
      `Objetivo: ${values.goal}`,
    ].join("\n");

    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitState("success");
    reset();
  }

  return (
    <main className="min-h-screen bg-broow-black text-white">
      <section className="site-section-light hero-surface relative overflow-hidden border-b border-broow-orange/20 text-broow-black">
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold" aria-label="Nutri Broow início">
            <span className="brand-logo-badge flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-broow-amber/70 bg-black p-2 shadow-lg">
              <img src="/assets/nutri-broow-logo-cropped.png" alt="Logo Nutri Broow" className="h-24 w-24 rounded-full object-contain" />
            </span>
            <span className="sr-only">Nutri Broow</span>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="interactive-cta inline-flex items-center gap-2 rounded-full bg-broow-black px-4 py-2 text-sm font-bold text-broow-amber transition hover:bg-broow-orange hover:text-broow-black">
            Falar no WhatsApp <MessageCircle size={16} aria-hidden="true" />
          </a>
        </nav>

        <div id="top" className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:min-h-[calc(92vh-112px)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="animate-soft-float mb-5 inline-flex rounded-full border border-broow-orange/30 bg-white px-4 py-2 text-sm font-black text-broow-orange shadow-sm">
              Consultório real, estratégia prática e acompanhamento próximo
            </p>
            <h1 className="text-5xl font-black leading-tight text-broow-black sm:text-6xl lg:text-7xl">
              Nutri Broow
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-zinc-800">
              Atendimento direto com o nutricionista para transformar rotina, energia e composição corporal com clareza, ciência e uma estratégia que cabe na sua vida.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="interactive-cta inline-flex items-center justify-center gap-2 rounded-full bg-broow-orange px-6 py-4 font-black text-broow-black shadow-glow transition hover:bg-broow-amber">
                Falar no WhatsApp <MessageCircle size={18} aria-hidden="true" />
              </a>
              <a href="#jornada" className="interactive-cta inline-flex items-center justify-center gap-2 rounded-full border border-broow-black/25 bg-white px-6 py-4 font-bold text-broow-black transition hover:border-broow-orange hover:text-broow-orange">
                Conhecer o acompanhamento <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="metric-chip border-l-4 border-broow-orange bg-white px-4 py-3 shadow-sm">
                <dt className="text-2xl font-black">1:1</dt>
                <dd className="text-sm font-semibold text-zinc-700">Atendimento individual</dd>
              </div>
              <div className="metric-chip border-l-4 border-broow-orange bg-white px-4 py-3 shadow-sm">
                <dt className="text-2xl font-black">100%</dt>
                <dd className="text-sm font-semibold text-zinc-700">Plano personalizado</dd>
              </div>
              <div className="metric-chip border-l-4 border-broow-orange bg-white px-4 py-3 shadow-sm">
                <dt className="text-2xl font-black">Real</dt>
                <dd className="text-sm font-semibold text-zinc-700">Rotina sem extremos</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className="hero-photo-frame overflow-hidden rounded-[2rem] border border-broow-black/10 bg-broow-black shadow-2xl ring-1 ring-broow-amber/40">
              <img src="/assets/nutricionista.jpeg" alt="Nutricionista em atendimento" className="aspect-[4/5] w-full object-cover object-[62%_center]" />
            </div>
            <div className="hero-photo-caption animate-caption-rise absolute bottom-5 left-5 right-5 rounded-2xl border border-broow-amber/45 p-5 shadow-glow backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-broow-amber">Nutri Broow</p>
              <p className="mt-2 text-xl font-black leading-7 text-white">Consulta com leitura de rotina, objetivo e progresso de verdade.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section aria-label="benefícios" className="site-section-light px-5 py-16 text-broow-black sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="feature-card rounded-2xl border border-broow-orange/20 bg-white/80 p-6 shadow-sm">
              <Icon className="text-broow-orange" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-bold text-broow-black">{title}</h2>
              <p className="mt-3 leading-7 text-zinc-700">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="conheça o nutricionista" className="site-section-light nutritionist-intro-section bg-[#FCA311] py-16 text-broow-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <figure className="nutritionist-photo-card hero-photo-frame overflow-hidden rounded-2xl border border-broow-orange/20 bg-white shadow-xl">
            <img src="/assets/foto-nutricionista.jpg" alt="Foto do nutricionista" className="aspect-[4/3] w-full object-cover object-center lg:aspect-[5/4]" />
          </figure>
          <div className="max-w-3xl rounded-2xl border border-broow-orange/15 bg-white/65 p-6 shadow-sm backdrop-blur sm:p-8">
            <p className="font-bold uppercase tracking-[0.18em] text-broow-orange">Conheça o nutricionista</p>
            <h2 className="mt-3 text-4xl font-black leading-tight">Acompanhamento técnico com conversa simples e decisão clara</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              A proposta da Nutri Broow é unir ciência, escuta e praticidade. Cada orientação parte da sua rotina real: horários, treino, fome, preferências, exames e metas.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                "Avaliação individual",
                "Plano possível de seguir",
                "Ajustes por evolução",
              ].map((item) => (
                <div key={item} className="metric-chip flex items-center gap-2 border-l-4 border-broow-orange bg-[#ffe2b8] px-4 py-3 font-bold">
                  <CheckCircle2 size={18} className="text-broow-orange" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <a href="#lead" className="interactive-cta mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-broow-black px-6 py-4 font-black text-broow-amber transition hover:bg-broow-orange hover:text-broow-black">
              Quero minha avaliação <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="jornada" aria-label="jornada de acompanhamento" className="site-section-light py-16 text-broow-black">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.18em] text-broow-orange">Como funciona</p>
              <h2 className="mt-3 text-4xl font-black leading-tight">Uma jornada clara, do primeiro contato aos ajustes</h2>
            </div>
            <a href="#lead" className="interactive-cta inline-flex items-center justify-center gap-2 rounded-full border border-broow-black/20 bg-white px-6 py-4 font-black text-broow-black transition hover:border-broow-orange hover:text-broow-orange">
              Escolher próximo passo <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {journeySteps.map((step) => (
              <article key={step.title} className="feature-card rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <CheckCircle2 className="text-broow-orange" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-zinc-700">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="depoimentos" className="site-section-dark px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black">Resultados que parecem rotina</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((quote) => (
              <figure key={quote} className="feature-card rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex gap-1 text-broow-amber" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={18} fill="currentColor" />)}
                </div>
                <blockquote className="mt-5 leading-7 text-zinc-200">"{quote}"</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="lead" aria-label="contato" className="site-section-dark py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="font-bold uppercase tracking-[0.18em] text-broow-amber">Primeiro passo</p>
            <h2 className="mt-3 text-4xl font-black">Entre em contato com o NutriBroow</h2>
            <p className="mt-4 leading-8 text-zinc-300">Preencha o formulário com seu nome, telefone e objetivo. A equipe NutriBroow vai retornar para entender sua rotina, tirar dúvidas e orientar o melhor próximo passo.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="interactive-cta mt-6 inline-flex items-center gap-2 rounded-full border border-broow-amber/40 px-5 py-3 font-bold text-broow-amber transition hover:border-broow-orange hover:text-broow-orange">
              Falar no WhatsApp <MessageCircle size={18} aria-hidden="true" />
            </a>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-white/10 bg-black/45 p-6 shadow-glow" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-zinc-200">Nome</span>
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-broow-black outline-none transition focus:border-broow-orange focus:ring-4 focus:ring-broow-orange/20" {...register("name")} />
                <FieldError message={errors.name?.message} />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-zinc-200">Email</span>
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-broow-black outline-none transition focus:border-broow-orange focus:ring-4 focus:ring-broow-orange/20" type="email" {...register("email")} />
                <FieldError message={errors.email?.message} />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-zinc-200">Telefone</span>
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-broow-black outline-none transition focus:border-broow-orange focus:ring-4 focus:ring-broow-orange/20" {...register("phone")} />
                <FieldError message={errors.phone?.message} />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-zinc-200">Objetivo</span>
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-broow-black outline-none transition focus:border-broow-orange focus:ring-4 focus:ring-broow-orange/20" {...register("goal")} />
                <FieldError message={errors.goal?.message} />
              </label>
            </div>
            <button disabled={isSubmitting} className="interactive-cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-broow-amber px-6 py-4 font-black text-broow-black transition hover:bg-broow-orange disabled:cursor-wait disabled:opacity-70">
              {isSubmitting ? "Enviando..." : "Quero minha avaliação"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Seus dados serão usados apenas para retorno sobre o atendimento.</p>
            {submitState === "success" && <p className="mt-4 font-bold text-broow-amber">Mensagem pronta no WhatsApp. Confirme o envio para falar com a equipe NutriBroow.</p>}
                      </form>
        </div>
      </section>

      <section aria-label="faq" className="site-section-dark px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-black">FAQ</h2>
          <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group p-5 transition-colors open:bg-white/[0.03]">
                <summary className="cursor-pointer list-none text-lg font-bold text-white transition-colors marker:text-broow-amber hover:text-broow-amber">{question}</summary>
                <p className="mt-3 leading-7 text-zinc-300">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold">Nutri Broow</p>
          <div className="flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="interactive-cta grid h-11 w-11 place-items-center rounded-full border border-white/15 text-broow-amber transition hover:border-broow-orange hover:text-broow-orange">
                <Icon size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
