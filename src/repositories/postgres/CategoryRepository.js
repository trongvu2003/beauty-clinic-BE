class CategoryRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  findById(id) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findBySlug(slug) {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  create(data) {
    return this.prisma.category.create({ data });
  }

  update(id, data) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  delete(id) {
    return this.prisma.category.delete({ where: { id } });
  }
}

module.exports = CategoryRepository;
