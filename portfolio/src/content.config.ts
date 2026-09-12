import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const interviewCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/interview" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Architect']).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const salesforceCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/salesforce" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const architectureCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/architecture" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const resourcesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'interview': interviewCollection,
  'salesforce': salesforceCollection,
  'architecture': architectureCollection,
  'resources': resourcesCollection,
};
