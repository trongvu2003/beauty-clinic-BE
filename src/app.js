require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const config = require("./config");
const errorHandler = require("./middlewares/errorHandler");
const prisma = require("../prisma/prismaClient");

//Repositories
// Đổi DB: chỉ cần đổi import ở đây, không đụng service/controller
const ProductRepository = require("./repositories/postgres/ProductRepository");
const BlogRepository = require("./repositories/postgres/BlogRepository");
const CategoryRepository = require("./repositories/postgres/CategoryRepository");
const BrandRepository = require("./repositories/postgres/BrandRepository");

const uploadBrand = require("./middlewares/uploadBrand");

// Services
const ProductService = require("./services/implementations/ProductService");
const BlogService = require("./services/implementations/BlogService");
const CategoryService = require("./services/implementations/CategoryService");
const BrandService = require("./services/implementations/BrandService");

// Controllers
const ProductController = require("./controllers/product.controller");
const BlogController = require("./controllers/blog.controller");
const CategoryController = require("./controllers/category.controller");
const BrandController = require("./controllers/brand.controller");

// Routes
const createProductRouter = require("./routes/product.route");
const createBlogRouter = require("./routes/blog.route");
const createCategoryRouter = require("./routes/category.route");
const createBrandRouter = require("./routes/brand.route");

// Wire up DI
const productRepo = new ProductRepository(prisma);
const blogRepo = new BlogRepository(prisma);
const categoryRepo = new CategoryRepository(prisma);
const brandRepo = new BrandRepository(prisma);

const productService = new ProductService(productRepo);
const blogService = new BlogService(blogRepo);
const brandService = new BrandService(brandRepo);

const productCtrl = new ProductController(productService);
const blogCtrl = new BlogController(blogService);
const brandCtrl = new BrandController(brandService);

const categoryService = new CategoryService(categoryRepo);
const categoryCtrl = new CategoryController(categoryService);

// App
const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors({ origin: config.allowedOrigins }));
app.use(compression());
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use("/uploads", express.static("uploads"));

//API Routes
const API = "/api";

app.get(`${API}/health`, (_req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);
const newsRoute = require("./routes/news.route");
app.use(`${API}/news`, newsRoute);
app.use(`${API}/products`, createProductRouter(productCtrl));
app.use(`${API}/blogs`, createBlogRouter(blogCtrl));
app.use(`${API}/categories`, createCategoryRouter(categoryCtrl));
app.use(`${API}/brands`, createBrandRouter(brandCtrl));
app.use(errorHandler);
module.exports = app;
