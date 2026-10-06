import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, FileText, PenLine, Code2, Cpu, CircuitBoard, Activity, Presentation, BookOpen, GraduationCap, Briefcase,
  Search, Star, ShieldCheck, MessageSquare, Zap, FolderCheck, Layers, Lock, Eye, ListChecks, Mail, Instagram, Facebook, Phone, X,
} from "lucide-react";
import { toast } from "sonner";
import hero from "@/assets/hero-workspace.jpg";
import dld from "@/assets/dld-counter.jpg";
import handwritten from "@/assets/handwritten.jpg";
import { services, projects, categories, dldLab, faqs, WHATSAPP_URL, EMAIL, type Project } from "@/lib/data";
import { RequestForm } from "@/components/site/RequestForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project In The Making — From Idea to Final Submission" },
      { name: "description", content: "Assignments, handwritten work, coding, DLD hardware, reports, presentations and FYPs for university students." },
      { property: "og:title", content: "Project In The Making — From Idea to Final Submission" },
      { property: "og:description", content: "Academic project studio: assignments, coding, hardware and documentation." },
    ],
  }),
  component: Index,
});

const icons = [FileText, PenLine, Code2, Cpu, CircuitBoard, Activity, Presentation, BookOpen, GraduationCap, Briefcase];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">{children}</div>;
}

