import { promises as fs } from "fs";
import path from "path";

export async function getCities() {
  const cityPath = path.join(process.cwd(), "cities.json");
  const data = await fs.readFile(cityPath, "utf-8");

  return JSON.parse(data);
}
