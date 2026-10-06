import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle, Send } from "lucide-react";
import logo from "@/assets/pitm-logo.jpg.asset.json";
import { WHATSAPP_URL, EMAIL } from "@/lib/data";
import { toast } from "sonner";

const nav = [
  ["Home", "/#home"], ["Our Work", "/#work"], ["Services", "/#services"], ["How It Works", "/#how"],
  ["Reviews", "/#reviews"], ["About", "/#about"], ["Contact", "/#contact"],
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-x-0 border-t-0" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-3">
          <img src={logo.url} alt="Project In The Making logo" className="h-9 w-9 rounded-full transition-shadow group-hover:shadow-glow-pink" />
          <span className="font-display text-sm font-bold tracking-wide">PROJECT IN THE <span className="text-gradient-warm">MAKING</span></span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(([l, h]) => (
            <a key={l} href={h} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l}<span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href="/#request" className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 lg:inline-block">Request a Project</a>
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="lg:hidden"><Menu /></button>
      </div>
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-background/70 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute right-0 top-0 flex h-full w-72 flex-col gap-5 bg-surface p-6 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="self-end"><X /></button>
          {nav.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="font-display text-lg">{l}</a>)}
          <a href="/#request" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-brand px-5 py-3 text-center font-semibold text-primary-foreground">Request a Project</a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3"><img src={logo.url} alt="" className="h-8 w-8 rounded-full" /> © {new Date().getFullYear()} Project In The Making</div>
        <div className="font-mono text-xs">Assignments • Projects • Coding • Hardware • Documentation</div>
        <a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a>
      </div>
    </footer>
  );
}

const quick = ["Assignment", "Coding Project", "DLD / Hardware", "Handwritten Work", "FYP", "Report", "Presentation", "Other"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", req: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error("Please add your name and WhatsApp number."); return; }
    const text = encodeURIComponent(`Hi! I'm ${form.name}. I need help with: ${topic}.\n${form.req}`);
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to start your request.");
    setOpen(false); setTopic(null); setForm({ name: "", phone: "", req: "" });
  };
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`absolute bottom-16 right-0 w-[min(22rem,calc(100vw-2.5rem))] origin-bottom-right rounded-2xl glass p-5 shadow-glow transition-all duration-300 ${open ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"}`}>
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <img src={logo.url} alt="" className="h-9 w-9 rounded-full" />
          <div><div className="font-display text-sm font-semibold">Project In The Making</div><div className="text-xs text-neon-cyan">● Usually replies fast</div></div>
        </div>
        <p className="mt-4 rounded-xl bg-surface-2 p-3 text-sm">Hi! What do you need help with?</p>
        {!topic ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {quick.map((q) => <button key={q} onClick={() => setTopic(q)} className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary">{q}</button>)}
          </div>
        ) : (
          <form onSubmit={submit} className="mt-3 space-y-2">
            <div className="text-xs text-muted-foreground">Topic: <span className="text-foreground">{topic}</span> <button type="button" onClick={() => setTopic(null)} className="underline">change</button></div>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg bg-surface-2 px-3 py-2 text-sm outline-none ring-primary focus:ring-1" />
            <input placeholder="WhatsApp number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg bg-surface-2 px-3 py-2 text-sm outline-none ring-primary focus:ring-1" />
            <textarea placeholder="Requirements" rows={3} value={form.req} onChange={(e) => setForm({ ...form, req: e.target.value })} className="w-full rounded-lg bg-surface-2 px-3 py-2 text-sm outline-none ring-primary focus:ring-1" />
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2 text-sm font-semibold text-primary-foreground"><Send className="h-4 w-4" /> Start Request</button>
          </form>
        )}
      </div>
      <button aria-label="Open chat" onClick={() => setOpen(!open)} className="grid h-14 w-14 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow-pink transition-transform hover:scale-105">
        {open ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}
