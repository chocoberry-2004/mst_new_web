export const updateFaculty = async (id, facultyData) => {
  try {
    const request = await fetch(
      `${import.meta.env.VITE_API_URL}/faculties/${id}`,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(facultyData)
      }
    );

    const response = await request.json();

    if (!request.ok) {
      throw new Error(response.error || "Failed to update faculty");
    }

    return {
      success: true,
      faculty: response
    };

  } catch (error) {
    console.error("Error editing faculty:", error);
    return {
      success: false,
      message: error.message
    };
  }
};