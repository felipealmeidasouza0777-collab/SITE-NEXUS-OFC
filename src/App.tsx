import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Check, Code2, Cpu, Globe, Instagram, Layers, Lock, Sparkles, Terminal } from 'lucide-react';

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
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
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
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      <motion.div
        className="absolute top-0 left-0 w-[40px] h-[40px] border border-accent-silver rounded-full"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1 : 0.5,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for blobs (0.3x scroll speed)
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const revealVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
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
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A0A0A]/80 backdrop-blur-[20px] border-b border-accent-silver/10' 
            : 'bg-transparent border-b-0 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-text-heading tracking-widest text-xl">NEXUS</span>
            <span className="font-mono text-accent-silver text-xs tracking-widest uppercase mt-1">SOLUTIONS IA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            <a href="#trabalhos" className="hover:text-text-heading transition-colors">Trabalhos</a>
            <a href="#servicos" className="hover:text-text-heading transition-colors">Serviços</a>
            <a href="#contato" className="hover:text-text-heading transition-colors">Contato</a>
          </div>

          <button className="hidden md:block px-6 py-2.5 rounded-full bg-transparent border border-[rgba(192,192,192,0.35)] text-[#C0C0C0] font-sans font-semibold text-[14px] tracking-[0.5px] transition-all duration-300 ease-out hover:border-[rgba(192,192,192,0.8)] hover:text-[#F5F5F5] hover:bg-[rgba(192,192,192,0.06)] active:translate-y-0">
            Falar com Felipe
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Diagonal Line */}
            <div className="absolute top-[-50%] left-[50%] w-[1px] h-[200%] bg-accent-silver opacity-15 rotate-[35deg] origin-center" />
            
            {/* Drifting Blobs */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[rgba(192,192,192,0.06)] rounded-full blur-[140px] animate-[drift-1_25s_ease-in-out_infinite]" 
            />
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[rgba(255,255,255,0.03)] rounded-full blur-[100px] animate-[drift-2_25s_ease-in-out_infinite_reverse]" 
            />
            
            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl px-6 text-center mt-20 lg:mt-0 flex flex-col items-center justify-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center text-center"
            >
              <motion.p variants={revealVariant} className="text-[10px] tracking-[5px] text-accent-silver uppercase font-sans mb-8 font-medium">
                PARA CRIADORES DE CONTEÚDO
              </motion.p>
              
              <motion.h1 variants={revealVariant} className="text-[38px] lg:text-[60px] font-display font-semibold text-text-heading leading-[1.15] mb-8 max-w-3xl">
                Seu nome merece um espaço à altura do seu trabalho.
              </motion.h1>
              
              <motion.p variants={revealVariant} className="text-[17px] text-text-body mb-12 max-w-[540px] leading-[1.7] font-light">
                Criamos seu site pessoal profissional em até 7 dias — para você vender mais, fechar parcerias e ser levado a sério.
              </motion.p>
              
              <motion.div variants={revealVariant} className="flex flex-col items-center">
                <button className="w-full md:w-auto px-6 py-4 md:px-[42px] md:py-[18px] rounded-full bg-gradient-to-br from-[#D4D4D4] to-[#A0A0A0] text-[#0A0A0A] font-sans font-semibold text-[15px] tracking-[0.5px] transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(192,192,192,0.25)] active:translate-y-0 active:shadow-[0_4px_16px_rgba(192,192,192,0.15)] mb-8">
                  Quero meu site profissional
                </button>
                
                <div className="flex items-center justify-center gap-3 text-[11px] text-text-muted font-sans tracking-wide">
                  <span>Entrega em 7 dias</span>
                  <span className="w-1 h-1 rounded-full bg-text-muted/50"></span>
                  <span>Mais de 40 sites criados</span>
                  <span className="w-1 h-1 rounded-full bg-text-muted/50"></span>
                  <span>Sem complicação</span>
                </div>
              </motion.div>
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
              <motion.h2 variants={revealVariant} className="text-[48px] font-display font-bold text-[#F5F5F5] mb-4 leading-tight">
                Sites que já estão trabalhando por nossos clientes
              </motion.h2>
              <motion.p variants={revealVariant} className="text-[16px] text-[#9A9A9A] font-sans">
                Cada projeto foi feito para uma pessoa real — <br className="hidden md:block" /> com objetivo real e resultado real.
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
                  image: "https://picsum.photos/seed/nutri/800/500"
                },
                {
                  niche: "Coach de Relacionamentos",
                  result: "Começou a fechar clientes pelo site em 2 semanas.",
                  image: "https://picsum.photos/seed/coach2/800/500"
                },
                {
                  niche: "Personal Trainer",
                  result: "Aumentou a retenção de alunos de consultoria online em 40%.",
                  image: "https://picsum.photos/seed/personal/800/500"
                }
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
                    <h3 className="text-[18px] font-display font-bold text-[#F5F5F5] mb-2">{item.niche}</h3>
                    <p className="text-[15px] text-[#9A9A9A] font-sans mb-6 leading-relaxed">
                      {item.result}
                    </p>
                    <a href="#" className="group/link mt-auto inline-flex items-center text-[13px] font-sans font-semibold text-[#C0C0C0] hover:underline underline-offset-[3px] decoration-1 transition-all">
                      Ver projeto <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" />
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

        {/* Capabilities Section */}
        <section id="servicos" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-20"
            >
              <motion.h2 variants={revealVariant} className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">01 // Capabilities</motion.h2>
              <motion.h3 variants={revealVariant} className="text-4xl md:text-5xl font-display font-bold text-text-heading max-w-2xl leading-tight">
                Architecting the future of digital interaction.
              </motion.h3>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Code2 className="w-6 h-6 text-accent-silver" />,
                  title: "Advanced Engineering",
                  desc: "High-performance web applications built with modern frameworks and precise architecture."
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-text-muted" />,
                  title: "AI Integration",
                  desc: "Intelligent systems and machine learning models seamlessly woven into your product."
                },
                {
                  icon: <Layers className="w-6 h-6 text-text-heading" />,
                  title: "Premium Interface",
                  desc: "Pixel-perfect, motion-rich user interfaces designed for the luxury digital space."
                }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  variants={revealVariant}
                  className="glass-panel p-8 rounded-2xl hover:bg-bg-surface-light transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-bg-base border border-accent-silver/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-display font-bold text-text-heading mb-3">{service.title}</h4>
                  <p className="text-text-body font-light leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="planos" className="py-32 px-6 relative border-t border-accent-silver/10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <motion.h2 variants={revealVariant} className="text-[48px] font-display font-bold text-[#F5F5F5] mb-4 leading-tight">
                Quanto custa ter um site que funciona de verdade?
              </motion.h2>
              <motion.p variants={revealVariant} className="text-[16px] text-[#9A9A9A] font-sans">
                Escolha o que faz sentido para o seu momento.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            >
              {/* Card 1: Starter */}
              <motion.div variants={revealVariant} className="glass-panel p-8 rounded-[24px] border border-accent-silver/10 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-text-heading mb-2">Presença Básica</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl text-text-body/60 font-medium">R$</span>
                    <span className="text-[48px] font-bold text-text-heading leading-none">347</span>
                  </div>
                  <p className="text-[15px] text-[#9A9A9A] font-sans leading-relaxed">
                    Para quem quer dar o primeiro passo com o pé direito.
                  </p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {['Uma página completa com sua foto, história e links', 'Botão direto para seu WhatsApp', 'Funciona perfeito no celular', 'Pronto em 5 dias'].map((feature, i) => (
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

              {/* Card 2: Profissional (Featured) */}
              <motion.div 
                variants={revealVariant} 
                className="p-8 rounded-[24px] border border-[rgba(192,192,192,0.30)] bg-[#181818] relative transform lg:scale-[1.03] z-10 flex flex-col h-full"
              >
                <div className="absolute -top-4 right-8 bg-[#C0C0C0] text-[#0A0A0A] text-[11px] font-sans font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Mais escolhido
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-text-heading mb-2">Presença Profissional</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl text-text-body/60 font-medium">R$</span>
                    <span className="text-[48px] font-bold text-text-heading leading-none">697</span>
                  </div>
                  <p className="text-[15px] text-[#9A9A9A] font-sans leading-relaxed">
                    Para quem quer ser levado a sério e vender pelo site.
                  </p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {['Várias páginas (início, sobre você, serviços, contato)', 'Espaço para depoimentos dos seus clientes', 'Endereço próprio na internet (domínio) incluso por 1 ano', 'Pronto em 7 dias'].map((feature, i) => (
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

              {/* Card 3: Autoridade */}
              <motion.div variants={revealVariant} className="glass-panel p-8 rounded-[24px] border border-accent-silver/10 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-text-heading mb-2">Presença de Autoridade</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl text-text-body/60 font-medium">R$</span>
                    <span className="text-[48px] font-bold text-text-heading leading-none">1.397</span>
                  </div>
                  <p className="text-[15px] text-[#9A9A9A] font-sans leading-relaxed">
                    Para quem quer se posicionar como referência no seu nicho.
                  </p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {['Tudo do pacote anterior', 'Espaço para publicar artigos e conteúdos', 'Formulário para capturar contatos de interessados', 'Integração com sua lista de e-mails', 'Pronto em 10 dias'].map((feature, i) => (
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
        <section id="depoimentos" className="py-32 px-6 relative border-t border-accent-silver/10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-left"
            >
              <motion.h2 variants={revealVariant} className="text-[44px] font-display font-bold text-[#F5F5F5] leading-tight">
                Quem já tem, não quer mais ficar sem
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
                  image: "https://picsum.photos/seed/carlos/100/100"
                },
                {
                  name: "Mariana",
                  niche: "Mentora de Carreira",
                  quote: "Em 3 semanas fechei uma parceria que nunca teria acontecido sem isso.",
                  image: "https://picsum.photos/seed/mariana/100/100"
                },
                {
                  name: "João",
                  niche: "Consultor de Vendas",
                  quote: "Parece que finalmente sou uma profissional de verdade.",
                  image: "https://picsum.photos/seed/joao/100/100"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={revealVariant}
                  className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center p-[28px] rounded-[18px] border border-[#242424] bg-[#141414] flex flex-col"
                >
                  <div className="text-[#C0C0C0] text-[14px] tracking-widest mb-6">★★★★★</div>
                  <p className="text-[15px] text-[#D4D4D4] font-sans italic leading-[1.75] mb-8 flex-1">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={item.image} alt={item.name} className="w-[44px] h-[44px] rounded-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
                    <div>
                      <div className="text-[#F5F5F5] font-bold font-display">{item.name}</div>
                      <div className="text-[13px] text-[#9A9A9A] font-sans mt-0.5">{item.niche}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section id="contato" className="py-32 px-6 relative overflow-hidden bg-[#0A0A0A]">
          {/* Spotlight Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[rgba(192,192,192,0.05)] blur-[160px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-center"
            >
              <motion.h2 variants={revealVariant} className="text-[36px] md:text-[54px] font-display font-bold text-[#F5F5F5] leading-tight mb-6 max-w-3xl">
                Você já tem o conteúdo. Falta o espaço certo para ele brilhar.
              </motion.h2>
              <motion.p variants={revealVariant} className="text-[16px] text-[#9A9A9A] font-sans mb-12 max-w-[480px] leading-relaxed">
                Respondo toda mensagem em menos de 1 hora. <br className="hidden md:block" />
                Sem formulário, sem enrolação — só uma conversa.
              </motion.p>
              
              <motion.div variants={revealVariant}>
                <button className="w-full md:w-auto px-6 py-4 md:px-[42px] md:py-[18px] rounded-full bg-gradient-to-br from-[#D4D4D4] to-[#A0A0A0] text-[#0A0A0A] font-sans font-semibold text-[15px] tracking-[0.5px] transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(192,192,192,0.25)] active:translate-y-0 active:shadow-[0_4px_16px_rgba(192,192,192,0.15)]">
                  Falar com Felipe agora
                </button>
              </motion.div>
              
              <motion.div variants={revealVariant} className="mt-6 flex items-center justify-center gap-2 text-[12px] text-[#5A5A5A] font-sans">
                <span>🔒 Sem compromisso. Totalmente gratuito conversar.</span>
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
                <span className="font-display font-bold text-[#F5F5F5] text-[10px] tracking-tighter">NX</span>
              </div>
            </div>
            <span className="font-display font-bold text-[#F5F5F5] tracking-widest text-xs">NEXUS</span>
          </div>
          
          <div className="text-[13px] font-sans text-[#5A5A5A] text-center">
            © 2025 Nexus Solutions IA
          </div>
          
          <a href="#" className="text-[#5A5A5A] hover:text-[#C0C0C0] transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
