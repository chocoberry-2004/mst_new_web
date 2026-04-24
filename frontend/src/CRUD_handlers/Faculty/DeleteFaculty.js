export const deleteFaculty = async (Id) => {
  try {
    const Request = await fetch(
      `${import.meta.env.VITE_API_URL}/faculties/${Id}`,
      {
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      }
    );

    const Response = await Request.json();

    return {
      success: true,
      faculty: Response
    };

  } catch (error) {
    console.error("Error deleting faculty:", error);

    return {
      success: false,
      message: error.message
    };
  }
};