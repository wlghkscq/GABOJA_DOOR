import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MapPin, ChevronRight, 
  ArrowRight, Shield, Zap, Maximize, Settings,
  Instagram, Facebook, MessageCircle
} from 'lucide-react';
import { Advantage, Product } from './types';
import { productService } from './services/productService';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [scrolled, setScrolled] = useState(false);

  const [products, setProducts] = useState<Product[]>(productService.getProducts());
  const [advantages] = useState<Advantage[]>(productService.getAdvantages());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryMap: Record<string, string> = {
    'All': '전체보기',
    'slide_1_door': '원 슬라이드 도어',
    'slide_3_door': '3연동 중문',
    'slide_4_door': '4연동 중문',
    'slide_6_door': '6연동 중문',
    'slide_auto': '자동 중문',
    'slide_semi_auto': '반자동 중문',
    'slide_partition': '파티션 중문',
    'swing_door': '스윙 중문',
    'slide_elbow': 'ㄱ자 중문',
    'one_door': '외도어 중문',
    'double_door': '양개 중문'
  };

  const categories = Object.keys(categoryMap);
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white"></div>
            </div>
            <span className="font-bold text-xl tracking-tighter">SEO HEUNG DOOR</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Advantages', 'Products', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-brand-orange transition-colors">
                {item}
              </a>
            ))}
            <button className="bg-brand-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all">
              견적 문의
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-serif">
              {['Home', 'Advantages', 'Products', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="main_banner_image/gabojadoor.png" 
              className="w-full h-full object-cover"
              alt="Hero Background"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <span className="label-caps text-white mb-4 block">Premium Interior Door</span>
              <h1 className="text-5xl md:text-8xl font-serif leading-[0.9] mb-6">
                나만의 라이프스타일,<br/>
                <span className="text-brand-orange">가보자 도어</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 font-light max-w-lg">
                이제 나만의 라이프스타일로 중문을 내 마음대로!<br/>
                집안의 품격을 높이는 서흥중문은 차별화된 기술과 견고한 시공으로 보답하겠습니다.
              </p>
              <div className="flex gap-4">
                <button className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  제품 둘러보기 <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Advantages Section */}
        <section id="advantages" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="label-caps mb-2 block">Advantage</span>
                <h2 className="section-title mb-0">맑음도어 서흥중문만의 장점</h2>
              </div>
              <p className="max-w-md text-gray-500 text-sm">
                타업체와 다른 차별화된 기술과 견고한 시공으로 고객님들께 보답하도록 노력하는 업체가 되겠습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, idx) => (
                <motion.div 
                  key={adv.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                    <img 
                      src={adv.image} 
                      alt={adv.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-brand-orange font-serif text-2xl font-bold">0{adv.id}</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{adv.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{adv.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="label-caps mb-2 block">Our Collection</span>
              <h2 className="section-title">다양한 라이프스타일의 완성</h2>
              
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-[#141414] text-white' 
                        : 'bg-white text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {categoryMap[cat]}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-brand-orange text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                          {categoryMap[product.category] || product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-serif mb-2">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-6">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold tracking-widest uppercase opacity-50">View Details</span>
                        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-24 bg-[#141414] text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="label-caps mb-4 block">Why Seo Heung</span>
                <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                  중문, 왜 필요하나요?
                </h2>
                <div className="space-y-6">
                  {[
                    "냉 · 난방 절약 (에너지 효율)",
                    "외부 소음 차단 (정숙한 실내)",
                    "외부먼지 · 냄새차단 (쾌적한 환경)",
                    "프라이버시 보호",
                    "인테리어 효과",
                    "아이들의 안전보호",
                    "반려동물 안전보호"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full border border-brand-orange flex items-center justify-center text-brand-orange text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-lg opacity-80">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full border border-white/10 absolute -top-20 -right-20 w-[120%] animate-pulse"></div>
                <img 
                  src="https://picsum.photos/seed/why/800/800" 
                  alt="Interior" 
                  className="rounded-3xl relative z-10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-[#F5F5F0] rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16">
              <div className="flex-1">
                <h2 className="section-title mb-4">상담 및 문의</h2>
                <p className="text-gray-500 mb-12">
                  나만의 라이프스타일에 맞춘 중문 인테리어, 지금 바로 전문가와 상담하세요.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-orange shadow-sm">
                      <Phone />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase opacity-50 mb-1">대표 번호</p>
                      <p className="text-2xl font-bold">1899-7692</p>
                      <p className="text-sm opacity-60">T. 331-3747</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-orange shadow-sm">
                      <MapPin />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase opacity-50 mb-1">오시는 길</p>
                      <p className="text-lg font-medium">경상남도 김해시 칠산로 295(화목동)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-orange shadow-sm">
                      <MessageCircle />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase opacity-50 mb-1">공식 블로그</p>
                      <a href="https://blog.naver.com/oej3747" target="_blank" className="text-lg font-medium hover:text-brand-orange">blog.naver.com/oej3747</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-[2rem] p-8 shadow-xl">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase opacity-50">성함</label>
                      <input type="text" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-orange transition-all" placeholder="홍길동" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase opacity-50">연락처</label>
                      <input type="tel" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-orange transition-all" placeholder="010-0000-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase opacity-50">문의 내용</label>
                    <textarea className="w-full bg-gray-50 border-none rounded-xl p-4 h-32 focus:ring-2 focus:ring-brand-orange transition-all" placeholder="궁금하신 내용을 입력해주세요."></textarea>
                  </div>
                  <button className="w-full bg-[#141414] text-white py-5 rounded-xl font-bold hover:bg-brand-orange transition-all">
                    문의하기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-orange rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white"></div>
            </div>
            <span className="font-bold text-lg tracking-tighter">SEO HEUNG DOOR</span>
          </div>
          
          <p className="text-sm text-gray-400">
            © 2024 Seo Heung Door. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
