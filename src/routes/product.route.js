const { Router } = require("express");
const uploadProduct = require("../middlewares/uploadProduct");
const createProductRouter = (productController) => {
  const router = Router();

  router.get("/", (req, res, next) => productController.getAll(req, res, next));
  router.get("/:id", (req, res, next) =>
    productController.getById(req, res, next)
  );

  router.get("/:slug", (req, res, next) =>
    productController.getBySlug(req, res, next)
  );

  router.post("/", uploadProduct.array("images", 10), (req, res, next) =>
    productController.create(req, res, next)
  );

  router.put("/:id", uploadProduct.array("images", 10), (req, res, next) =>
    productController.update(req, res, next)
  );

  router.delete("/:id", (req, res, next) =>
    productController.delete(req, res, next)
  );

  return router;
};

module.exports = createProductRouter;
