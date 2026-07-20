import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Colección del portfolio: un archivo markdown por proyecto.
// Sveltia CMS crea/edita/borra estos archivos desde /admin.
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    category: z.string().default('Producción Fotográfica'),
    description: z.string().default(''),
    photographer: z.string().optional(),
    photographerLink: z.string().optional(),
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { portfolio };
