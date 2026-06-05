const {
  CreateBrandSchema,
  UpdateBrandSchema,
} = require("../models/brand.model");

class BrandController {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res, next) {
    try {
      const data = await this.service.getAll();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const data = await this.service.getById(req.params.id);

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
      const dto = CreateBrandSchema.parse(req.body || {});
      const file = req.file;

      const imageUrl = file ? `/uploads/brands/${file.filename}` : null;

      const data = await this.service.create({
        ...dto,
        imageUrl,
      });

      res.status(201).json({
        success: true,
        data,
        message: "Create brand success",
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
      const dto = UpdateBrandSchema.parse(req.body || {});
      const file = req.file;

      const imageUrl = file ? `/uploads/brands/${file.filename}` : undefined;

      const data = await this.service.update(req.params.id, {
        ...dto,
        ...(imageUrl ? { imageUrl } : {}),
      });

      res.json({
        success: true,
        data,
        message: "Update brand success",
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.service.delete(req.params.id);

      res.json({
        success: true,
        message: "Deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BrandController;
