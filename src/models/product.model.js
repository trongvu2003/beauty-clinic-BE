const { z } = require("zod");

const CreateProductSchema = z.object({
  name: z.string().min(2).max(255),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  sku: z.string().optional(), // mã sp nội bộ
  description: z.string().optional(),
  content: z.string().optional(),
  price: z.coerce.number().positive(),
  salePrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0).default(0),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
  ingredients: z.string().optional(), // thành phần
  howToUse: z.string().optional(),
  isActive: z.coerce.boolean().default(true),
  isFeatured: z.coerce.boolean().default(false), // sản phẩm nổi bật
  metaTitle: z.string().max(70).optional(), // tiêu đề SEO
  metaDesc: z.string().max(160).optional(), // mô tả SEO
  metaKeywords: z.string().optional(), // từ khóa SEO
  categoryId: z.string().uuid(),
  brandId: z.string().uuid().optional(),
});

const UpdateProductSchema = CreateProductSchema.partial();

const ProductQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  categoryId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
  isFeatured: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

module.exports = {
  CreateProductSchema,
  UpdateProductSchema,
  ProductQuerySchema,
};
