const slugify = require("slugify");
const IProductService = require("../interfaces/IProductService");

class ProductService extends IProductService {
  constructor(productRepo) {
    super();
    this.productRepo = productRepo;
  }

  async getAll(query) {
    return this.productRepo.findAll(query);
  }

  async getById(id) {
    const product = await this.productRepo.findById(id);
    if (!product) {
      const err = new Error(`Product not found: ${id}`);
      err.statusCode = 404;
      throw err;
    }
    return product;
  }

  async getBySlug(slug) {
    const product = await this.productRepo.findBySlug(slug);
    if (!product) {
      const err = new Error(`Product not found: ${slug}`);
      err.statusCode = 404;
      throw err;
    }
    return product;
  }

  async create(dto) {
    const slug = dto.slug ?? this._generateSlug(dto.name);
    const exists = await this.productRepo.existsBySlug(slug);
    if (exists) {
      const err = new Error(`Slug already exists: ${slug}`);
      err.statusCode = 409;
      throw err;
    }
    return this.productRepo.create({ ...dto, slug });
  }

  async update(id, dto) {
    await this.getById(id);

    if (dto.slug) {
      const exists = await this.productRepo.existsBySlug(dto.slug, id);
      if (exists) {
        const err = new Error(`Slug already exists: ${dto.slug}`);
        err.statusCode = 409;
        throw err;
      }
    }

    if (dto.name && !dto.slug) {
      dto.slug = this._generateSlug(dto.name);
    }

    return this.productRepo.update(id, dto);
  }

  async delete(id) {
    await this.getById(id);
    return this.productRepo.delete(id);
  }

  _generateSlug(name) {
    return slugify(name, { lower: true, strict: true, locale: "vi" });
  }
}

module.exports = ProductService;
