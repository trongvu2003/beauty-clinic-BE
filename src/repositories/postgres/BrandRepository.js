const IBrandRepository = require("../interfaces/IBrandRepository");

class BrandRepository extends IBrandRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  getAll() {
    return this.prisma.brand.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
  getById(id) {
    return this.prisma.brand.findUnique({
      where: { id },
    });
  }

  create(data) {
    return this.prisma.brand.create({ data });
  }

  update(id, data) {
    return this.prisma.brand.update({
      where: { id },
      data,
    });
  }

  delete(id) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}

module.exports = BrandRepository;
