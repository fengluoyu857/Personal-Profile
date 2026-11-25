import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, MapPin, Mail } from "lucide-react";
import { videos, navItems, worksData, servicesData } from "./data/content";

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    const updateClock = () => setTime(formatter.format(new Date()));

    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function useRevealOnce() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

function SectionHeading({ number, title, subtitle }) {
  return (
    <div className="flex flex-col gap-3" data-reveal="up">
      <span className="font-mono text-[10px] font-medium uppercase tracking-[2px] text-white/50">
        {number}
      </span>
      <h2 className="text-[clamp(36px,8vw,80px)] font-medium uppercase leading-[0.9] tracking-[-2px]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-[480px] text-base leading-relaxed text-white/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const time = useClock();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-500 ${
        scrolled || isOpen ? "bg-black/95 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1460px] px-[20px] md:px-[32px]">
        <div className="flex items-center justify-between gap-8 py-4 md:py-6">
          <a
            href="#hero"
            className="text-lg font-semibold tracking-tight"
            aria-label="回到顶部"
          >
            Landon<span className="text-[#f598f2]">.</span>
          </a>

          <nav aria-label="主导航" className="hidden md:block">
            <ul className="flex gap-10">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-link-underline inline-flex items-start gap-[7px] pb-1"
                  >
                    <span className="text-[8px] font-medium uppercase leading-3 tracking-[-0.08px] text-white/40">
                      {String(index + 1).padStart(2, "0")} /
                    </span>
                    <span className="text-xs font-medium uppercase leading-4 tracking-[-0.12px]">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors hover:border-white md:hidden"
            aria-label={isOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>

          <div className="hidden min-w-[200px] items-center justify-end gap-6 text-right text-xs font-medium uppercase leading-4 tracking-[-0.12px] md:flex">
            <a className="nav-link-underline pb-1" href="mailto:landon@design.studio">
              landon@design.studio
            </a>
            <time aria-label="当前本地时间" className="tabular-nums">北京时间 {time}</time>
          </div>
        </div>

        <nav
          aria-label="移动端导航"
          className={`mobile-menu-grid grid md:hidden ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-6 border-t border-white/10 pb-8 pt-6">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-link-underline inline-flex items-start gap-3 pb-1 text-[28px] font-medium uppercase leading-8 tracking-[-0.84px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="pt-1 text-[8px] leading-3 tracking-[-0.08px] text-white/40">
                      {String(index + 1).padStart(2, "0")} /
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:landon@design.studio"
                  className="mt-2 inline-block text-sm text-white/50 underline-offset-4 hover:text-white hover:underline"
                >
                  landon@design.studio
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useCompactVideo() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return compact;
}

function VideoBackground({ activeIndex }) {
  const reducedMotion = usePrefersReducedMotion();
  const compact = useCompactVideo();
  // 0 = 首选源，1 = 备用源，2 = 两种都失败（保留封面）
  const [levels, setLevels] = useState(() => videos.map(() => 0));
  const [previousIndex, setPreviousIndex] = useState(null);
  const lastIndexRef = useRef(activeIndex);

  useEffect(() => {
    const last = lastIndexRef.current;
    if (last === activeIndex) return;
    lastIndexRef.current = activeIndex;
    setPreviousIndex(last);
    const timer = window.setTimeout(() => setPreviousIndex(null), 1200);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const handleError = (index) => {
    setLevels((current) => current.map((level, i) => (i === index ? level + 1 : level)));
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      {videos.map((video, index) => {
        const level = levels[index];
        const primary = compact ? video.mobileUrl : video.url;
        const fallback = compact ? video.url : video.mobileUrl;
        const src = level === 0 ? primary : level === 1 ? fallback : undefined;
        const isActive = index === activeIndex && level < 2;
        const shouldLoad = isActive || index === previousIndex;

        return (
          <video
            key={video.label}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            src={shouldLoad ? src : undefined}
            poster={video.poster}
            muted
            autoPlay={isActive && !reducedMotion}
            playsInline
            loop
            preload={shouldLoad ? "auto" : "none"}
            tabIndex={-1}
            onError={shouldLoad ? () => handleError(index) : undefined}
          />
        );
      })}
      <div className="absolute inset-0 z-[1] bg-black/30" />
    </div>
  );
}

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const revealRef = useRevealOnce();
  const accentColor = activeIndex === 0 ? "#F598F2" : "#FFFFFF";

  const dotStyle = useMemo(
    () => ({
      backgroundColor: accentColor,
      boxShadow: `0 0 18px ${accentColor}`,
    }),
    [accentColor],
  );

  return (
    <section id="hero" ref={revealRef} className="relative min-h-screen min-h-[100svh] overflow-hidden bg-black text-white">
      <VideoBackground activeIndex={activeIndex} />
      <div className="relative z-[2] mx-auto flex min-h-screen min-h-[100svh] max-w-[1460px] flex-col items-end justify-end gap-[120px] px-[20px] pt-[180px] md:px-[32px] md:pt-[190px]">
        <div className="flex w-full items-start gap-8 flex-col sm:flex-row">
          <div className="flex-[4]">
            <div className="flex flex-col items-start gap-2" role="tablist" aria-label="视频背景切换器">
              {videos.map((video, index) => (
                <button
                  key={video.label}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  className={`role-link text-left text-xs font-medium uppercase leading-4 tracking-[-0.12px] transition-opacity ${
                    activeIndex === index ? "opacity-100" : "opacity-55 hover:opacity-75"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {String(index + 1).padStart(2, "0")} / {video.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[10px]" role="status" aria-label="接单状态">
            <span className="h-[7px] w-[7px] rounded-full dot-pulse" style={dotStyle} />
            <span className="text-xs font-medium uppercase leading-4 tracking-[-0.12px]">开放合作中</span>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-10 pb-[80px] md:flex-row md:items-end md:gap-8 md:pb-[60px]">
          <div className="flex-[2]">
            <h1
              data-reveal="up"
              className="reveal-up text-[clamp(72px,15vw,200px)] font-medium uppercase leading-[0.82] tracking-[-4px] md:tracking-[-6px]"
            >
              Landon
            </h1>
            <p
              data-reveal="up"
              className="reveal-up reveal-delay mt-3 text-sm tracking-[2px] text-white/50 uppercase"
            >
              创意设计师 · 前端工程师
            </p>
          </div>

          <div className="flex flex-1 flex-col items-start gap-7 md:pl-[50px]">
            <p
              data-reveal="right"
              className="reveal-right max-w-[460px] text-base font-medium leading-relaxed"
            >
              专注于品牌设计与数字产品体验，以精准的视觉语言和流畅的交互，为品牌打造令人难忘的数字化存在。
            </p>
            <a data-reveal="right" href="#contact" className="cta-button reveal-right reveal-delay">
              开启合作
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-[32px] hidden md:block">
          <p className="text-[10px] uppercase tracking-[4px] text-white/30">滚动探索 ↓</p>
        </div>
      </div>
    </section>
  );
}

function Works() {
  const revealRef = useRevealOnce();

  return (
    <section id="works" ref={revealRef} className="relative bg-black py-[120px] text-white md:py-[180px]">
      <div className="mx-auto max-w-[1460px] px-[20px] md:px-[32px]">
        <SectionHeading
          number="（作品）"
          title="精选案例"
          subtitle="每一个项目都是一次从洞察到落地的完整旅程，以下是我们引以为豪的代表作。"
        />

        <div className="mt-20 grid gap-[2px] md:grid-cols-2">
          {worksData.map((work, idx) => (
            <article
              key={work.title}
              data-reveal="up"
              className={`reveal-up group relative overflow-hidden border border-white/10 bg-white/[0.02] p-[32px] transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 ${
                idx > 1 ? "reveal-delay" : ""
              }`}
            >
              <div className="absolute right-[32px] top-[32px] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:border-white/50">
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </div>

              <div className="mb-6 flex items-center gap-4">
                <span className="font-mono text-[11px] tracking-[2px] text-white/30 uppercase">
                  {work.category}
                </span>
                <span className="h-[1px] w-6 bg-white/20" />
                <span className="font-mono text-[11px] text-white/40">{work.year}</span>
              </div>

              <h3 className="mb-4 text-[28px] font-medium uppercase leading-tight tracking-[-0.5px] md:text-[32px]">
                {work.title}
              </h3>

              <p className="mb-8 max-w-[420px] text-sm leading-relaxed text-white/55">
                {work.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block border border-white/15 px-3 py-1.5 text-[11px] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center" data-reveal="up">
          <a href="#" className="cta-button reveal-up">
            查看全部作品
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const revealRef = useRevealOnce();

  return (
    <section id="services" ref={revealRef} className="relative border-t border-white/10 bg-black py-[120px] text-white md:py-[180px]">
      <div className="mx-auto max-w-[1460px] px-[20px] md:px-[32px]">
        <SectionHeading
          number="（服务）"
          title="服务项目"
          subtitle="从品牌策略到产品落地，提供全链路设计服务，陪你从零到一。"
        />

        <div className="mt-20 grid gap-[2px] md:grid-cols-2">
          {servicesData.map((svc, idx) => (
            <div
              key={svc.title}
              data-reveal="up"
              className={`reveal-up group border border-white/10 bg-white/[0.02] p-[32px] transition-all duration-500 hover:bg-white/[0.06] ${
                idx > 1 ? "reveal-delay" : ""
              }`}
            >
              <div className="mb-8 font-mono text-[72px] font-light leading-none tracking-[-4px] text-white/10 transition-colors duration-500 group-hover:text-white/20">
                {svc.icon}
              </div>
              <h3 className="mb-4 text-2xl font-medium uppercase tracking-[-0.5px]">{svc.title}</h3>
              <p className="mb-8 max-w-[380px] text-sm leading-relaxed text-white/55">{svc.desc}</p>
              <ul className="space-y-3">
                {svc.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[13px] text-white/45">
                    <span className="mt-[6px] h-[1px] w-3 shrink-0 bg-white/30" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const revealRef = useRevealOnce();

  return (
    <section id="about" ref={revealRef} className="relative border-t border-white/10 bg-black py-[120px] text-white md:py-[180px]">
      <div className="mx-auto max-w-[1460px] px-[20px] md:px-[32px]">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <SectionHeading number="（关于）" title="关于我" />

            <div data-reveal="up" className="reveal-up mt-12 space-y-6 text-base leading-relaxed text-white/55">
              <p>
                我是Landon，一名驻扎在上海的独立创意设计师。过去八年，我曾与多家初创公司和知名品牌合作，涵盖科技、时尚、音乐和生活方式等领域。
              </p>
              <p>
                我相信好的设计不仅是好看——它应该解决问题、传递情感、推动商业。每一个像素、每一次动效，背后都有它的理由。
              </p>
              <p>
                工作之外，我沉迷于摄影、独立电影和电子音乐。这些跨领域的兴趣不断反哺我的设计实践。
              </p>
            </div>

            <div data-reveal="up" className="reveal-up mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
              {[
                { value: "8+", label: "年经验" },
                { value: "60+", label: "完成项目" },
                { value: "40+", label: "合作客户" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-[clamp(28px,5vw,48px)] font-light tracking-[-2px]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[12px] text-white/35 uppercase tracking-[1px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div data-reveal="right" className="reveal-right space-y-8">
              <h3 className="text-sm font-medium uppercase tracking-[3px] text-white/40">技能专长</h3>
              <div className="grid grid-cols-3 gap-5">
                {[
                  "Figma", "Adobe XD", "Photoshop", "Illustrator",
                  "After Effects", "Blender", "Spline", "Webflow", "Framer",
                  "React / Vue", "Tailwind CSS",
                ].map((skill) => (
                  <div key={skill} className="group flex items-center gap-3">
                    <span className="h-[1px] w-3 bg-white/20 transition-all duration-500 group-hover:w-5 group-hover:bg-white/50" />
                    <span className="text-[13px] text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const revealRef = useRevealOnce();

  return (
    <section id="contact" ref={revealRef} className="relative border-t border-white/10 bg-black py-[120px] text-white md:py-[180px]">
      <div className="mx-auto max-w-[1460px] px-[20px] md:px-[32px]">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <SectionHeading
              number="（联系）"
              title="开始合作"
              subtitle="无论是一个新项目、一次设计咨询，还是只是想打个招呼——都欢迎联系。"
            />

            <div data-reveal="up" className="reveal-up mt-12 space-y-6">
              <a
                href="mailto:landon@design.studio"
                className="group flex items-center gap-4 text-xl font-medium tracking-[-0.5px] transition-all duration-500 hover:text-[#f598f2]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-[#f598f2] group-hover:bg-[#f598f2]/10">
                  <Mail size={18} strokeWidth={1.5} />
                </span>
                landon@design.studio
              </a>

              <div className="flex items-center gap-4 pt-2 text-base text-white/40">
                <MapPin size={16} strokeWidth={1.5} />
                <span>中国 · 上海</span>
              </div>
            </div>
          </div>

          <div>
            <form
              data-reveal="right"
              className="reveal-right space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("感谢你的来信！我会在 24 小时内回复。");
              }}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[11px] uppercase tracking-[2px] text-white/40">
                    姓名
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="你的姓名"
                    className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-white/20 focus:border-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[11px] uppercase tracking-[2px] text-white/40">
                    邮箱
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-white/20 focus:border-white/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-[11px] uppercase tracking-[2px] text-white/40">
                  项目类型
                </label>
                <select
                  id="subject"
                  className="w-full border-b border-white/20 bg-black py-3 text-sm text-white/60 outline-none transition-colors focus:border-white/60"
                >
                  <option value="">请选择项目类型</option>
                  <option value="brand">品牌设计</option>
                  <option value="web">网站设计</option>
                  <option value="app">移动应用</option>
                  <option value="motion">动效与 3D</option>
                  <option value="consulting">设计咨询</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[11px] uppercase tracking-[2px] text-white/40">
                  项目简介
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="简单描述你的项目需求..."
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-white/20 focus:border-white/60"
                />
              </div>

              <button type="submit" className="cta-button w-full md:w-auto">
                发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-white">
      <div className="mx-auto flex max-w-[1460px] flex-col items-center justify-between gap-6 px-[20px] md:flex-row md:px-[32px]">
        <a href="#hero" className="text-lg font-semibold tracking-tight">
           Landon<span className="text-[#f598f2]">.</span>
        </a>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-white/35 uppercase tracking-[2px] transition-colors hover:text-white/70"
            >
              {item.label}
            </a>
          ))}
        </div>

        <p className="text-[11px] text-white/20">
          &copy; {new Date().getFullYear()} Landon设计工作室 · 保留所有权利
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Works />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
