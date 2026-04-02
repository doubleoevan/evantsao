import type React from "react";
import {
  SiChartdotjs,
  SiClaude,
  SiDocker,
  SiFastapi,
  SiFastify,
  SiGit,
  SiHeadlessui,
  SiJavascript,
  SiJetbrains,
  SiMockserviceworker,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiOpenapiinitiative,
  SiOpenid,
  SiPnpm,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRender,
  SiShadcnui,
  SiSpringboot,
  SiSqlalchemy,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiVsco,
  SiZod,
} from "react-icons/si";
import { Database, Activity } from "lucide-react";

import InfiniteCarousel from "./InfiniteCarousel";
import TechTag from "./TechTag.tsx";

type Technology = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const frontendStack: Technology[] = [
  { icon: SiReact, label: "React" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiVite, label: "Vite" },
  { icon: SiReactrouter, label: "React Router" },
  { icon: SiShadcnui, label: "shadcn/ui" },
  { icon: SiHeadlessui, label: "Headless UI" },
  { icon: SiChartdotjs, label: "Chart.js" },
];

const backendStack: Technology[] = [
  { icon: SiFastapi, label: "FastAPI" },
  { icon: SiFastify, label: "Fastify" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiPython, label: "Python" },
  { icon: SiSpringboot, label: "Spring Boot" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiSqlalchemy, label: "SQLAlchemy" },
  { icon: Database, label: "pgvector" },
  { icon: SiZod, label: "Zod" },
  { icon: SiOpenapiinitiative, label: "OpenAPI" },
  { icon: SiOpenid, label: "OAuth" },
];

const platformStack: Technology[] = [
  { icon: SiNetlify, label: "Netlify" },
  { icon: SiVercel, label: "Vercel" },
  { icon: SiRender, label: "Render" },
  { icon: SiDocker, label: "Docker" },
  { icon: SiGit, label: "Git" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiVitest, label: "Vitest" },
  { icon: SiMockserviceworker, label: "MSW" },
  { icon: SiPnpm, label: "pnpm" },
  { icon: SiOllama, label: "Ollama" },
  { icon: Activity, label: "Langfuse" },
  { icon: SiJetbrains, label: "IntelliJ" },
  { icon: SiVsco, label: "VS Code" },
  { icon: SiClaude, label: "Claude Code" },
];

const stacks = [frontendStack, backendStack, platformStack];

export function TechStacks() {
  return (
    <div className="z-30 mx-auto flex w-full flex-col">
      <div className="space-y-3">
        {stacks.map((stack, index) => (
          <InfiniteCarousel
            key={index}
            duration={45000 + index * 6000}
            direction={index % 2 === 0 ? "normal" : "reverse"}
          >
            {stack.map((technology) => (
              <TechTag key={technology.label} icon={technology.icon} label={technology.label} />
            ))}
          </InfiniteCarousel>
        ))}
      </div>
    </div>
  );
}
