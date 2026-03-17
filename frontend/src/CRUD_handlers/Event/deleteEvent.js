export const deleteEvent = async (eventId) => {
  try {
    const requestEvent = await fetch(
      `${import.meta.env.VITE_API_URL}/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      }
    );

    const eventResponse = await requestEvent.json();

    return {
      success: true,
      event: eventResponse
    };

  } catch (error) {
    console.error("Error deleting event:", error);

    return {
      success: false,
      message: error.message
    };
  }
};