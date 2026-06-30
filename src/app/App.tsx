import { useState, useEffect, useRef } from "react";
import {
  Github,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Code2,
  Server,
  Database,
  Cloud,
  Brain,
  Layers,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import profileImage from "@/imports/image.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  "About",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Contact",
];

const EDUCATION = [
  {
    period: "2013.03 – 2016.02",
    institution: "대일고등학교",
    location: "서울",
    detail: "졸업",
  },
  {
    period: "2017.03 – 2024.02",
    institution: "안양대학교",
    location: "경기도 안양",
    detail: "식품영양학과 수료 (4학년 2학기)",
  },
];

const EXPERIENCE = [
  {
    period: "2024.07 – 2024.10",
    company: "엑소코바이오",
    role: "영업지원팀 사원",
    type: "계약직",
  },
  {
    period: "2024.10 – 2025.01",
    company: "한국일본통운 (Nippon Express Korea)",
    role: "일용직 사원",
    type: "계약직",
  },
  {
    period: "2025.11 – 2026.05",
    company: "한국정보교육원",
    role: "생성형 AI 풀스택 과정",
    type: "수료",
  },
  {
    period: "2026.05 – 2026.11",
    company: "AWS & AI 활용 MSA 기반 웹 서비스 개발",
    role: "풀스택 개발자",
    type: "진행중",
  },
];

const SKILLS = [
  {
    category: "Language",
    icon: Code2,
    color: "#00d4ff",
    items: ["Java", "Python"],
  },
  {
    category: "Backend",
    icon: Server,
    color: "#00ff87",
    items: [
      "Spring",
      "SpringBoot",
      "MyBatis",
      "JPA",
      "REST API",
    ],
  },
  {
    category: "Frontend",
    icon: Layers,
    color: "#a78bfa",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Zustand",
      "Redux",
      "Bootstrap",
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "#fb923c",
    items: ["MySQL"],
  },
  {
    category: "DevOps & Cloud",
    icon: Cloud,
    color: "#34d399",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Jenkins",
      "Docker",
      "Docker Compose",
      "AWS",
      "GCP",
    ],
  },
  {
    category: "AI / Data",
    icon: Brain,
    color: "#f472b6",
    items: ["LLM", "RAG", "Vector Search"],
  },
];

