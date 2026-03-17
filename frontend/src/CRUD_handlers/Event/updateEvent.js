export const updateEvent = async (eventId, eventData) => {
  try {
    const requestEvent = await fetch(
      `${import.meta.env.VITE_API_URL}/events/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(eventData),
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