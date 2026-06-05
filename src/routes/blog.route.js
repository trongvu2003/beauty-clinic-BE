const { Router } = require("express");

const createBlogRouter = (blogController) => {
  const router = Router();
  const upload = require("../middlewares/upload");

  router.get("/", (req, res, next) => blogController.getAll(req, res, next));
  router.get("/:id", (req, res, next) =>
    blogController.getById(req, res, next)
  );
  router.get("/:slug", (req, res, next) =>
    blogController.getBySlug(req, res, next)
  );

  router.post("/", upload.array("images", 10), (req, res, next) =>
    blogController.create(req, res, next)
  );
  router.put("/:id", upload.array("images", 10), (req, res, next) =>
    blogController.update(req, res, next)
  );
  router.delete("/:id", (req, res, next) =>
    blogController.delete(req, res, next)
  );

  return router;
};

module.exports = createBlogRouter;
