const slugify = require("slugify"); // Thư viện tạo slug từ tiêu đề
const IBlogService = require("../interfaces/IBlogService");

class BlogService extends IBlogService {
  constructor(blogRepo) {
    super();
    this.blogRepo = blogRepo;
  }

  async getAll(query) {
    return this.blogRepo.findAll(query);
  }

  async getById(id) {
    const blog = await this.blogRepo.findById(id);
    if (!blog) {
      const err = new Error(`Blog not found: ${id}`);
      err.statusCode = 404;
      throw err;
    }
    return blog;
  }

  async getBySlug(slug) {
    const blog = await this.blogRepo.findBySlug(slug);
    if (!blog) {
      const err = new Error(`Blog not found: ${slug}`);
      err.statusCode = 404;
      throw err;
    }
    return blog;
  }

  async create(dto) {
    const slug = dto.slug ?? this._generateSlug(dto.title);
    const exists = await this.blogRepo.existsBySlug(slug);
    if (exists) {
      const err = new Error(`Slug already exists: ${slug}`);
      err.statusCode = 409;
      throw err;
    }
    return this.blogRepo.create({ ...dto, slug });
  }

  async update(id, dto) {
    await this.getById(id);
    if (dto.slug) {
      const exists = await this.blogRepo.existsBySlug(dto.slug, id);
      if (exists) {
        const err = new Error(`Slug already exists: ${dto.slug}`);
        err.statusCode = 409;
        throw err;
      }
    }
    if (dto.title && !dto.slug) {
      dto.slug = this._generateSlug(dto.title);
    }
    return this.blogRepo.update(id, dto);
  }

  async delete(id) {
    await this.getById(id);
    return this.blogRepo.delete(id);
  }

  _generateSlug(title) {
    return slugify(title, { lower: true, strict: true, locale: "vi" });
  }
}

module.exports = BlogService;