const PROJECTS = [
  {
    title: "대동여집도",
    emoji: "🗺️",
    description:
      "지도 기반 부동산 탐색 서비스. 사용자가 원하는 조건으로 매물을 지도 위에서 시각적으로 탐색할 수 있는 풀스택 웹 애플리케이션.",
    stack: [
      "Java",
      "Spring Framework",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    repo: "https://github.com/jongbeen97/zipmap.git",
  },
  {
    title: "Pleegie",
    emoji: "🤖",
    description:
      "AI 기반 전통시장 살리기 프로젝트. LLM과 RAG를 활용하여 사용자의 냉장고의 재료를 등록하고 재료 기반 레시피 추천 AI 개발을 진행 하였습니다.또한 전통시장 살리기 프로젝트로 전통시장 상인들이 입점을 하고 싶을 경우 가입을 하면 간단하게 입점 신청을 할수 있도록 구성하고 물품을 손쉽게 등록할 수 있도록 구현했습니다",
    stack: [
      "Java",
      "SpringBoot",
      "MySQL",
      "React",
      "JavaScript",
      "Python",
      "LLM",
      "Docker",
      "Kubernetes",
    ],
    repo: "https://github.com/jongbeen97/pleegie.git",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useTypewriter(
  words: string[],
  speed = 80,
  pause = 2000,
) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(
        () => setCharIdx((c) => c + 1),
        speed,
      );
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(
        () => setCharIdx((c) => c - 1),
        speed / 2,
      );
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-primary/70 border border-primary/25 px-3 py-1 rounded-sm mb-4">
      {children}
    </span>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 leading-tight">
      {children}
    </h2>
  );
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  const role = useTypewriter([
    "Full-Stack Developer",
    "Backend Engineer",
    "Frontend Developer",
    "AI Integration Dev",
  ]);

  const scrollDown = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(0,255,135,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-6 opacity-80">
          &gt; Hello My Name is New Developer
        </p>

        <h1
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-foreground mb-4 leading-none tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          JONGBEEN
          <br />
          <span
            style={{
              WebkitTextStroke: "1px rgba(0,212,255,0.5)",
              color: "transparent",
            }}
          >
            LEE
          </span>
        </h1>

        <div className="font-mono text-xl md:text-2xl text-primary mt-8 h-8 flex items-center justify-center gap-2">
          <span>{role}</span>
          <span className="animate-pulse">█</span>
        </div>

        <p className="mt-8 text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          2025년 11월부터 개발을 시작한 열정 넘치는 신입 풀스택
          개발자.
          <br />
          프론트엔드부터 백엔드, AI 연동까지 — 끊임없이 성장 중.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="https://github.com/jongbeen97"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded-sm hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
          >
            <Github size={16} />
            GitHub
          </a>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-mono text-sm rounded-sm hover:border-primary/70 hover:bg-primary/5 transition-all duration-200"
          >
            <Mail size={16} />
            Contact
          </button>
        </div>
      </div>

      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <FadeIn>
        <SectionLabel>01 / About</SectionLabel>
        <SectionTitle>저에 대해서</SectionTitle>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <FadeIn delay={100}>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
            {/* Profile avatar */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative shrink-0">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/40 bg-secondary"
                  style={{ boxShadow: "0 0 28px rgba(0,212,255,0.25)" }}
                >
                  <ImageWithFallback
                    src={profileImage}
                    alt="이종빈 프로필 캐릭터 — 정장 차림의 안경 낀 캐릭터"
                    className="w-full h-full object-cover object-top scale-110"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 text-xl select-none">👋</span>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">이종빈</p>
                <p className="font-mono text-xs text-primary/70 tracking-[0.2em] mt-0.5">JONGBEEN LEE</p>
              </div>
            </div>

            <p>
              안녕하세요! 항상 성장하며 발전하는 푸릇푸릇한
              개발자{" "}
              <span className="text-primary font-semibold">
                이종빈
              </span>
              입니다. 2025년 11월 10일부터 개발자의 길을 걷기
              시작한 신입 개발자로, 열정과 패기 하나로 모든
              업무에 임하고 있습니다.
            </p>
            <p>
              프론트엔드(React, TypeScript)와 백엔드(Java,
              Spring Boot)를 모두 다룰 수 있는 풀스택 개발자를
              목표로 하며, AI/LLM 연동과 MSA 아키텍처에도 관심을
              갖고 있습니다.
            </p>
            <p>
              식품영양학을 전공했지만, 기술에 대한 호기심과 문제
              해결에 대한 열정이 저를 개발의 길로 이끌었습니다.
              다양한 배경이 오히려 개발에 있어 색다른 시각을
              제공한다고 믿습니다.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="border border-border rounded-sm p-6 bg-card space-y-4 font-mono text-sm">
            {[
              { key: "name", val: '"이종빈 (Jongbeen Lee)"' },
              { key: "role", val: '"Full-Stack Developer"' },
              { key: "started", val: '"2025-11-10"' },
              { key: "location", val: '"Korea 🇰🇷"' },
              {
                key: "learning",
                val: '["AWS", "MSA", "AI/LLM"]',
              },
              { key: "goal", val: '"최고의 개발자"' },
            ].map(({ key, val }) => (
              <div key={key} className="flex gap-3">
                <span className="text-accent">{key}</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-primary/80">{val}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section
      id="education"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <FadeIn>
        <SectionLabel>02 / Education</SectionLabel>
        <SectionTitle>학력</SectionTitle>
      </FadeIn>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
        <div className="space-y-8 pl-12">
          {EDUCATION.map((edu, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="relative group">
                <div className="absolute -left-[2.25rem] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />
                <div className="border border-border bg-card rounded-sm p-5 hover:border-primary/40 transition-colors duration-300">
                  <p className="font-mono text-xs text-primary/60 mb-1 tracking-wider">
                    {edu.period}
                  </p>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {edu.location} &nbsp;·&nbsp; {edu.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <FadeIn>
        <SectionLabel>03 / Experience</SectionLabel>
        <SectionTitle>경력 & 개발이력</SectionTitle>
      </FadeIn>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />
        <div className="space-y-8 pl-12">
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="relative group">
                <div className="absolute -left-[2.25rem] top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-background group-hover:bg-accent transition-colors duration-300" />
                <div className="border border-border bg-card rounded-sm p-5 hover:border-accent/40 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-mono text-xs text-accent/60 mb-1 tracking-wider">
                        {exp.period}
                      </p>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exp.role}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs px-2.5 py-1 rounded-sm border shrink-0"
                      style={
                        exp.type === "진행중"
                          ? {
                              borderColor:
                                "rgba(0,255,135,0.4)",
                              color: "#00ff87",
                              backgroundColor:
                                "rgba(0,255,135,0.08)",
                            }
                          : exp.type === "수료"
                            ? {
                                borderColor:
                                  "rgba(0,212,255,0.4)",
                                color: "#00d4ff",
                                backgroundColor:
                                  "rgba(0,212,255,0.08)",
                              }
                            : {
                                borderColor:
                                  "rgba(128,128,168,0.3)",
                                color: "#8080a8",
                                backgroundColor:
                                  "rgba(128,128,168,0.06)",
                              }
                      }
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <FadeIn>
        <SectionLabel>04 / Skills</SectionLabel>
        <SectionTitle>기술 스택</SectionTitle>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map((group, i) => {
          const Icon = group.icon;
          return (
            <FadeIn key={group.category} delay={i * 80}>
              <div
                className="border border-border bg-card rounded-sm p-5 hover:border-opacity-60 transition-all duration-300 group h-full"
                style={
                  {
                    "--hover-color": group.color,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor =
                    group.color + "55")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "")
                }
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center"
                    style={{
                      backgroundColor: group.color + "18",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: group.color }}
                    />
                  </div>
                  <span
                    className="font-mono text-xs tracking-widest uppercase"
                    style={{ color: group.color }}
                  >
                    {group.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs px-2 py-1 rounded-sm border border-border text-muted-foreground bg-muted/40 hover:text-foreground transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <FadeIn>
        <SectionLabel>05 / Projects</SectionLabel>
        <SectionTitle>프로젝트</SectionTitle>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={i * 150}>
            <div className="border border-border bg-card rounded-sm p-6 hover:border-primary/40 transition-all duration-300 group flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {project.emoji}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {project.title}
                  </h3>
                </div>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-mono shrink-0"
                >
                  <Github size={14} />
                  <ExternalLink size={12} />
                </a>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-sm border border-primary/20 text-primary/70 bg-primary/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <FadeIn>
        <SectionLabel>06 / Contact</SectionLabel>
        <SectionTitle>연락하기</SectionTitle>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="border border-border bg-card rounded-sm p-8 md:p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center bottom, rgba(0,212,255,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4 opacity-70">
              &gt; open to opportunities
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              함께 만들어 갈 준비가 되어 있습니다.
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
              새로운 프로젝트, 협업 제안, 혹은 그냥 안녕 인사도
              환영합니다. 언제든지 연락 주세요!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/jongbeen97"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded-sm hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                <Github size={16} />
                GitHub 방문하기
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="font-mono text-xs text-muted-foreground tracking-wider">
        © 2026 JONGBEEN LEE &nbsp;·&nbsp;
        <span className="text-primary/50">
          Built with React + TypeScript
        </span>
      </p>
    </footer>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.toLowerCase()),
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgba(7,7,15,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0,212,255,0.1)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-sm font-bold text-primary tracking-wider">
          JB<span className="text-foreground">.dev</span>
        </span>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link.toLowerCase())}
                className="font-mono text-xs tracking-wider uppercase transition-colors duration-200"
                style={{
                  color:
                    active === link.toLowerCase()
                      ? "#00d4ff"
                      : "#8080a8",
                }}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4">
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="font-mono text-sm tracking-wider uppercase w-full text-left py-2"
                  style={{
                    color:
                      active === link.toLowerCase()
                        ? "#00d4ff"
                        : "#8080a8",
                  }}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="bg-background text-foreground min-h-screen font-sans"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.25); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,212,255,0.5); }
      `}</style>

      <Nav />
      <Hero />

      <div className="max-w-5xl mx-auto">
        <div className="border-t border-border opacity-20 mx-6" />
      </div>

      <About />

      <div className="max-w-5xl mx-auto">
        <div className="border-t border-border opacity-20 mx-6" />
      </div>

      <Education />

      <div className="max-w-5xl mx-auto">
        <div className="border-t border-border opacity-20 mx-6" />
      </div>

      <Experience />

      <div className="max-w-5xl mx-auto">
        <div className="border-t border-border opacity-20 mx-6" />
      </div>

      <Skills />

      <div className="max-w-5xl mx-auto">
        <div className="border-t border-border opacity-20 mx-6" />
      </div>

      <Projects />

      <div className="max-w-5xl mx-auto">
        <div className="border-t border-border opacity-20 mx-6" />
      </div>

      <Contact />
      <Footer />
    </div>
  );
}