import type React from "react";
import {
  SiBiome,
  SiBun,
  SiChartdotjs,
  SiClaude,
  SiCloudflare,
  SiDocker,
  SiDrizzle,
  SiEslint,
  SiExpress,
  SiFastapi,
  SiFastify,
  SiGit,
  SiGithubactions,
  SiHeadlessui,
  SiHono,
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
  SiPosthog,
  SiPrettier,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRender,
  SiResend,
  SiRss,
  SiSentry,
  SiShadcnui,
  SiSpringboot,
  SiSqlalchemy,
  SiStripe,
  SiTailwindcss,
  SiTemporal,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiVsco,
  SiZod,
} from "react-icons/si";
import { Database, Activity, Flame, Route, Server, Zap } from "lucide-react";

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
  { icon: SiBun, label: "Bun" },
  { icon: SiHono, label: "Hono" },
  { icon: SiTemporal, label: "Temporal" },
  { icon: SiDrizzle, label: "Drizzle" },
  { icon: Zap, label: "Neon" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: Database, label: "pgvector" },
  { icon: Route, label: "LiteLLM" },
  { icon: SiRss, label: "RSS" },
  { icon: SiFastapi, label: "FastAPI" },
  { icon: SiFastify, label: "Fastify" },
  { icon: SiExpress, label: "Express" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiPython, label: "Python" },
  { icon: SiSpringboot, label: "Spring Boot" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiSqlalchemy, label: "SQLAlchemy" },
  { icon: SiZod, label: "Zod" },
  { icon: SiOpenapiinitiative, label: "OpenAPI" },
  { icon: SiOpenid, label: "OAuth" },
];

const platformStack: Technology[] = [
  { icon: SiStripe, label: "Stripe" },
  { icon: SiCloudflare, label: "Cloudflare" },
  { icon: Server, label: "Northflank" },
  { icon: Flame, label: "Firecrawl" },
  { icon: SiResend, label: "Resend" },
  { icon: SiSentry, label: "Sentry" },
  { icon: SiPosthog, label: "PostHog" },
  { icon: Activity, label: "Langfuse" },
  { icon: SiGithubactions, label: "GitHub Actions" },
  { icon: SiNetlify, label: "Netlify" },
  { icon: SiVercel, label: "Vercel" },
  { icon: SiRender, label: "Render" },
  { icon: SiDocker, label: "Docker" },
  { icon: SiGit, label: "Git" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiVitest, label: "Vitest" },
  { icon: SiMockserviceworker, label: "MSW" },
  { icon: SiBiome, label: "Biome" },
  { icon: SiEslint, label: "ESLint" },
  { icon: SiPrettier, label: "Prettier" },
  { icon: SiPnpm, label: "pnpm" },
  { icon: SiOllama, label: "Ollama" },
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
