const IProductRepository = require("../interfaces/IProductRepository");

class ProductRepository extends IProductRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findAll(query) {
    const {
      page = 1,
      limit = 12,
      categoryId,
      brandId,
      isFeatured,
      search,
    } = query;
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(brandId && { brandId }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { metaKeywords: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { category: true, brand: true },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true, brand: true },
    });
  }

  async findBySlug(slug) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: { category: true, brand: true },
    });
  }

  async create(dto) {
    return this.prisma.product.create({
      data: dto,
      include: { category: true, brand: true },
    });
  }

  async update(id, dto) {
    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: { category: true, brand: true },
    });
  }

  async delete(id) {
    await this.prisma.product.delete({ where: { id } });
  }

  async existsBySlug(slug, excludeId) {
    const product = await this.prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } }),
      },
      select: { id: true },
    });
    return !!product;
  }
}

module.exports = ProductRepository;
