export interface Project {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  category: string;
  description: string;
  badge: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'planpulse',
    title: 'PlanPulse',
    url: 'https://planpulse.mypi.co/',
    displayUrl: 'planpulse.mypi.co',
    category: 'Productivity & Planning',
    description: 'Intelligente Projekt- & Aufgabenplanung mit modernem Dashboard und Workflow-Automation.',
    badge: 'Live Platform',
    tags: ['Web App', 'Productivity', 'React'],
  },
  {
    id: 'mein-schach2',
    title: 'Mein Schach 2',
    url: 'https://mein-schach2.onrender.com/',
    displayUrl: 'mein-schach2.onrender.com',
    category: 'Realtime Multiplayer Game',
    description: 'Interaktives Online-Schachspiel mit Echtzeit-Zügen, Matchmaking und responsivem Brett.',
    badge: 'Game Engine',
    tags: ['Realtime', 'Gaming', 'WebSockets'],
  },
  {
    id: 'dampf',
    title: 'Dampf',
    url: 'https://dampf.mypi.co/',
    displayUrl: 'dampf.mypi.co',
    category: 'Creative Hub & Community',
    description: 'Moderne Community- & Media-Plattform mit ansprechendem UI-Design und schnellen Ladezeiten.',
    badge: 'Web App',
    tags: ['Community', 'Creative UI', 'Fullstack'],
  },
  {
    id: 'nexo',
    title: 'Nexo',
    url: 'https://nexo-eight-blond.vercel.app/',
    displayUrl: 'nexo-eight-blond.vercel.app',
    category: 'High-Performance Web Portal',
    description: 'Elegante, auf Performance optimierte Next-Gen Webanwendung mit dynamischen Interfaces.',
    badge: 'Vercel Fast',
    tags: ['Next.js', 'High Speed', 'Tailwind'],
  },
  {
    id: 'gaming',
    title: 'Gaming Hub',
    url: 'https://gaming.mypi.co/',
    displayUrl: 'gaming.mypi.co',
    category: 'Gamer Portal & Stats',
    description: 'Gaming-Zentrale für Statistiken, Game-Launcher und Community-Features im Cyber-Look.',
    badge: 'Gaming',
    tags: ['Gaming', 'Interactive', 'Dashboard'],
  },
];
