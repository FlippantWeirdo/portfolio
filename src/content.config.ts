import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    domain: z.enum(['software', 'engineering']),
    /** role = employment, placement = internship/SIWES, freelance = client work */
    kind: z.enum(['role', 'placement', 'freelance']),
    role: z.string(),
    timeframe: z.string(),
    /** short one-liner shown on cards */
    summary: z.string(),
    /** e.g. "in closed testing", "live", "in progress" — omit when n/a */
    status: z.string().optional(),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    featured: z.boolean().default(false),
    /** sort order within a lane, lower first */
    order: z.number().default(99),
  }),
});

export const collections = { projects };
