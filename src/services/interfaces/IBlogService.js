class IBlogService {
  async getAll(_query) {
    throw new Error("Not implemented");
  }
  async getById(_id) {
    throw new Error("Not implemented");
  }
  async getBySlug(_slug) {
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
}

module.exports = IBlogService;
