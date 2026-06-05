const { Router } = require("express");
const uploadBrand = require("../middlewares/uploadBrand");

const createBrandRouter = (controller) => {
  const router = Router();

  router.get("/", controller.getAll.bind(controller));
  router.get("/:id", controller.getById.bind(controller));

  router.post(
    "/",
    uploadBrand.single("image"),
    controller.create.bind(controller)
  );

  router.put(
    "/:id",
    uploadBrand.single("image"),
    controller.update.bind(controller)
  );

  router.delete("/:id", controller.delete.bind(controller));

  return router;
};

module.exports = createBrandRouter;
