const {
  CreateBlogSchema,
  UpdateBlogSchema,
  BlogQuerySchema,
} = require("../models/blog.model");

class BlogController {
  constructor(blogService) {
    this.blogService = blogService;
  }

  async getAll(req, res, next) {
    try {
      const query = BlogQuerySchema.parse(req.query);
      const result = await this.blogService.getAll(query);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const blog = await this.blogService.getById(req.params.id);
      res.json({
        success: true,
        data: blog,
      });
    } catch (err) {
      next(err);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const blog = await this.blogService.getBySlug(req.params.slug);
      res.json({ success: true, data: blog });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      if (typeof req.body.isPublished === "string") {
        req.body.isPublished =
          req.body.isPublished === "true" || req.body.isPublished === "1";
      }

      const dto = CreateBlogSchema.parse(req.body);

      const images = (req.files || []).map(
        (f) => `/uploads/blogs/${f.filename}`
      );

      const blog = await this.blogService.create({ ...dto, images });
      res.status(201).json({ success: true, data: blog });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (typeof req.body.isPublished === "string") {
        req.body.isPublished =
          req.body.isPublished === "true" || req.body.isPublished === "1";
      }

      const dto = UpdateBlogSchema.parse(req.body);
      const newImages = (req.files || []).map(
        (f) => `/uploads/blogs/${f.filename}`
      );
      if (newImages.length > 0) dto.images = newImages;

      const blog = await this.blogService.update(req.params.id, dto);
      res.json({ success: true, data: blog });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.blogService.delete(req.params.id);
      res.json({ success: true, message: "Xóa thành công" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BlogController;
