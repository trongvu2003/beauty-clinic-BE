const IProductRepository = require("../interfaces/IProductRepository");

class ProductRepository extends IProductRepository {
  constructor(mongooseModel) {
    super();
    this.model = mongooseModel;
  }

  async findAll(query) {
    throw new Error("MongoDB ProductRepository not implemented yet");
  }

  async findById(id) {
    throw new Error("MongoDB ProductRepository not implemented yet");
  }

  async findBySlug(slug) {
    throw new Error("MongoDB ProductRepository not implemented yet");
  }

  async create(dto) {
    throw new Error("MongoDB ProductRepository not implemented yet");
  }

  async update(id, dto) {
    throw new Error("MongoDB ProductRepository not implemented yet");
  }

  async delete(id) {
    throw new Error("MongoDB ProductRepository not implemented yet");
  }

  async existsBySlug(slug, excludeId) {
    throw new Error("MongoDB ProductRepository not implemented yet");
  }
}

module.exports = ProductRepository;
