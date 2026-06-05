require("dotenv").config();
const app = require("./app");
const prisma = require("../prisma/prismaClient");
const config = require("./config");

async function main() {
  try {
    await prisma.$connect();
    console.log(" Database connected");

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
