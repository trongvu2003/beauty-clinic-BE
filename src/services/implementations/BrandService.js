const IBrandService = require("../interfaces/IBrandService");

class BrandService extends IBrandService {
  constructor(repo) {
    super();
    this.repo = repo;
  }

  getAll() {
    return this.repo.getAll();
  }

  async getById(id) {
    const brand = await this.repo.getById(id);

    if (!brand) {
      throw new Error("Không tìm thấy thương hiệu (Brand not found)");
    }

    return brand;
  }

  create(data) {
    return this.repo.create(data);
  }

  update(id, data) {
    return this.repo.update(id, data);
  }

  delete(id) {
    return this.repo.delete(id);
  }
}

module.exports = BrandService;
