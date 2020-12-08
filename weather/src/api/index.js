import { getCities } from "../helpers";

export async function getDataCities(req, res) {
  try {
    const cities = await getCities();
    console.log("hola");

    return console.log(res.status(200).json(cities));
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Non podo cargar as cidades" });
  }
}
