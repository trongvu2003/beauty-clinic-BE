const slugify = require("slugify");
const ICategoryService = require("../interfaces/ICategoryService");

class CategoryService extends ICategoryService {
  constructor(categoryRepo) {
    super();
    this.categoryRepo = categoryRepo;
  }

  async getAll() {
    return this.categoryRepo.findAll();
  }

  async getById(id) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new Error("Category not found");
    return category;
  }
  async create(dto) {
    const slug = dto.slug ?? slugify(dto.name, { lower: true });

    const exists = await this.categoryRepo.findBySlug(slug);
    if (exists) throw new Error("Slug already exists");

    return this.categoryRepo.create({ ...dto, slug });
  }

  async update(id, dto) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new Error("Category not found");

    if (dto.name && !dto.slug) {
      dto.slug = slugify(dto.name, { lower: true });
    }

    return this.categoryRepo.update(id, dto);
  }

  async delete(id) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new Error("Category not found");

    return this.categoryRepo.delete(id);
  }
}

module.exports = CategoryService;