function Hero() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const [sy, setSy] = useState(0);
  useEffect(() => { const on = () => setSy(window.scrollY); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []);
  return (
    <section id="home" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setM({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); }}
      className="relative overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-neon-blue/25 blur-[120px]" />
      <div className="absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full bg-neon-pink/20 blur-[120px]" />
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
        <path d="M0 300 H300 L340 260 H700" className="animate-dash fill-none stroke-neon-blue" strokeWidth="1" />
        <path d="M100% 500 H900 L860 540 H500" className="animate-dash fill-none stroke-neon-purple" strokeWidth="1" />
      </svg>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr]">
        <div style={{ transform: `perspective(1000px) rotateY(${m.x * 6}deg) rotateX(${-m.y * 6}deg)` }} className="transition-transform duration-200">
          <Eyebrow>Assignments • Projects • Coding • Hardware • Documentation</Eyebrow>
          <h1 className="text-3d mt-6 text-4xl font-extrabold uppercase leading-[1.02] sm:text-5xl xl:text-6xl">
            Your university work,<br /><span className="text-gradient">from idea to</span><br /><span className="text-gradient-warm">final submission.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Assignments, handwritten work, coding projects, DLD hardware projects, reports, presentations, FYPs and more.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">View Our Work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            <a href="#request" className="rounded-full gradient-border px-6 py-3 font-semibold transition hover:[--gb-opacity:1]">Request a Project</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-muted-foreground hover:text-foreground"><MessageSquare className="h-4 w-4" /> Chat With Us</a>
          </div>
        </div>
        <div className="relative" style={{ transform: `translate3d(${m.x * -24}px, ${m.y * -24 + sy * 0.12}px, 0) scale(${1 - Math.min(sy, 600) / 6000})` }}>
          <div className="absolute inset-6 rounded-[2rem] bg-brand opacity-40 blur-3xl" />
          <img src={hero} alt="Glowing academic workspace with laptop, circuits and documents" width={1408} height={1152} className="relative rounded-[2rem] border border-border shadow-glow" />
          <div className="absolute -left-4 top-10 hidden animate-float rounded-xl glass px-4 py-3 font-mono text-xs sm:block" style={{ transform: `translate(${m.x * 30}px, ${m.y * 30}px)` }}>
            <span className="text-neon-pink">const</span> grade = <span className="text-neon-yellow">"A+"</span>;
          </div>
          <div className="absolute -right-3 bottom-10 hidden animate-float rounded-xl glass px-4 py-3 text-xs [animation-delay:1.5s] sm:block">
            <div className="font-mono text-neon-cyan">MOD-10 ▸ 0→9</div><div className="text-muted-foreground">Breadboard verified</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0); const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (!e?.isIntersecting) return; io.disconnect(); const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min((t - t0) / 1400, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    if (ref.current) io.observe(ref.current); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Stats() {
  const s = [[<Counter to={100} suffix="+" />, "Projects & Assignments"], [<Counter to={10} suffix="+" />, "Service Categories"], ["Multiple", "Academic Domains"], ["Fast", "Requirement Response"]] as const;
  return (
    <section className="mx-auto -mt-4 max-w-7xl px-5">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {s.map(([n, l], i) => <div key={i} className="bg-background p-6 text-center transition-colors hover:bg-surface"><div className="font-display text-3xl font-extrabold text-gradient md:text-4xl">{n}</div><div className="mt-1 text-sm text-muted-foreground">{l}</div></div>)}
      </div>
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-10">
        {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-10 font-display text-xl font-semibold text-muted-foreground"><span>{t}</span><span className="text-neon-yellow">✦</span></span>)}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-28">
      <div className="reveal max-w-2xl"><Eyebrow>Services</Eyebrow><h2 className="mt-3 text-4xl font-bold md:text-5xl">Everything your semester throws at you.</h2></div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((s, i) => { const I = icons[i] ?? FileText; return (
          <div key={s.title} className="reveal group relative rounded-2xl bg-surface/60 p-6 gradient-border transition-all duration-300 hover:-translate-y-2 hover:bg-surface hover:shadow-glow hover:[--gb-opacity:1]" style={{ transitionDelay: `${(i % 5) * 60}ms` }}>
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"><I className="h-5 w-5" /></div>
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{s.tags.map((t) => <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>)}</div>
            <ArrowRight className="mt-5 h-4 w-4 text-primary transition-transform group-hover:translate-x-1.5" />
          </div>); })}
      </div>
    </section>
  );
}

function TiltCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <button onClick={onOpen} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setT({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); }} onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateY(${t.x * 8}deg) rotateX(${-t.y * 8}deg)` }}
      className="group relative block overflow-hidden rounded-2xl border border-border text-left transition-transform duration-200">
      <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="font-mono text-xs text-neon-cyan">{p.category} • {p.type}</div>
        <h3 className="mt-1 text-xl font-bold">{p.title}</h3>
        <div className="mt-3 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
          {p.tech.map((x) => <span key={x} className="rounded-full glass px-2 py-0.5 text-[11px]">{x}</span>)}
        </div>
        <div className="mt-3 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">View Project →</div>
      </div>
    </button>
  );
}

function Lightbox({ p, onClose }: { p: Project; onClose: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") setI((x) => (x + 1) % p.gallery.length); if (e.key === "ArrowLeft") setI((x) => (x - 1 + p.gallery.length) % p.gallery.length); };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [p, onClose]);
  let sx = 0;
  return (
    <div className="fixed inset-0 z-[60] flex animate-in fade-in items-center justify-center bg-background/90 p-4 backdrop-blur-md" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="grid max-h-[92vh] w-full max-w-5xl animate-in zoom-in-95 gap-6 overflow-auto rounded-3xl glass p-5 md:grid-cols-[1.5fr_1fr]">
        <div>
          <img src={p.gallery[i]} alt={p.title} className="w-full rounded-2xl" onTouchStart={(e) => (sx = e.touches[0]?.clientX ?? 0)} onTouchEnd={(e) => { const d = (e.changedTouches[0]?.clientX ?? 0) - sx; if (Math.abs(d) > 40) setI((x) => (x + (d < 0 ? 1 : -1) + p.gallery.length) % p.gallery.length); }} />
          <div className="mt-3 flex gap-2">{p.gallery.map((g, j) => <button key={j} onClick={() => setI(j)} className={`overflow-hidden rounded-lg border-2 ${j === i ? "border-primary" : "border-transparent opacity-60"}`}><img src={g} alt="" className="h-14 w-20 object-cover" /></button>)}</div>
        </div>
        <div className="relative">
          <button aria-label="Close" onClick={onClose} className="absolute right-0 top-0"><X /></button>
          <div className="font-mono text-xs text-neon-cyan">{p.category} • {p.subject}</div>
          <h3 className="mt-2 text-3xl font-bold">{p.title}</h3>
          <p className="mt-3 text-muted-foreground">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((x) => <span key={x} className="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-xs">{x}</span>)}</div>
          <Link to="/work/$slug" params={{ slug: p.slug }} className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground">Full case study →</Link>
        </div>
      </div>
    </div>
  );
}

function Work() {
  const [cat, setCat] = useState("All"); const [q, setQ] = useState(""); const [open, setOpen] = useState<Project | null>(null);
  const list = useMemo(() => projects.filter((p) => (cat === "All" || p.category === cat) && (p.title + p.subject + p.tech.join(" ")).toLowerCase().includes(q.toLowerCase())), [cat, q]);
  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28">
      <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><Eyebrow>Portfolio</Eyebrow><h2 className="text-3d mt-3 text-5xl font-extrabold md:text-6xl">OUR WORK</h2><p className="mt-3 text-muted-foreground">Explore real project examples and completed work.</p></div>
        <label className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2.5 md:w-72"><Search className="h-4 w-4 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects..." className="w-full bg-transparent text-sm outline-none" /></label>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">{categories.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm transition ${cat === c ? "bg-brand text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>)}</div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">{list.map((p) => <TiltCard key={p.slug} p={p} onOpen={() => setOpen(p)} />)}</div>
      {!list.length && <p className="mt-10 text-center text-muted-foreground">No projects match your search.</p>}
      {open && <Lightbox p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function DldLab() {
  const ref = useRef<HTMLDivElement>(null); const paused = useRef(false);
  useEffect(() => { const id = setInterval(() => { const el = ref.current; if (!el || paused.current) return; el.scrollLeft += 1; if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0; }, 20); return () => clearInterval(id); }, []);
  const drag = useRef<{ x: number; s: number } | null>(null);
  return (
    <section className="relative overflow-hidden bg-surface/40 py-28">
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden><defs><pattern id="c" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M0 60 H50 L60 50 H120 M60 0 V40" className="fill-none stroke-neon-blue" /><circle cx="60" cy="50" r="3" className="fill-neon-pink" /></pattern></defs><rect width="100%" height="100%" fill="url(#c)" /></svg>
      <div className="relative mx-auto max-w-7xl px-5"><Eyebrow>Breadboards & logic</Eyebrow><h2 className="mt-3 text-4xl font-extrabold md:text-6xl">DLD & <span className="text-gradient-warm">HARDWARE LAB</span></h2></div>
      <div ref={ref} onMouseEnter={() => (paused.current = true)} onMouseLeave={() => { paused.current = false; drag.current = null; }}
        onMouseDown={(e) => (drag.current = { x: e.clientX, s: ref.current!.scrollLeft })} onMouseUp={() => (drag.current = null)}
        onMouseMove={(e) => { if (drag.current && ref.current) ref.current.scrollLeft = drag.current.s - (e.clientX - drag.current.x); }}
        onTouchStart={() => (paused.current = true)} onTouchEnd={() => (paused.current = false)}
        className="relative mt-12 flex cursor-grab gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] active:cursor-grabbing">
        {[...dldLab, ...dldLab].map((t, i) => (
          <div key={i} className="group relative w-72 shrink-0 select-none overflow-hidden rounded-2xl border border-border">
            <img src={i % 2 ? hero : dld} alt={t} draggable={false} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-0 p-5"><div className="font-mono text-xs text-neon-yellow">LAB-{String((i % dldLab.length) + 1).padStart(2, "0")}</div><div className="mt-1 text-lg font-bold">{t}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Handwritten() {
  const rot = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"];
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-28 lg:grid-cols-2">
      <div className="reveal"><Eyebrow>Ink on paper</Eyebrow><h2 className="mt-3 text-4xl font-extrabold md:text-6xl">HANDWRITTEN WORK</h2>
        <p className="mt-4 max-w-md text-muted-foreground">Neat, readable handwritten assignments, lab files, notes and diagrams — the way your instructor expects them.</p>
        <a href="#request" className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3 font-semibold text-background">Request Handwritten Work <ArrowRight className="h-4 w-4" /></a>
      </div>
      <div className="relative h-[28rem]">
        {rot.map((r, i) => (
          <div key={i} className={`absolute w-56 bg-paper p-2 shadow-paper transition-all duration-500 hover:z-10 hover:-translate-y-4 hover:rotate-0 hover:scale-105 ${r}`} style={{ left: `${i * 18}%`, top: `${(i % 2) * 14}%` }}>
            <img src={handwritten} alt="Handwritten assignment page" loading="lazy" className="w-full opacity-90 blur-[0.3px] transition hover:opacity-100 hover:blur-0" />
          </div>
        ))}
      </div>
    </section>
  );
}

function How() {
  const s = [["Send Requirements", "Tell us what you need."], ["Discuss", "Discuss scope, requirements, deadline and pricing."], ["Work", "The agreed project/work is prepared according to the requirements."], ["Delivery", "Receive the agreed work and documentation."]];
  return (
    <section id="how" className="mx-auto max-w-7xl px-5 py-28">
      <div className="reveal"><Eyebrow>Process</Eyebrow><h2 className="mt-3 text-4xl font-bold md:text-5xl">How it works</h2></div>
      <div className="relative mt-14 grid gap-10 md:grid-cols-4">
        <div className="absolute left-5 top-0 h-full w-px bg-brand md:left-0 md:top-5 md:h-px md:w-full" />
        {s.map(([t, d], i) => (
          <div key={t} className="reveal relative pl-14 md:pl-0 md:pt-14" style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-background font-mono text-sm shadow-glow gradient-border [--gb-opacity:1]">0{i + 1}</div>
            <h3 className="font-display text-lg font-bold uppercase">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const [open, setOpen] = useState(false);
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-5 py-28">
      <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><Eyebrow>Student reviews</Eyebrow><h2 className="mt-3 text-4xl font-bold md:text-5xl">What students say</h2></div>
        <button onClick={() => setOpen(!open)} className="rounded-full gradient-border px-5 py-2.5 text-sm font-semibold">Submit Your Review</button>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {([["A.K.", "Computer Engineering", "Report"], ["S.M.", "Electrical Engineering", "DLD Project"], ["H.R.", "Software Engineering", "Coding"]] as const).map(([n, d, s]) => (
          <figure key={n} className="reveal rounded-2xl glass p-6">
            <span className="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">Demo review</span>
            <div className="mt-4 flex gap-0.5 text-neon-yellow">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
            <blockquote className="mt-3">"The project documentation was properly organized and the communication was good."</blockquote>
            <figcaption className="mt-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-brand font-bold text-primary-foreground">{n[0]}</div><div className="text-sm"><div className="font-semibold">{n}</div><div className="text-muted-foreground">{d} • {s}</div></div></figcaption>
          </figure>
        ))}
      </div>
      {open && (
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Thanks! Your review is pending approval."); setOpen(false); }} className="mt-8 grid animate-in fade-in gap-4 rounded-2xl glass p-6 sm:grid-cols-2">
          {["Name / Initials", "University", "Department", "Service"].map((p) => <input key={p} required placeholder={p} className="rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm outline-none focus:border-primary" />)}
          <select className="rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm">{[5, 4, 3, 2, 1].map((r) => <option key={r}>{r} stars</option>)}</select>
          <input type="file" accept="image/*" className="text-sm text-muted-foreground" />
          <textarea required placeholder="Your review" rows={3} className="rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2" />
          <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" required /> I give permission to publish this review.</label>
          <button className="rounded-full bg-brand py-3 text-sm font-semibold text-primary-foreground sm:col-span-2">Submit review</button>
        </form>
      )}
    </section>
  );
}

function Why() {
  const w = [[ShieldCheck, "Quality Work"], [MessageSquare, "Clear Communication"], [Zap, "Fast Response"], [FolderCheck, "Organized Documentation"], [Layers, "Multiple Service Categories"], [Lock, "Confidentiality"], [Eye, "Real Portfolio"], [ListChecks, "Requirement-Based Workflow"]] as const;
  return (
    <section className="mx-auto max-w-7xl px-5 py-28">
      <div className="reveal"><Eyebrow>Why us</Eyebrow><h2 className="mt-3 text-4xl font-bold md:text-5xl">Built on trust, delivered with care.</h2></div>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {w.map(([I, t]) => <div key={t} className="reveal group rounded-2xl border border-border p-6 transition hover:border-primary/50 hover:bg-surface"><I className="h-7 w-7 text-neon-pink transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" /><div className="mt-4 font-semibold">{t}</div></div>)}
      </div>
    </section>
  );
}

function About() {
  const tl = [["Idea", "Your requirements and university brief."], ["Build", "Code, circuits, handwriting or documentation."], ["Submit", "Organized, ready-to-submit work."]];
  return (
    <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-28 lg:grid-cols-2">
      <div className="reveal"><Eyebrow>About</Eyebrow><h2 className="text-3d mt-3 text-5xl font-extrabold leading-none md:text-7xl">PROJECT<br />IN THE<br /><span className="text-gradient-warm">MAKING</span></h2></div>
      <div className="reveal space-y-4 text-muted-foreground">
        <p>Project In The Making provides paid academic project and documentation services for university students.</p>
        <p>We work across different academic areas, including assignments, coding, handwritten work, DLD hardware projects, reports, presentations, FYP documentation and more.</p>
        <p>Our portfolio allows students to see examples of our work before contacting us.</p>
        <ol className="mt-8 space-y-5 border-l border-border pl-6">
          {tl.map(([t, d]) => <li key={t} className="relative"><span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-brand animate-pulse-glow" /><div className="font-display font-semibold text-foreground">{t}</div><div className="text-sm">{d}</div></li>)}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const ch = [[Phone, "WhatsApp", "Chat Now", WHATSAPP_URL], [Mail, "Email", "Send Email", `mailto:${EMAIL}`], [Instagram, "Instagram", "Follow Us", "https://instagram.com"], [Facebook, "Facebook", "Visit Page", "https://facebook.com"]] as const;
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-28">
      <div className="reveal"><Eyebrow>Contact</Eyebrow><h2 className="mt-3 text-4xl font-bold md:text-5xl">Let's talk about your project.</h2></div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {ch.map(([I, t, c, h]) => <a key={t} href={h} target="_blank" rel="noreferrer" className="group rounded-2xl glass p-6 transition hover:-translate-y-1 hover:shadow-glow"><I className="h-6 w-6 text-primary" /><div className="mt-6 font-semibold">{t}</div><div className="mt-1 text-sm text-muted-foreground group-hover:text-primary">{c} →</div></a>)}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Request sent! We'll get back to you soon."); (e.target as HTMLFormElement).reset(); }} className="space-y-3 rounded-2xl glass p-6">
          <h3 className="font-display text-lg font-semibold">Quick Request</h3>
          {["Name", "WhatsApp", "What do you need?"].map((p) => <input key={p} required placeholder={p} className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm outline-none focus:border-primary" />)}
          <textarea placeholder="Message" rows={3} className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm outline-none focus:border-primary" />
          <button className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-primary-foreground">Send Request</button>
        </form>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Marquee items={["C++", "Java", "Python", "React", "Arduino", "Multisim", "Logic Gates", "Flip-Flops", "PowerPoint", "Lab Reports", "FYP"]} />
      <Work />
      <DldLab />
      <Handwritten />
      <How />
      <Reviews />
      <Why />
      <section id="request" className="mx-auto max-w-4xl px-5 py-28">
        <div className="reveal text-center"><Eyebrow>Request a project</Eyebrow><h2 className="mt-3 text-4xl font-extrabold md:text-6xl">Have a Project <span className="text-gradient">in Mind?</span></h2><p className="mt-3 text-muted-foreground">Send us your requirements and we'll discuss the next steps.</p></div>
        <div className="mt-12 rounded-3xl glass p-6 shadow-glow md:p-10"><RequestForm /></div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-20">
        <div className="reveal text-center"><Eyebrow>FAQ</Eyebrow><h2 className="mt-3 text-4xl font-bold">Questions, answered.</h2></div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="text-left font-display">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>)}
        </Accordion>
      </section>
      <About />
      <Contact />
    </main>
  );
}
