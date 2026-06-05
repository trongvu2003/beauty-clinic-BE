class IBlogRepository {
  async findAll(_query) {
    throw new Error("Not implemented");
  }
  async findById(_id) {
    throw new Error("Not implemented");
  }
  async findBySlug(_slug) {
    throw new Error("Not implemented");
  }
  async create(_dto) {
    throw new Error("Not implemented");
  }
  async update(_id, _dto) {
    throw new Error("Not implemented");
  }
  async delete(_id) {
    throw new Error("Not implemented");
  }
  async existsBySlug(_slug, _excludeId) {
    throw new Error("Not implemented");
  }
}

module.exports = IBlogRepository;
