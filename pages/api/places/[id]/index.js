import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json({ place: place });
  }
  //Handle PATCH request to update a place
  if (request.method === "PATCH") {
    const { id } = request.query; // Retrieve id from the query

    try {
      const updatedPlace = await Place.findByIdAndUpdate(
        id,
        { $set: request.body },
        { new: true, runValidators: false } // Return the updated document and validate fields
      );

      if (!updatedPlace) {
        return response.status(404).json({ status: "Place not found" });
      }
      console.log("response", response.status(200).json(updatedPlace));

      return response.status(200).json(updatedPlace); // Respond with the updated place
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Failed to update place", error: error.message });
    }
  }
  if (request.method === "DELETE") {
    const { id } = request.query;

    try {
      const deteledPlace = await Place.findByIdAndDelete(id);
      if (!deteledPlace) {
        return response.status(404).json({ status: "Place not found" });
      }
      return response
        .status(200)
        .json({ message: "Place successfully deleted" });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Failed to delete Place", error: error.message });
    }
  }
  // If the request method is not supported
  return response.status(405).json({ message: "Method not allowed" });
}

// import { db_places } from "../../../../lib/db_places";
// import { db_comments } from "../../../../lib/db_comments";

// export default function handler(request, response) {
//   const { id } = request.query;

//   if (!id) {
//     return;
//   }

//   const place = db_places.find((place) => place._id.$oid === id);
//   const comment = place?.comments;
//   const allCommentIds = comment?.map((comment) => comment.$oid) || [];
//   const comments = db_comments.filter((comment) =>
//     allCommentIds.includes(comment._id.$oid)
//   );

//   if (!place) {
//     return response.status(404).json({ status: "Not found" });
//   }

//   response.status(200).json({ place: place, comments: comments });
// }

// import dbConnect from "../../../../db/connect";
// import Place from "../../../../db/models/Places";

// export default async function handler(request, response) {
//   await dbConnect();
//   const { id } = request.query;

//   if (request.method === "GET") {
//     try {
//       const place = await Place.findById(id);

//       if (!place) {
//         return response.status(404).json({ status: "Not Found" });
//       }

//       return response.status(200).json(place);
//     } catch (error) {
//       return response.status(500).json({ message: "Failed to fetch place", error });
//     }
//   }

//   // Handle PATCH request to update a place
//   if (request.method === "PATCH") {
//     try {
//       const updatedPlace = await Place.findByIdAndUpdate(
//         id,
//         { $set: request.body }, // Only update fields that are provided
//         { new: true, runValidators: true } // Return the updated document and validate fields
//       );

//       if (!updatedPlace) {
//         return response.status(404).json({ status: "Place not found" });
//       }

//       return response.status(200).json(updatedPlace); // Respond with the updated place
//     } catch (error) {
//       return response.status(400).json({ message: "Failed to update place", error });
//     }
//   }

//   return response.status(405).json({ message: "Method not allowed" });
// }
