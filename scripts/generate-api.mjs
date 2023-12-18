// scripts/generate-api.mjs
import { resolve } from "./docs/swagger.json";
import { generateApi } from "swagger-typescript-api";
import fs from "fs";

const swaggerJsonPath = resolve(process.cwd(), "./docs/swagger.json");

// Проверяем существование файла swagger.json
if (fs.existsSync(swaggerJsonPath)) {
  // Загрузка содержимого файла swagger.json
  const swaggerJson = fs.readFileSync(swaggerJsonPath, "utf8");

  // Генерация API
  generateApi({
    name: "Api.ts",
    output: resolve(process.cwd(), "./src/api"),
    input: JSON.parse(swaggerJson),
    httpClientType: "axios",
  });
} else {
  console.error("File swagger.json not found. Please make sure it exists.");
}
