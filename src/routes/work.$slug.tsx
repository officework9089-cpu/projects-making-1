import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { projects } from "@/lib/data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const t = `${loaderData?.project.title ?? "Project"} — Project In The Making`;
    const d = loaderData?.project.desc ?? "Project case study.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-28">
      <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to work</Link>
      <div className="mt-6 font-mono text-xs uppercase tracking-widest text-neon-cyan">{p.category} / {p.type}</div>
      <h1 className="text-3d mt-2 text-5xl font-extrabold uppercase md:text-7xl">{p.title}</h1>
      <div className="mt-10 overflow-hidden rounded-3xl gradient-border">
        <img src={p.image} alt={p.title} className="aspect-[16/9] w-full object-cover" />
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold">Project Overview</h2>
          <p className="mt-3 text-muted-foreground">{p.desc}</p>
          <h2 className="mt-10 text-2xl font-bold">Project Gallery</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">{p.gallery.map((g, i) => <img key={i} src={g} alt="" loading="lazy" className="rounded-2xl transition-transform duration-500 hover:scale-[1.03]" />)}</div>
        </div>
        <aside className="h-fit rounded-2xl glass p-6">
          <h3 className="font-semibold">Project Information</h3>
          <dl className="mt-4 space-y-2 text-sm">
            {[["Category", p.category], ["Subject", p.subject], ["Type", p.type]].map(([k, v]) => <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <h3 className="mt-6 font-semibold">What Was Included?</h3>
          <ul className="mt-3 space-y-2 text-sm">{p.included.map((i) => <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-neon-cyan" />{i}</li>)}</ul>
          <div className="mt-6 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs">{t}</span>)}</div>
          <a href="/#request" className="mt-6 block rounded-full bg-brand py-3 text-center text-sm font-semibold text-primary-foreground shadow-glow">Request a Similar Project</a>
        </aside>
      </div>
    </main>
  );
}
