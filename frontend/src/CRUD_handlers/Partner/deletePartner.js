export const deletePartner = async (partnerId) => {
  try {
    const requestPartner = await fetch(
      `${import.meta.env.VITE_API_URL}/partners/${partnerId}`,
      {
        method: "DELETE",
      }
    );

    const partnerResponse = await requestPartner.json();

    return { success: true, message: partnerResponse.message };

  } catch (error) {
    console.error("Error deleting partner:", error);
    return { success: false, message: error.message };
  }
};