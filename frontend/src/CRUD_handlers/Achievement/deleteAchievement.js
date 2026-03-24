export const deleteAchievement = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/achievements/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Delete failed",
      };
    }

    return {
      success: true,
      achievement: data,
    };

  } catch (error) {
    console.error("Error deleting achievement:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};