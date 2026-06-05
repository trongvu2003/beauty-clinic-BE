const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  const category = await prisma.category.upsert({
    where: { slug: "duong-da" },
    update: {},
    create: {
      name: "Dưỡng da",
      slug: "duong-da",
      description: "Các sản phẩm chăm sóc và dưỡng da",
      metaTitle: "Sản phẩm dưỡng da cao cấp",
      metaDesc: "Khám phá các sản phẩm dưỡng da chất lượng cao",
    },
  });

  const brand = await prisma.brand.upsert({
    where: { slug: "the-ordinary" },
    update: {},
    create: {
      name: "The Ordinary",
      slug: "the-ordinary",
      description: "Thương hiệu skincare khoa học từ Canada",
    },
  });

  await prisma.product.upsert({
    where: { slug: "niacinamide-10-zinc-1" },
    update: {},
    create: {
      name: "Niacinamide 10% + Zinc 1%",
      slug: "niacinamide-10-zinc-1",
      sku: "TO-NIA-10",
      description: "Serum thu nhỏ lỗ chân lông, kiểm soát dầu",
      price: 280000,
      stock: 100,
      isFeatured: true,
      ingredients: "Niacinamide 10%, Zinc PCA 1%, Aqua...",
      howToUse: "Thoa 2-3 giọt lên mặt sau khi rửa mặt, sáng và tối",
      metaTitle: "Niacinamide 10% + Zinc 1% - The Ordinary | Chính hãng",
      metaDesc: "Serum Niacinamide thu nhỏ lỗ chân lông, kiểm soát dầu nhờn.",
      metaKeywords: "niacinamide, the ordinary, serum, thu nho lo chan long",
      categoryId: category.id,
      brandId: brand.id,
    },
  });
  await prisma.blog.createMany({
    data: [
      {
        title: "Cách chăm sóc da dầu",
        slug: "cach-cham-soc-da-dau",
        excerpt: "Mẹo chăm sóc da dầu.",
        content: "Nội dung...",
        isPublished: true,
        publishedAt: new Date(),
        authorName: "Admin",
      },
      {
        title: "5 bước skincare buổi tối",
        slug: "5-buoc-skincare-buoi-toi",
        excerpt: "Routine skincare tối.",
        content: "Nội dung...",
        isPublished: true,
        publishedAt: new Date(),
        authorName: "Admin",
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
