const IBlogRepository = require("../interfaces/IBlogRepository");

class BlogRepository extends IBlogRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findAll(query) {
    const { page = 1, limit = 10, isPublished, search } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(isPublished !== undefined && { isPublished }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: "desc" },
      }),
      this.prisma.blog.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id) {
    return this.prisma.blog.findUnique({ where: { id } });
  }

  async findBySlug(slug) {
    return this.prisma.blog.findUnique({ where: { slug } });
  }

  async create(dto) {
    return this.prisma.blog.create({ data: dto });
  }

  async update(id, dto) {
    return this.prisma.blog.update({ where: { id }, data: dto });
  }

  async delete(id) {
    await this.prisma.blog.delete({ where: { id } });
  }

  async existsBySlug(slug, excludeId) {
    const blog = await this.prisma.blog.findFirst({
      where: { slug, ...(excludeId && { id: { not: excludeId } }) },
      select: { id: true },
    });
    return !!blog;
  }
}

module.exports = BlogRepository;
