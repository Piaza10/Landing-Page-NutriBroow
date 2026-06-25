# Nutri Broow Landing Page

Landing page responsiva para o Nutri Broow, nutricionista focado em acompanhamento alimentar prático, personalizado e sem terrorismo nutricional. O projeto apresenta o profissional, benefícios do acompanhamento, jornada do atendimento, depoimentos, FAQ e um formulário inteligente para captação de leads via WhatsApp.

## Visão geral

A landing foi construída para converter visitantes em contatos qualificados. Em vez de depender de uma API para captar leads, o formulário valida os dados no front-end e abre uma conversa no WhatsApp com uma mensagem pronta contendo nome, email, telefone e objetivo do cliente.

## Funcionalidades

- Hero institucional com CTA para WhatsApp
- Seção de benefícios do acompanhamento nutricional
- Apresentação do nutricionista com foto dedicada
- Jornada do atendimento em etapas
- Depoimentos e FAQ
- Formulário validado com envio por mensagem pronta no WhatsApp
- Links reais para WhatsApp e Instagram
- Layout responsivo com animações sutis
- Testes automatizados do fluxo principal

## Stack

### Front-end

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod
- Lucide React
- Vitest
- Testing Library

## Como rodar

```bash
cd frontend
npm install
npm run dev
```


## Scripts úteis

```bash
npm run dev
npm run build
npm run lint
npm test -- --run
npm audit
```

## Segurança

- O formulário não envia dados para uma API nesta versão.
- Os dados são codificados com `encodeURIComponent` antes de abrir o WhatsApp.
- Links externos usam `noopener noreferrer`.
- Dependências auditadas com `npm audit`.
- Arquivos sensíveis, backend local, ambientes virtuais, banco local e dependências instaladas ficam fora do Git via `.gitignore`.

## Contatos configurados

- WhatsApp: `https://wa.me/*******`
- Instagram: `https://www.instagram.com/nutribroow/`
