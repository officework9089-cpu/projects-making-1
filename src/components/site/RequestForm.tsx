import { useState } from "react";
import { Check, UploadCloud, X, Loader2 } from "lucide-react";
import { services } from "@/lib/data";

const steps = ["Personal", "Academic", "Work", "Files", "Budget"];
type F = Record<string, string>;
const field = "w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:shadow-glow";

export function RequestForm() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<F>({});
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<F>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [drag, setDrag] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const required: Record<number, string[]> = { 0: ["name", "whatsapp"], 1: ["university"], 2: ["service", "requirements"] };
  const validate = () => {
    const e: F = {};
    (required[step] || []).forEach((k) => { if (!f[k]?.trim()) e[k] = "Required"; });
    if (step === 0 && f["email"] && !/^\S+@\S+\.\S+$/.test(f["email"])) e["email"] = "Invalid email";
    if (step === 0 && f["whatsapp"] && !/^[+\d\s-]{7,20}$/.test(f["whatsapp"])) e["whatsapp"] = "Invalid number";
    setErrors(e); return !Object.keys(e).length;
  };
  const next = () => validate() && setStep((s) => Math.min(s + 1, 4));
  const submit = () => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1200); };
  const In = (k: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block text-sm"><span className="mb-1.5 block text-muted-foreground">{label}</span>
      <input value={f[k] || ""} onChange={set(k)} className={`${field} ${errors[k] ? "border-destructive" : ""}`} {...props} />
      {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}
    </label>
  );

  if (done) return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="grid h-20 w-20 animate-in zoom-in place-items-center rounded-full bg-brand shadow-glow"><Check className="h-10 w-10 text-primary-foreground" /></div>
      <p className="mt-6 max-w-md text-lg">Request received! We'll review your requirements and contact you with the next steps.</p>
      <button onClick={() => { setDone(false); setStep(0); setF({}); setFiles([]); }} className="mt-6 text-sm text-primary underline">Send another request</button>
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-xs transition-all ${i <= step ? "bg-brand text-primary-foreground shadow-glow" : "border border-border text-muted-foreground"}`}>0{i + 1}</div>
            {i < 4 && <div className="mx-2 h-px flex-1 bg-border"><div className="h-px bg-brand transition-all duration-500" style={{ width: i < step ? "100%" : "0%" }} /></div>}
          </div>
        ))}
      </div>
      <div key={step} className="grid animate-in fade-in slide-in-from-right-4 gap-4 duration-300 sm:grid-cols-2">
        {step === 0 && <>{In("name", "Name *")}{In("whatsapp", "WhatsApp Number *", { inputMode: "tel" })}<div className="sm:col-span-2">{In("email", "Email", { type: "email" })}</div></>}
        {step === 1 && <>{In("university", "University *")}{In("department", "Department")}{In("semester", "Semester")}{In("subject", "Subject")}</>}
        {step === 2 && <>
          <label className="block text-sm"><span className="mb-1.5 block text-muted-foreground">Service Type *</span>
            <select value={f["service"] || ""} onChange={set("service")} className={`${field} ${errors["service"] ? "border-destructive" : ""}`}>
              <option value="">Select…</option>{services.map((s) => <option key={s.title}>{s.title}</option>)}
            </select>{errors["service"] && <span className="mt-1 block text-xs text-destructive">Required</span>}</label>
          {In("title", "Project Title")}{In("deadline", "Deadline", { type: "date" })}{In("format", "Preferred Format", { placeholder: "PDF, Word, hardware…" })}
          <label className="block text-sm sm:col-span-2"><span className="mb-1.5 block text-muted-foreground">Requirements *</span>
            <textarea rows={4} value={f["requirements"] || ""} onChange={set("requirements")} className={`${field} ${errors["requirements"] ? "border-destructive" : ""}`} />
            {errors["requirements"] && <span className="mt-1 block text-xs text-destructive">Required</span>}</label>
        </>}
        {step === 3 && <div className="sm:col-span-2">
          <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); setFiles([...files, ...Array.from(e.dataTransfer.files)]); }}
            className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed p-10 text-center transition ${drag ? "border-primary bg-primary/10" : "border-border"}`}>
            <UploadCloud className="h-10 w-10 text-primary" />
            <span className="mt-3 font-medium">Drop files or click to upload</span>
            <span className="text-xs text-muted-foreground">PDF, Word, images, reference files, instructions</span>
            <input type="file" multiple accept=".pdf,.doc,.docx,image/*" className="hidden" onChange={(e) => setFiles([...files, ...Array.from(e.target.files || [])])} />
          </label>
          <ul className="mt-4 space-y-2">{files.map((fl, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2 text-sm">
              <span className="truncate">{fl.name}</span>
              <button aria-label="Remove file" onClick={() => setFiles(files.filter((_, j) => j !== i))}><X className="h-4 w-4" /></button>
            </li>))}</ul>
        </div>}
        {step === 4 && <div className="sm:col-span-2">{In("budget", "Budget (optional)", { placeholder: "e.g. PKR 5,000" })}</div>}
      </div>
      <div className="mt-8 flex justify-between">
        <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full border border-border px-6 py-2.5 text-sm disabled:opacity-30">Back</button>
        {step < 4 ? <button onClick={next} className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">Continue</button>
          : <button onClick={submit} disabled={loading} className="flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">{loading && <Loader2 className="h-4 w-4 animate-spin" />}Submit Requirements</button>}
      </div>
    </div>
  );
}
