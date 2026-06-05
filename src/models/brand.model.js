const { z } = require("zod");
const CreateBrandSchema = z.object({
  name: z.string().min(2).max(255),

  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),

  description: z.string().max(500).optional(),
  isActive: z.boolean().default(true),
});

const UpdateBrandSchema = CreateBrandSchema.partial();

module.exports = {
  CreateBrandSchema,
  UpdateBrandSchema,
};
