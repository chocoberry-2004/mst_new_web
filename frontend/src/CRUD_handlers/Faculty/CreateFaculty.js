export const createFaculty = async (facultyData) => {
  try {
    const Request = await fetch(
      `${import.meta.env.VITE_API_URL}/faculties`,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(facultyData)
      }
    );

    const response = await Request.json();

    if (!Request.ok) throw new Error(response.error || "Failed to create faculty");

    return {
      success: true,
      faculty: response
    };

  } catch (error) {
    console.error("Error creating faculty:", error);
    return {
      success: false,
      message: error.message
    };
  }
};