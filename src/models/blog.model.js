const { z } = require("zod");

const CreateBlogSchema = z.object({
  title: z.string().min(2).max(255),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(), // Slug URL-friendly, chỉ chứa chữ thường, số và dấu gạch ngang
  excerpt: z.string().max(300).optional(), // Tóm tắt ngắn gọn
  content: z.string().min(1),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().datetime().optional(),
  authorName: z.string().optional(),
  metaTitle: z.string().max(70).optional(), // Tiêu đề SEO
  metaDesc: z.string().max(160).optional(), // Mô tả SEO
  metaKeywords: z.string().optional(), // Từ khóa SEO, có thể là chuỗi phân tách bằng dấu phẩy
});

const UpdateBlogSchema = CreateBlogSchema.partial();

const BlogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  isPublished: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

module.exports = { CreateBlogSchema, UpdateBlogSchema, BlogQuerySchema };
