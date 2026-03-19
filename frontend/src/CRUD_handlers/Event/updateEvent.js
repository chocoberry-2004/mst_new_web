

export const updateEvent = async (eventId, formData) => {
  try {
    const requestEvent = await fetch(
      `${import.meta.env.VITE_API_URL}/events/${eventId}`,
      {
        method: "PUT",
        body: formData, 
      }
    );

    const eventResponse = await requestEvent.json();

    return {
      success: true,
      event: eventResponse,
    };

  } catch (error) {
    console.error("Error updating event:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};