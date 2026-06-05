const { Router } = require("express");
const upload = require("../middlewares/uploadCategory");

const createCategoryRouter = (controller) => {
  const router = Router();
  router.get("/", controller.getAll.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  router.post("/", upload.single("image"), controller.create.bind(controller));
  router.put(
    "/:id",
    upload.single("image"),
    controller.update.bind(controller)
  );
  router.delete("/:id", controller.delete.bind(controller));
  return router;
};

module.exports = createCategoryRouter;
