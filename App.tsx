
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Instagram, Send, ArrowRight, Camera, 
  ChevronRight, CheckCircle2, Award, Clock, Ruler, MessageCircle, 
  MapPin, Sparkles, Facebook, Info
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

    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', id: 'home' },
    { name: 'Projetos', id: 'ambientes' },
    { name: 'Consultoria IA', id: 'ai-consultant' },
    { name: 'Contato', id: 'contato' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="w-10 h-10 bg-wine flex items-center justify-center text-white font-serif font-bold text-xl">A</div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold tracking-tighter text-white">ACL MÓVEIS</span>
            <span className="text-[8px] tracking-[0.4em] text-zinc-500 uppercase -mt-1 group-hover:text-wine transition-colors">Premium Interiors</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-wine transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a href="#contato" className="border border-wine px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-wine transition-all">
            Solicitar Orçamento
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-40 lg:hidden transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-serif text-white hover:text-wine transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2400" 
        className="w-full h-full object-cover opacity-40 scale-105"
        alt="Interior de luxo"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div className="max-w-4xl">
        <span className="inline-block py-1 px-3 bg-wine/20 border border-wine/30 text-wine text-[10px] uppercase tracking-[0.5em] font-bold mb-8 animate-pulse">
          Exclusividade em cada detalhe
        </span>
        <h1 className="text-7xl md:text-[120px] font-serif font-bold leading-[0.85] mb-8 text-white">
          Design <br />
          <span className="italic font-light text-wine">Atemporal</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-xl font-light mb-12 leading-relaxed">
          Transformamos espaços comuns em experiências de vida extraordinárias através de mobiliário sob medida de alto padrão.
        </p>
        <div className="flex flex-wrap gap-6">
          <a href="#ambientes" className="bg-wine text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-red-900 transition-all shadow-2xl shadow-red-900/20">
            Ver Portfólio
          </a>
          <a href="https://wa.me/5554988887777" target="_blank" className="border border-zinc-700 text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const items = [
    { icon: Award, title: 'Qualidade Premium', desc: 'Materiais nobres e ferragens italianas.' },
    { icon: Ruler, title: 'Precisão Milimétrica', desc: 'Sistemas 3D de última geração.' },
    { icon: Clock, title: 'Entrega Pontual', desc: 'Respeito absoluto ao cronograma.' },
  ];

  return (
    <section className="bg-zinc-950 py-20 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
        {items.map((item, i) => (
          <FadeInSection key={i} delay={i * 200}>
            <div className="flex items-start gap-6 group">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-zinc-800 group-hover:border-wine transition-colors">
                <item.icon className="text-zinc-500 group-hover:text-wine transition-colors" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
};

const Projects = () => (
  <section id="ambientes" className="py-32 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div>
          <span className="text-wine text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Portfólio</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white">Ambientes Planejados</h2>
        </div>
        <p className="max-w-sm text-zinc-500 font-light">
          Explore nossa galeria de projetos concluídos, onde cada peça conta uma história de sofisticação.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AMBIENTES.map((amb, i) => (
          <FadeInSection key={amb.id} delay={i * 100}>
            <div className="group relative overflow-hidden aspect-[3/4] cursor-pointer">
              <img 
                src={amb.image} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                alt={amb.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-wine text-[9px] font-bold uppercase tracking-widest mb-2">{amb.category}</span>
                <h3 className="text-2xl font-serif text-white mb-4">{amb.name}</h3>
                <p className="text-zinc-400 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {amb.description}
                </p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const AIConsultant = () => {
  const [messages, setMessages] = useState<ChatContent[]>([
    { role: 'model', text: 'Olá! Sou o consultor virtual da ACL. Envie uma foto do seu ambiente ou descreva seu desejo para recebermos dicas personalizadas de design.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Somente faz o scroll se houver mais de uma mensagem (interação do usuário)
  useEffect(() => {
    if (messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const result = await getDesignAdvice(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    setIsLoading(false);
  };

  return (
    <section id="ai-consultant" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <FadeInSection>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-wine/10 blur-3xl rounded-full"></div>
            <span className="text-wine font-bold text-[10px] uppercase tracking-[0.5em] block mb-6">Inovação ACL</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-8">Consultoria de <br />Design Inteligente</h2>
            <p className="text-zinc-400 font-light text-lg leading-relaxed mb-10">
              Nossa IA analisa tendências globais e sugere soluções sob medida para sua planta, paleta de cores e funcionalidade.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Sparkles className="text-wine" size={20} />
                <span className="text-white text-sm font-light">Sugestão de acabamentos e materiais</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-wine" size={20} />
                <span className="text-white text-sm font-light">Otimização de pequenos espaços</span>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="bg-zinc-900 border border-zinc-800 flex flex-col h-[600px] shadow-2xl relative">
            <div className="p-6 bg-black border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Consultor IA Online</span>
              </div>
              <Info size={16} className="text-zinc-600" />
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-wine text-white' 
                      : 'bg-zinc-800 text-zinc-300 border-l-2 border-wine'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-wine text-[10px] uppercase tracking-widest animate-pulse">ACL analisando tendências...</div>}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-black border-t border-zinc-800 flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Qual ambiente você deseja planejar?" 
                className="flex-1 bg-transparent border-b border-zinc-800 px-2 py-2 text-sm focus:outline-none focus:border-wine transition-all"
              />
              <button type="submit" disabled={isLoading} className="text-wine p-2 hover:scale-110 transition-transform disabled:opacity-30">
                <Send size={24} />
              </button>
            </form>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contato" className="py-32 bg-black border-t border-zinc-900">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32">
      <FadeInSection>
        <div>
          <h2 className="text-6xl font-serif text-white mb-12">Vamos criar seu <br />novo refúgio?</h2>
          <div className="space-y-12">
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center group-hover:bg-wine transition-all">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Localização</span>
                <p className="text-white font-light">Serra Gaúcha, RS - Garibaldi</p>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center group-hover:bg-wine transition-all">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">WhatsApp</span>
                <p className="text-white font-light">+55 (54) 9 8888-7777</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection delay={300}>
        <div className="bg-zinc-950 p-12 border border-zinc-900">
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Nome Completo</label>
              <input type="text" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-wine text-white transition-all" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">E-mail</label>
                <input type="email" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-wine text-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Telefone</label>
                <input type="tel" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-wine text-white transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">O que você quer planejar?</label>
              <select className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-wine text-zinc-400 transition-all appearance-none cursor-pointer">
                <option>Cozinha Gourmet</option>
                <option>Suíte Master</option>
                <option>Living & Home</option>
                <option>Closet Exclusivo</option>
                <option>Área Corporativa</option>
              </select>
            </div>
            <button type="button" className="w-full bg-wine text-white py-6 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all">
              Agendar Consultoria
            </button>
          </form>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black py-20 border-t border-zinc-900">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="flex flex-col items-center md:items-start">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-wine flex items-center justify-center text-white font-serif font-bold text-lg">A</div>
          <span className="text-xl font-serif font-bold tracking-tighter text-white">ACL MÓVEIS</span>
        </div>
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.5em]">Excelência sob medida desde 1998.</p>
      </div>
      
      <div className="flex gap-8">
        <a href="#" className="text-zinc-500 hover:text-wine transition-colors"><Instagram size={20} /></a>
        <a href="#" className="text-zinc-500 hover:text-wine transition-colors"><Facebook size={20} /></a>
        <a href="#" className="text-zinc-500 hover:text-wine transition-colors"><Phone size={20} /></a>
      </div>
      
      <div className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold">
        © 2024 ACL INTERIORS. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  // Efeito para garantir que o site inicie sempre no topo ao carregar/recarregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Projects />
      <AIConsultant />
      <Contact />
      <Footer />
      
      {/* Fixed WhatsApp Button */}
      <a 
        href="https://wa.me/5554988887777" 
        target="_blank" 
        className="fixed bottom-10 right-10 z-[100] bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
};

export default App;
