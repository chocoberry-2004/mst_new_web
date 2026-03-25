export const deleteLecturer = async (Id) => {
  try {
    const request = await fetch(
      `${import.meta.env.VITE_API_URL}/lecturers/${Id}`,
      {
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      }
    );

    const response = await request.json();

    return {
      success: true,
      lecturer: response
    };

  } catch (error) {
    console.error("Error deleting event:", error);

    return {
      success: false,
      message: error.message
    };
  }
};