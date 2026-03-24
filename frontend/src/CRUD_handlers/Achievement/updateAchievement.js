export const updateAchievement = async (Id, formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/achievements/${Id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text); // try parsing JSON
    } catch (err) {
      console.error("Not JSON response:", text); 
      throw new Error("Server returned invalid response");
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Update failed",
      };
    }

    return {
      success: true,
      achievement: data,
    };

  } catch (error) {
    console.error("Error updating event:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};