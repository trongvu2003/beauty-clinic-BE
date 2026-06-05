const {
  CreateProductSchema,
  UpdateProductSchema,
  ProductQuerySchema,
} = require("../models/product.model");

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async getAll(req, res, next) {
    try {
      const query = ProductQuerySchema.parse(req.query);
      const result = await this.productService.getAll(query);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const product = await this.productService.getById(req.params.id);

      res.json({
        success: true,
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const product = await this.productService.getBySlug(req.params.slug);
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      if (req.body.price !== undefined) req.body.price = Number(req.body.price);

      if (req.body.salePrice !== undefined && req.body.salePrice !== "") {
        req.body.salePrice = Number(req.body.salePrice);
      } else {
        req.body.salePrice = undefined;
      }

      if (req.body.stock !== undefined) req.body.stock = Number(req.body.stock);
      if (typeof req.body.isFeatured === "string") {
        req.body.isFeatured =
          req.body.isFeatured === "true" || req.body.isFeatured === "1";
      }
      if (typeof req.body.isActive === "string") {
        req.body.isActive =
          req.body.isActive === "true" || req.body.isActive === "1";
      }

      for (const key in req.body) {
        if (req.body[key] === "") req.body[key] = undefined;
      }

      if (!req.body.slug && req.body.name) {
        req.body.slug = req.body.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      const imagePaths =
        req.files?.map((file) => `/uploads/products/${file.filename}`) || [];

      req.body.images = imagePaths;

      const dto = CreateProductSchema.parse(req.body);

      const product = await this.productService.create(dto);

      res.status(201).json({
        success: true,
        message: "Tạo sản phẩm thành công",
        data: {
          ...product,
          mainImage: dto.images[0] || null,
        },
      });
    } catch (err) {
      console.log("LỖI 422 CREATE ZOD:", err.errors || err);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (req.body.price !== undefined) req.body.price = Number(req.body.price);

      if (req.body.salePrice !== undefined && req.body.salePrice !== "") {
        req.body.salePrice = Number(req.body.salePrice);
      } else {
        req.body.salePrice = undefined;
      }

      if (req.body.stock !== undefined) req.body.stock = Number(req.body.stock);

      if (typeof req.body.isFeatured === "string") {
        req.body.isFeatured =
          req.body.isFeatured === "true" || req.body.isFeatured === "1";
      }
      if (typeof req.body.isActive === "string") {
        req.body.isActive =
          req.body.isActive === "true" || req.body.isActive === "1";
      }

      for (const key in req.body) {
        if (req.body[key] === "") req.body[key] = undefined;
      }

      if (req.files && req.files.length > 0) {
        req.body.images = req.files.map(
          (file) => `/uploads/products/${file.filename}`
        );
      } else {
        delete req.body.images;
      }

      const dto = UpdateProductSchema.parse(req.body);

      const product = await this.productService.update(req.params.id, dto);

      res.json({
        success: true,
        data: product,
        message: "Cập nhật sản phẩm thành công",
      });
    } catch (err) {
      console.log("LỖI 422 UPDATE ZOD:", err.errors || err);
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.productService.delete(req.params.id);
      res.json({ success: true, message: "Xóa thành công" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
