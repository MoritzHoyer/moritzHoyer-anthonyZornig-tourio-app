import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find();
      return response.status(200).json(places);
    } catch (error) {
      return response.status(500).json({ message: "Failed to fetch places" });
    }
  }

  if (request.method === "POST") {
    try {
      const newPlace = await Place.create(request.body); // Use Mongoose's create method
      return response.status(201).json(newPlace); // Respond with the newly created place
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Failed to add place", error });
    }
  }

  // If the request method is not allowed
  return response.status(405).json({ message: "Method not allowed" });
}
