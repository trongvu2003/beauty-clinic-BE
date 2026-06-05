const {
  CreateCategorySchema,
  UpdateCategorySchema,
} = require("../models/category.model");

class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  async getAll(req, res, next) {
    try {
      const data = await this.categoryService.getAll();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const data = await this.categoryService.getById(req.params.id);

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      if (typeof req.body.isActive === "string") {
        req.body.isActive =
          req.body.isActive === "true" || req.body.isActive === "1";
      }
      // validate body
      const dto = CreateCategorySchema.parse(req.body || {});

      // file từ multer
      const file = req.file;

      const imageUrl = file ? `/uploads/categories/${file.filename}` : null;

      const data = await this.categoryService.create({
        ...dto,
        imageUrl,
      });

      res.status(201).json({
        success: true,
        data,
        message: "Create category success",
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (typeof req.body.isActive === "string") {
        req.body.isActive =
          req.body.isActive === "true" || req.body.isActive === "1";
      }
      const dto = UpdateCategorySchema.parse(req.body || {});

      const file = req.file;

      const imageUrl = file
        ? `/uploads/categories/${file.filename}`
        : undefined;

      const data = await this.categoryService.update(req.params.id, {
        ...dto,
        ...(imageUrl ? { imageUrl } : {}),
      });

      res.json({
        success: true,
        data,
        message: "Update category success",
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.categoryService.delete(req.params.id);

      res.json({
        success: true,
        message: "Deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
