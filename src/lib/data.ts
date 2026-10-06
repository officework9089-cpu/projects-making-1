import dld from "@/assets/dld-counter.jpg";
import coding from "@/assets/coding.jpg";
import handwritten from "@/assets/handwritten.jpg";
import hero from "@/assets/hero-workspace.jpg";

export const WHATSAPP_URL = "https://wa.me/";
export const EMAIL = "hello@projectinthemaking.com";

export const services = [
  { title: "Assignments", desc: "Subject-based university assignments, research and practical work.", tags: ["Research", "Practical", "Documentation"] },
  { title: "Handwritten Work", desc: "Neat handwritten assignments, lab work, notes and diagrams.", tags: ["Lab files", "Notes", "Diagrams"] },
  { title: "Coding Projects", desc: "University programming projects across languages and frameworks.", tags: ["C++", "Java", "Python", "React"] },
  { title: "Hardware Projects", desc: "Electronics, Arduino and breadboard lab projects.", tags: ["Arduino", "Breadboard", "Electronics"] },
  { title: "DLD Projects", desc: "Counters, flip-flops, 7-segment displays, traffic lights, clocks.", tags: ["Logic gates", "MOD counters", "Registers"] },
  { title: "Multisim", desc: "Circuit simulation with clear simulation documentation.", tags: ["Digital", "Logic", "Simulation"] },
  { title: "Presentations", desc: "Project, seminar and academic slide decks.", tags: ["PowerPoint", "Seminar", "Slides"] },
  { title: "Reports & Docs", desc: "Project reports, lab reports, proposals, technical docs.", tags: ["Lab reports", "Proposals"] },
  { title: "Final Year Projects", desc: "From FYP idea to development, documentation and demo.", tags: ["Ideas", "Build", "Demo"] },
  { title: "Internship Projects", desc: "Internship reports, presentations and project work.", tags: ["Reports", "Presentations"] },
] as const;

export type Project = {
  slug: string; title: string; category: string; subject: string; type: string;
  image: string; desc: string; tech: string[]; included: string[]; gallery: string[];
};

export const projects: Project[] = [
  { slug: "mod-10-counter", title: "MOD-10 Counter", category: "DLD", subject: "Digital Logic Design", type: "Hardware", image: dld,
    desc: "Digital Logic Design hardware project using a breadboard and digital components.",
    tech: ["74HC393", "74HC4511", "7-Segment", "Breadboard"], included: ["Hardware", "Circuit", "Documentation", "Proposal", "Demonstration"], gallery: [dld, hero] },
  { slug: "flask-react-portal", title: "Course Enrollment Portal", category: "Coding", subject: "Web Engineering", type: "Software", image: coding,
    desc: "Full-stack course enrollment system with a Flask API and React dashboard.",
    tech: ["Python", "Flask", "React", "SQLite"], included: ["Source code", "Documentation", "Presentation"], gallery: [coding, hero] },
  { slug: "fluid-mechanics-assignment", title: "Fluid Mechanics Assignment", category: "Handwritten", subject: "Fluid Mechanics", type: "Handwritten", image: handwritten,
    desc: "Handwritten derivations with clean diagrams and step-by-step solutions.",
    tech: ["Handwritten", "Diagrams", "Derivations"], included: ["Handwritten pages", "Diagrams", "Scanned PDF"], gallery: [handwritten] },
  { slug: "dld-lab-report", title: "DLD Lab Report Pack", category: "Reports", subject: "Digital Logic Design", type: "Documentation", image: hero,
    desc: "Organized lab report set with truth tables, circuit diagrams and results.",
    tech: ["Word", "Truth tables", "Multisim"], included: ["Report", "Circuit diagrams", "Simulation"], gallery: [hero, dld] },
] as const;

export const categories = ["All", "DLD", "Coding", "Handwritten", "Reports"];

export const dldLab = ["DLD Traffic Light", "MOD-10 Counter", "Digital Clock", "Logic Gate Circuit", "Flip-Flop Circuit", "Counter Circuit", "7-Segment Display", "Other Hardware"];

export const faqs = [
  ["Do you work with all universities?", "Yes. Share your university's instructions and format and we follow them."],
  ["Do you provide handwritten work?", "Yes — handwritten assignments, lab files, notes and diagrams."],
  ["Do you make hardware projects?", "Yes, including DLD breadboard circuits, Arduino and electronics lab projects."],
  ["Can I see previous work?", "Our Work section shows real examples of completed projects."],
  ["Can I request changes?", "Yes. Changes are discussed and agreed as part of the scope."],
  ["How much does a project cost?", "Pricing depends on scope and deadline. Send your requirements for a quote."],
  ["Can I upload my university instructions?", "Yes — attach PDFs, Word files or images in the request form."],
] as const;
