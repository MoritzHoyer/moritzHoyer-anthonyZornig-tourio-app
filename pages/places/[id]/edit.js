import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(updatedPlaceData) {
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlaceData),
      });

      if (response.ok) {
        // Handle successful update (e.g., redirect, show a success message)
        router.push(`/places/${id}`);
      } else {
        // Handle errors (e.g., display an error message)
        console.error(
          "Error updating place:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating place:", error);
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form
        onSubmit={editPlace}
        formName={"edit-place"}
        defaultData={place.place}
      />
    </>
  );
}

// import { useRouter } from "next/router";
// import Link from "next/link";
// import useSWR from "swr";
// import Form from "../../../components/Form.js";
// import { StyledLink } from "../../../components/StyledLink.js";

// export default function EditPage() {
//   const router = useRouter();
//   const { isReady } = router;
//   const { id } = router.query;
//   const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

//   // Function to handle editing the place
//   async function editPlace(updatedPlace) {
//     // Filter out fields that are not changed (empty strings)
//     const filteredPlace = Object.fromEntries(
//       Object.entries(updatedPlace).filter(([key, value]) => value !== "")
//     );

//     try {
//       const response = await fetch(`/api/places/${id}`, {
//         method: "PATCH", // Use PATCH for partial updates
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(filteredPlace), // Send only non-empty fields
//       });

//       if (response.ok) {
//         console.log("Place successfully updated!");
//         router.push(`/places/${id}`); // Redirect to the place details page
//       } else {
//         console.error("Failed to update place");
//       }
//     } catch (error) {
//       console.error("Error editing place:", error);
//     }
//   }

//   if (!isReady || isLoading || error) return <h2>Loading...</h2>;

//   return (
//     <>
//       <h2 id="edit-place">Edit Place</h2>
//       <Link href={`/places/${id}`} passHref legacyBehavior>
//         <StyledLink justifySelf="start">back</StyledLink>
//       </Link>
//       {/* Pass the current place data as defaultData and the editPlace function */}
//       <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
//     </>
//   );
// }
