import { useEffect, useState } from 'react';
import { ArrowRight, Check, Code2, Instagram, Layers } from 'lucide-react';
import { motion, useScroll } from "motion/react";
import heroImage from './img/hero-nexus.jpg';

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-[6px] h-[6px] bg-accent-bright rounded-full"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="absolute top-0 left-0 w-[40px] h-[40px] border border-accent-silver rounded-full"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1 : 0.5,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
      />
    </div>
  );
}

const AnimatedLetters = ({ text }: { text: string }) => {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.02 } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="inline-block"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const revealVariant = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-body font-sans selection:bg-accent-silver/30 selection:text-accent-bright relative">
      <CustomCursor />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-silver/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-bright/5 blur-[120px]" />
      </div>

      {/* Navigation */}
      <header>
        <nav
          aria-label="Navegação principal"
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-auto rounded-full ${
            isScrolled
              ? "bg-[#0A0A0A]/90 backdrop-blur-[20px] border border-[#242424] shadow-2xl"
              : "bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(255,255,255,0.1)]"
          }`}
        >
          <div className="flex items-center gap-8 px-6 py-3">
            <span className="font-display font-bold text-[#F5F5F5] tracking-[0.2em] text-[13px] uppercase">
              NEXUS
            </span>
            <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
              <li><a href="#trabalhos" className="text-[11px] tracking-[2px] uppercase font-medium text-[#C0C0C0] hover:text-white transition-colors">Trabalhos</a></li>
              <li><a href="#servicos" className="text-[11px] tracking-[2px] uppercase font-medium text-[#C0C0C0] hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#contato" className="text-[11px] tracking-[2px] uppercase font-medium text-[#C0C0C0] hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Equipe Nexus"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start text-left max-w-[580px]"
            >
              <motion.p
                variants={revealVariant}
                className="text-[11px] tracking-[3px] uppercase font-medium text-[#6A6A6A] mb-5"
              >
                Sites Pessoais Profissionais
              </motion.p>

              <motion.h1
                variants={revealVariant}
                className="text-[48px] md:text-[72px] font-display font-bold text-[#F5F5F5] leading-[1.02] tracking-[-0.02em] mb-6"
              >
                Seu nome merece um
                <br />
                espaço à altura.
              </motion.h1>

              <motion.p
                variants={revealVariant}
                className="text-[16px] text-[#9A9A9A] font-sans font-light leading-[1.7] mb-10 max-w-[440px]"
              >
                Site profissional entregue em até 7 dias — para vender mais, fechar parcerias e ser levado a sério.
              </motion.p>

              <motion.div variants={revealVariant}>
                <button
                  type="button"
                  className="px-8 py-[14px] rounded-full bg-gradient-to-br from-[#F5F5F5] to-[#D4D4D4] text-[#0A0A0A] font-sans font-bold text-[14px] tracking-[0.03em] transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
                >
                  Falar com Felipe
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Floating Bar */}
          <div className="absolute bottom-8 left-0 right-0 z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6 pt-6"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.15)] md:mx-6" />

              <dl className="flex flex-wrap items-center gap-10 md:gap-20">
                {([
                  ["40+", "Projetos"],
                  ["7 dias", "Prazo médio"],
                  ["100%", "Satisfação"],
                ] as [string, string][]).map(([value, label], i) => (
                  <div key={i} className={i === 2 ? "hidden sm:block" : ""}>
                    <dd className="font-display font-semibold text-[#F5F5F5] text-[28px] md:text-[34px] leading-none">
                      {value}
                    </dd>
                    <dt className="text-[11px] text-[#5A5A5A] font-sans tracking-[1px] uppercase mt-1">
                      {label}
                    </dt>
                  </div>
                ))}
              </dl>

              <div className="flex items-center gap-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md rounded-full px-4 py-2 mt-4 md:mt-0">
                <div className="flex -space-x-2">
                  <img
                    src="https://picsum.photos/seed/r1/32/32"
                    className="w-8 h-8 rounded-full border-2 border-[#141414] grayscale opacity-90"
                    alt="Client Rate"
                  />
                  <img
                    src="https://picsum.photos/seed/r2/32/32"
                    className="w-8 h-8 rounded-full border-2 border-[#141414] grayscale opacity-90"
                    alt="Client Rate"
                  />
                  <img
                    src="https://picsum.photos/seed/r3/32/32"
                    className="w-8 h-8 rounded-full border-2 border-[#141414] grayscale opacity-90"
                    alt="Client Rate"
                  />
                </div>
                <span className="text-[11px] text-[#6A6A6A] font-sans pr-2 tracking-[0.5px]">
                  5 estrelas no Brasil
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="servicos"
          className="py-32 px-6 relative border-t border-accent-silver/10 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-[34px] md:text-[50px] font-display font-bold text-[#F5F5F5] leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto">
                <AnimatedLetters text="Cada detalhe construído para converter." />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={revealVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative p-10 rounded-[24px] bg-[#141414] border border-[#242424] overflow-hidden transition-all duration-500 hover:border-[rgba(255,255,255,0.2)] hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#1C1C1C] border border-[#242424] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Code2 className="w-6 h-6 text-[#C0C0C0] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[20px] font-display font-bold text-[#F5F5F5] leading-snug mb-3">
                    Engenharia Avançada
                  </h3>
                  <p className="text-[15px] text-[#6A6A6A] font-sans font-light leading-[1.7]">
                    Aplicações web de alta performance construídas com frameworks modernos e arquitetura precisa.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={revealVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative p-10 rounded-[24px] bg-[#141414] border border-[#242424] overflow-hidden transition-all duration-500 hover:border-[rgba(255,255,255,0.2)] hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#1C1C1C] border border-[#242424] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Layers className="w-6 h-6 text-[#C0C0C0] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[20px] font-display font-bold text-[#F5F5F5] leading-snug mb-3">
                    Interface Premium
                  </h3>
                  <p className="text-[15px] text-[#6A6A6A] font-sans font-light leading-[1.7]">
                    Interfaces de usuário perfeitas em cada pixel e ricas em movimento, projetadas para o espaço digital de luxo.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={revealVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <button className="group relative px-[42px] py-[18px] rounded-full bg-transparent border border-[rgba(192,192,192,0.35)] text-[#C0C0C0] font-sans font-semibold text-[15px] tracking-[0.5px] overflow-hidden transition-all duration-500 hover:border-[rgba(192,192,192,0.8)] hover:text-[#F5F5F5]">
                <div className="absolute inset-0 bg-[rgba(192,192,192,0.06)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 flex items-center gap-2">
                  Explorar nossos serviços
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="trabalhos" className="py-32 px-6 relative border-t border-accent-silver/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-20"
            >
              <motion.h2
                variants={revealVariant}
                className="text-[40px] md:text-[52px] font-display font-bold text-[#F5F5F5] mb-4 leading-[1.08] tracking-[-0.02em] max-w-2xl"
              >
                Resultados reais para pessoas reais.
              </motion.h2>
              <motion.p variants={revealVariant} className="text-[15px] text-[#6A6A6A] font-sans font-light leading-[1.7] max-w-md">
                Cada projeto entregue com objetivo claro e resultado mensurável.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]"
            >
              {[
                {
                  niche: "Nutricionista",
                  result: "Agenda lotada para os próximos 2 meses após o lançamento.",
                  image: "https://picsum.photos/seed/nutri/800/500",
                },
                {
                  niche: "Coach de Relacionamentos",
                  result: "Começou a fechar clientes pelo site em 2 semanas.",
                  image: "https://picsum.photos/seed/coach2/800/500",
                },
                {
                  niche: "Personal Trainer",
                  result: "Aumentou a retenção de alunos de consultoria online em 40%.",
                  image: "https://picsum.photos/seed/personal/800/500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={revealVariant}
                  className="group relative rounded-[20px] bg-[#141414] border border-[#242424] overflow-hidden transition-all duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[6px] hover:border-[rgba(192,192,192,0.20)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1C1C]">
                    <img
                      src={item.image}
                      alt={item.niche}
                      className="w-full h-full object-cover transition-all duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:brightness-[1.08]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-[20px] flex flex-col">
                    <h3 className="text-[13px] font-sans font-semibold text-[#F5F5F5] tracking-[1.5px] uppercase mb-2">
                      {item.niche}
                    </h3>
                    <p className="text-[14px] text-[#6A6A6A] font-sans font-light leading-[1.7] mb-6">
                      {item.result}
                    </p>
                    <a
                      href="#"
                      className="group/link mt-auto inline-flex items-center text-[13px] font-sans font-semibold text-[#C0C0C0] hover:underline underline-offset-[3px] decoration-1 transition-all"
                    >
                      Ver projeto
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={revealVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <button className="px-6 py-4 md:px-[42px] md:py-[18px] rounded-full bg-transparent border border-[rgba(192,192,192,0.35)] text-[#C0C0C0] font-sans font-semibold text-[15px] tracking-[0.5px] transition-all duration-300 ease-out hover:border-[rgba(192,192,192,0.8)] hover:text-[#F5F5F5] hover:bg-[rgba(192,192,192,0.06)] active:translate-y-0">
                Ver todos os projetos
              </button>
            </motion.div>
          </div>
        </section>

        {/* Capabilities Section — removed: duplicate of Services */}

        {/* Pricing Section */}
        <section
          id="planos"
          className="py-32 px-6 relative border-t border-accent-silver/10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <motion.h2
                variants={revealVariant}
                className="text-[40px] md:text-[52px] font-display font-bold text-[#F5F5F5] mb-4 leading-[1.08] tracking-[-0.02em]"
              >
                Investimento claro,
                <br />
                resultado previsível.
              </motion.h2>
              <motion.p variants={revealVariant} className="text-[15px] text-[#6A6A6A] font-sans font-light leading-[1.7]">
                Escolha o plano certo para o seu momento.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            >
              <motion.div
                variants={revealVariant}
                className="glass-panel p-8 rounded-[24px] border border-accent-silver/10 flex flex-col h-full"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-text-heading mb-2">
                    Presença Básica
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl text-text-body/60 font-medium">R$</span>
                    <span className="text-[48px] font-bold text-text-heading leading-none">
                      347
                    </span>
                  </div>
                  <p className="text-[15px] text-[#9A9A9A] font-sans leading-relaxed">
                    Para quem quer dar o primeiro passo com o pé direito.
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {[
                    "Uma página completa com sua foto, história e links",
                    "Botão direto para seu WhatsApp",
                    "Funciona perfeito no celular",
                    "Pronto em 5 dias",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-body">
                      <Check className="w-5 h-5 text-accent-silver shrink-0 mt-0.5" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full px-6 py-4 md:px-[42px] md:py-[18px] rounded-full bg-transparent border border-[rgba(192,192,192,0.35)] text-[#C0C0C0] font-sans font-semibold text-[15px] tracking-[0.5px] transition-all duration-300 ease-out hover:border-[rgba(192,192,192,0.8)] hover:text-[#F5F5F5] hover:bg-[rgba(192,192,192,0.06)] active:translate-y-0">
                  Quero começar assim
                </button>
              </motion.div>

              <motion.div
                variants={revealVariant}
                className="p-8 rounded-[24px] border border-[rgba(192,192,192,0.30)] bg-[#181818] relative transform lg:scale-[1.03] z-10 flex flex-col h-full"
              >
                <div className="absolute -top-4 right-8 bg-[#C0C0C0] text-[#0A0A0A] text-[11px] font-sans font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Mais escolhido
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-text-heading mb-2">
                    Presença Profissional
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl text-text-body/60 font-medium">R$</span>
                    <span className="text-[48px] font-bold text-text-heading leading-none">
                      697
                    </span>
                  </div>
                  <p className="text-[15px] text-[#9A9A9A] font-sans leading-relaxed">
                    Para quem quer ser levado a sério e vender pelo site.
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {[
                    "Várias páginas (início, sobre você, serviços, contato)",
                    "Espaço para depoimentos dos seus clientes",
                    "Endereço próprio na internet (domínio) incluso por 1 ano",
                    "Pronto em 7 dias",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-heading">
                      <Check className="w-5 h-5 text-accent-silver shrink-0 mt-0.5" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full px-6 py-4 md:px-[42px] md:py-[18px] rounded-full bg-gradient-to-br from-[#D4D4D4] to-[#A0A0A0] text-[#0A0A0A] font-sans font-semibold text-[15px] tracking-[0.5px] transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(192,192,192,0.25)] active:translate-y-0 active:shadow-[0_4px_16px_rgba(192,192,192,0.15)]">
                  Quero este pacote
                </button>
              </motion.div>

              <motion.div
                variants={revealVariant}
                className="glass-panel p-8 rounded-[24px] border border-accent-silver/10 flex flex-col h-full"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-text-heading mb-2">
                    Presença de Autoridade
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl text-text-body/60 font-medium">R$</span>
                    <span className="text-[48px] font-bold text-text-heading leading-none">
                      1.397
                    </span>
                  </div>
                  <p className="text-[15px] text-[#9A9A9A] font-sans leading-relaxed">
                    Para quem quer se posicionar como referência no seu nicho.
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {[
                    "Tudo do pacote anterior",
                    "Espaço para publicar artigos e conteúdos",
                    "Formulário para capturar contatos de interessados",
                    "Integração com sua lista de e-mails",
                    "Pronto em 10 dias",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-body">
                      <Check className="w-5 h-5 text-accent-silver shrink-0 mt-0.5" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full px-6 py-4 md:px-[42px] md:py-[18px] rounded-full bg-transparent border border-[rgba(192,192,192,0.35)] text-[#C0C0C0] font-sans font-semibold text-[15px] tracking-[0.5px] transition-all duration-300 ease-out hover:border-[rgba(192,192,192,0.8)] hover:text-[#F5F5F5] hover:bg-[rgba(192,192,192,0.06)] active:translate-y-0">
                  Quero este pacote
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={revealVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mt-12 text-[13px] text-[#5A5A5A] font-sans"
            >
              Todos os sites incluem suporte pós-entrega. <br className="hidden md:block" />
              Manutenção mensal disponível por R$127/mês.
            </motion.div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section
          id="depoimentos"
          className="py-32 px-6 relative border-t border-accent-silver/10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-left"
            >
              <motion.h2
                variants={revealVariant}
                className="text-[40px] md:text-[52px] font-display font-bold text-[#F5F5F5] leading-[1.08] tracking-[-0.02em] max-w-xl"
              >
                O que dizem quem já tem.
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            >
              {[
                {
                  name: "Carlos",
                  niche: "Especialista em Finanças",
                  quote: "Eu não sabia que precisava de um site até ter um.",
                  image: "https://picsum.photos/seed/carlos/100/100",
                },
                {
                  name: "Mariana",
                  niche: "Mentora de Carreira",
                  quote: "Em 3 semanas fechei uma parceria que nunca teria acontecido sem isso.",
                  image: "https://picsum.photos/seed/mariana/100/100",
                },
                {
                  name: "João",
                  niche: "Consultor de Vendas",
                  quote: "Parece que finalmente sou uma profissional de verdade.",
                  image: "https://picsum.photos/seed/joao/100/100",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={revealVariant}
                  className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center p-[28px] rounded-[18px] border border-[#242424] bg-[#141414] flex flex-col"
                >
                  <div className="text-[#C0C0C0] text-[14px] tracking-widest mb-6">
                    ★★★★★
                  </div>
                  <blockquote className="text-[15px] text-[#C0C0C0] font-sans font-light italic leading-[1.8] mb-8 flex-1">
                    “{item.quote}”
                  </blockquote>
                  <footer className="flex items-center gap-4 mt-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[40px] h-[40px] rounded-full object-cover grayscale opacity-70"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-[14px] text-[#F5F5F5] font-semibold font-display leading-none">
                        {item.name}
                      </p>
                      <p className="text-[12px] text-[#6A6A6A] font-sans mt-1 tracking-[0.3px]">
                        {item.niche}
                      </p>
                    </div>
                  </footer>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section
          id="contato"
          className="py-32 px-6 relative overflow-hidden bg-[#0A0A0A]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[rgba(192,192,192,0.05)] blur-[160px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-center"
            >
              <motion.h2
                variants={revealVariant}
                className="text-[36px] md:text-[52px] font-display font-bold text-[#F5F5F5] leading-[1.08] tracking-[-0.02em] mb-5 max-w-2xl"
              >
                Pronto para ter um site que trabalha por você?
              </motion.h2>
              <motion.p
                variants={revealVariant}
                className="text-[15px] text-[#6A6A6A] font-sans font-light leading-[1.7] mb-12 max-w-[400px]"
              >
                Respondo em menos de 1 hora. Sem formulário, sem enrolação.
              </motion.p>

              <motion.div variants={revealVariant}>
                <button
                  type="button"
                  className="w-full md:w-auto px-10 py-[15px] rounded-full bg-gradient-to-br from-[#D4D4D4] to-[#A0A0A0] text-[#0A0A0A] font-sans font-bold text-[14px] tracking-[0.03em] transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(192,192,192,0.25)] active:translate-y-0"
                >
                  Falar com Felipe agora
                </button>
              </motion.div>

              <motion.div
                variants={revealVariant}
                className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#4A4A4A] font-sans tracking-[0.5px]"
              >
                <span>Sem compromisso · Totalmente gratuito</span>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E1E1E] py-8 px-6 bg-[#0A0A0A] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#1C1C1C] to-[#141414] border border-[#242424] flex items-center justify-center">
              <div className="w-5 h-5 bg-[#0A0A0A] rounded-[2px] flex items-center justify-center">
                <span className="font-display font-bold text-[#F5F5F5] text-[10px] tracking-tighter">
                  NX
                </span>
              </div>
            </div>
            <span className="font-display font-bold text-[#F5F5F5] tracking-widest text-xs">
              NEXUS
            </span>
          </div>

          <small className="text-[11px] font-sans text-[#3A3A3A] text-center tracking-[0.5px]">
            © 2025 Nexus Solutions IA
          </small>

          <a href="#" className="text-[#5A5A5A] hover:text-[#C0C0C0] transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
