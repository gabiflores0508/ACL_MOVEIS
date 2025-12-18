
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Instagram, Facebook, Mail, MapPin, 
  Sparkles, Send, ArrowRight, Camera, Image as ImageIcon, ExternalLink,
  ChevronRight, CheckCircle2, Award, Clock, Ruler, Info, MessageCircle
} from 'lucide-react';
import { AMBIENTES } from './constants';
import { ChatContent, getDesignAdvice } from './geminiService';

const FadeInSection: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Logo = ({ isScrolled, light = false }: { isScrolled?: boolean, light?: boolean }) => {
  const aclColor = light ? 'text-white' : 'text-[#8B444E]';
  const subTitleColor = light ? 'text-white/70' : 'text-[#7D7D7D]';
  const squareColor = light ? 'bg-white/50' : 'bg-[#7D7D7D]';

  return (
    <div 
      className="flex flex-col items-start leading-none group cursor-pointer select-none" 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="flex items-end justify-start">
        <span className={`text-4xl md:text-5xl font-bold tracking-tighter transition-colors duration-300 ${aclColor}`}>
          ACL.
        </span>
        <div className={`w-3.5 h-3.5 md:w-4 md:h-4 mb-1.5 ml-1 transition-colors duration-300 ${squareColor}`}></div>
      </div>
      <span className={`text-[10px] md:text-[12px] uppercase tracking-[0.25em] font-medium mt-1.5 transition-colors duration-300 ${subTitleColor}`}>
        MÓVEIS SOB MEDIDA
      </span>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Ambientes', id: 'ambientes' },
    { name: 'Diferenciais', id: 'diferenciais' },
    { name: 'Consultoria IA', id: 'ai-consultant' },
    { name: 'Contato', id: 'contato' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-zinc-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        <div className="flex-shrink-0">
          <Logo isScrolled={isScrolled} />
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-all hover:text-[#8B444E] relative group ${isScrolled ? 'text-zinc-800' : 'text-white'}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B444E] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a href="https://wa.me/5554988887777" target="_blank" className="bg-[#8B444E] text-white px-6 py-3 rounded-none font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all flex items-center gap-3 shadow-xl shadow-[#8B444E]/20">
            <Phone size={12} /> Orçamento
          </a>
        </div>

        <button className={`lg:hidden transition-colors ${isScrolled ? 'text-[#8B444E]' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white z-50 overflow-y-auto animate-in fade-in duration-300">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsOpen(false)} className="text-zinc-900"><X size={32} /></button>
          </div>
          <div className="flex flex-col items-center justify-center h-full -mt-20 gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)} 
                className="text-2xl font-serif font-bold text-zinc-900 hover:text-[#8B444E] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="https://www.instagram.com/aclmoveis/" target="_blank" className="flex items-center gap-2 text-zinc-400 font-bold tracking-widest text-xs uppercase">
              <Instagram size={18} /> Instagram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=90&w=2400" 
          alt="Projeto ACL Móveis - Sofisticação e Painéis de Madeira" 
          className="w-full h-full object-cover brightness-[0.8] scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl animate-in fade-in slide-in-from-left duration-1000 ease-out">
          <span className="inline-flex items-center gap-3 text-white/70 text-[10px] uppercase tracking-[0.4em] font-bold mb-8">
            <span className="w-12 h-px bg-[#8B444E]"></span> 
            Design de Alto Padrão
          </span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold mb-8 leading-[0.9] text-white">
            Exclusividade <br />
            <span className="italic font-light text-white/80">sob medida</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl mb-12 font-light max-w-xl leading-relaxed">
            Mobiliário premium que une a precisão tecnológica da marcenaria fina ao design autoral contemporâneo da ACL.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => scrollToSection('ambientes')}
              className="bg-[#8B444E] text-white px-10 py-5 font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-zinc-900 shadow-2xl"
            >
              Nossos Projetos
            </button>
            <a 
              href="https://www.instagram.com/aclmoveis/" 
              target="_blank"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-zinc-900 flex items-center gap-3"
            >
              <Instagram size={18} /> Ver no Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Ambientes = () => {
  return (
    <section id="ambientes" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-[#8B444E] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Portfólio ACL</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-zinc-900 leading-tight">Projetos que inspiram</h2>
            </div>
            <p className="text-zinc-500 font-light text-lg max-w-sm">Cada ambiente é um projeto único, desenvolvido para refletir a personalidade e o luxo da marca ACL.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {AMBIENTES.map((amb, index) => (
            <FadeInSection key={amb.id} delay={index * 100}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/5] mb-8 bg-zinc-100 shadow-xl">
                  <img 
                    src={amb.image} 
                    alt={amb.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                     <p className="text-white text-xs font-light leading-relaxed mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{amb.description}</p>
                     <span className="text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">Explorar Projeto <ChevronRight size={14} /></span>
                  </div>
                </div>
                <div className="flex justify-between items-center group-hover:text-[#8B444E] transition-colors">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-[#8B444E] uppercase tracking-[0.3em]">{amb.category}</span>
                    <h4 className="text-lg font-bold uppercase tracking-widest">{amb.name}</h4>
                  </div>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const Diferenciais = () => {
  const items = [
    { icon: Award, title: 'Matéria-Prima Premium', desc: 'MDF de alta densidade e acabamentos que resistem ao tempo e uso diário.' },
    { icon: Ruler, title: 'Software de Ponta', desc: 'Projetos em 3D fotorrealistas para que você visualize seu sonho antes da produção.' },
    { icon: Clock, title: 'Compromisso ACL', desc: 'Produção própria e logística integrada para garantir a entrega pontual.' },
    { icon: CheckCircle2, title: 'Atendimento Consultivo', desc: 'Designers dedicados a encontrar as melhores soluções para sua planta.' },
  ];

  return (
    <section id="diferenciais" className="py-32 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          {items.map((item, idx) => (
            <FadeInSection key={idx} delay={idx * 150}>
              <div className="group">
                <div className="w-16 h-16 flex items-center justify-center mb-8 bg-white border border-zinc-100 group-hover:bg-[#8B444E] group-hover:border-[#8B444E] transition-all shadow-sm">
                  <item.icon className="text-zinc-800 group-hover:text-white transition-colors" size={28} />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">{item.title}</h4>
                <p className="text-zinc-500 text-[11px] font-light leading-relaxed">{item.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIConsultant = () => {
  const [messages, setMessages] = useState<ChatContent[]>([
    { role: 'model', text: 'Olá! Sou o Consultor Digital da ACL Móveis. Como posso ajudar com seu projeto hoje? Envie uma foto do seu ambiente ou fale sobre suas ideias!' }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg = input || (selectedImage ? "O que você sugere para planejar este espaço?" : "");
    const base64Image = selectedImage?.split(',')[1];
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg, image: base64Image }]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    const result = await getDesignAdvice(userMsg, messages, base64Image);
    setMessages(prev => [...prev, { role: 'model', text: result.text, grounding: result.grounding }]);
    setIsLoading(false);
  };

  return (
    <section id="ai-consultant" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <FadeInSection>
          <div>
            <span className="text-[#8B444E] font-bold text-[10px] uppercase tracking-[0.4em] block mb-6">ACL Vision AI</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-zinc-900 mb-8 leading-tight">Sua casa no futuro</h2>
            <p className="text-zinc-600 mb-10 font-light leading-relaxed text-lg">
              Utilize nossa IA para obter sugestões imediatas de paleta de cores e disposição de mobiliário. Arraste uma foto e comece a planejar.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <CheckCircle2 className="text-[#8B444E]" size={20} />
                <h5 className="font-bold text-[10px] uppercase tracking-widest">Estilo & Tendência</h5>
                <p className="text-zinc-400 text-xs font-light">Análise das tendências de Milão aplicadas ao seu lar.</p>
              </div>
              <div className="space-y-4">
                <CheckCircle2 className="text-[#8B444E]" size={20} />
                <h5 className="font-bold text-[10px] uppercase tracking-widest">Aproveitamento</h5>
                <p className="text-zinc-400 text-xs font-light">Dicas para otimizar cada centímetro da planta.</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="bg-zinc-50 border border-zinc-200 rounded-none overflow-hidden shadow-2xl flex flex-col h-[650px] relative">
            <div className="bg-zinc-900 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#8B444E] animate-pulse"></div>
                <p className="text-white font-bold text-[9px] uppercase tracking-[0.3em]">ACL Concept AI</p>
              </div>
              {/* Fixed: Use capitalized Sparkles component from lucide-react */}
              <Sparkles className="text-white/30" size={16} />
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.image && (
                    <img src={`data:image/jpeg;base64,${msg.image}`} className="max-w-[200px] shadow-2xl mb-4 border-4 border-white" alt="Upload" />
                  )}
                  <div className={`max-w-[90%] p-6 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#8B444E] text-white shadow-lg' 
                      : 'bg-zinc-50 text-zinc-800 border-l-4 border-[#8B444E]'
                  }`}>
                    {msg.text}
                    {msg.grounding && msg.grounding.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-wrap gap-2">
                        {msg.grounding.map((chunk: any, idx: number) => chunk.web && (
                          <a key={idx} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] bg-white text-[#8B444E] px-3 py-1 rounded-none border border-zinc-200 flex items-center gap-2 font-bold hover:bg-zinc-50 transition-colors">
                            <ExternalLink size={10} /> {chunk.web.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 p-4">
                    <div className="w-1.5 h-1.5 bg-[#8B444E] rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-[#8B444E] rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-[#8B444E] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-zinc-50 border-t border-zinc-200 flex gap-4">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-zinc-400 hover:text-[#8B444E] transition-colors">
                <Camera size={24} />
              </button>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Como podemos transformar seu espaço?" 
                className="flex-1 bg-white border-b border-zinc-200 px-0 py-2 text-sm focus:outline-none focus:border-[#8B444E] transition-all"
              />
              <button type="submit" disabled={isLoading} className="text-[#8B444E] p-2 hover:scale-110 transition-transform disabled:opacity-30">
                <Send size={24} />
              </button>
            </form>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contato" className="py-32 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-start">
        <FadeInSection>
          <div className="sticky top-32">
            <h2 className="text-5xl font-serif font-bold mb-10">O início do seu <br />projeto oficial</h2>
            <p className="text-zinc-400 mb-16 font-light leading-relaxed text-lg max-w-md">Deixe seus dados para que nossa equipe técnica entre em contato para uma consultoria personalizada.</p>
            
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="w-14 h-14 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#8B444E] group-hover:border-[#8B444E] transition-all">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-2 text-zinc-500">Onde estamos</h4>
                  <p className="text-zinc-200 text-sm leading-relaxed">Rua Andrea Vittore Mazzoleni, 187<br />Garibaldi / RS</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-14 h-14 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#8B444E] group-hover:border-[#8B444E] transition-all">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-2 text-zinc-500">Fale Conosco</h4>
                  <p className="text-zinc-200 text-sm">(54) 3333-4444<br />(54) 9.8888-7777</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="bg-white p-12 shadow-2xl relative">
            <form className="space-y-10">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">Nome</label>
                <input type="text" className="w-full bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-[#8B444E] text-zinc-900 text-base transition-all" />
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-400">E-mail</label>
                  <input type="email" className="w-full bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-[#8B444E] text-zinc-900 text-base transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-400">WhatsApp</label>
                  <input type="tel" className="w-full bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-[#8B444E] text-zinc-900 text-base transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-400">O que você deseja planejar?</label>
                <select className="w-full bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-[#8B444E] text-zinc-900 text-base appearance-none cursor-pointer">
                  <option>Toda a residência</option>
                  <option>Cozinha e Gourmet</option>
                  <option>Living e Home</option>
                  <option>Dormitórios</option>
                  <option>Comercial</option>
                </select>
              </div>
              <div className="pt-6">
                <button type="button" className="w-full bg-[#8B444E] text-white py-6 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-zinc-900 transition-all shadow-2xl">
                  Iniciar Orçamento
                </button>
              </div>
            </form>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 pb-20 border-b border-white/5">
          <Logo light />

          <div className="flex flex-wrap justify-center gap-12">
            <a href="https://www.instagram.com/aclmoveis/" target="_blank" className="text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-2 group">
              <Instagram size={16} className="group-hover:text-[#8B444E] transition-colors" /> Instagram
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.4em] font-bold">Pinterest</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.4em] font-bold">Facebook</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-16 gap-8">
          <div className="text-zinc-600 text-[9px] uppercase tracking-[0.5em] font-bold">
            © 2024 ACL Móveis Planejados.
          </div>
          <div className="text-zinc-600 text-[8px] uppercase tracking-[0.3em]">
            Paixão por detalhes. Excelência em marcenaria.
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/5554988887777" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
    aria-label="Contato via WhatsApp"
  >
    <MessageCircle size={32} />
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap text-sm font-bold uppercase tracking-widest">
      Falar com Especialista
    </span>
  </a>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-[#8B444E] selection:text-white font-sans text-zinc-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Diferenciais />
      <Ambientes />
      <AIConsultant />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;
