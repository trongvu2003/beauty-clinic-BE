const { z } = require("zod");

const CreateCategorySchema = z.object({
  name: z.string().min(2).max(255),

  slug: z
    .string()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9-]+$/)
    .optional(),

  description: z.string().max(500).optional(),
  metaTitle: z.string().max(70).optional(),
  metaDesc: z.string().max(160).optional(),
  isActive: z.boolean().default(true),
});

const UpdateCategorySchema = CreateCategorySchema.partial();

const CategoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  isActive: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

module.exports = {
  CreateCategorySchema,
  UpdateCategorySchema,
  CategoryQuerySchema,
};
