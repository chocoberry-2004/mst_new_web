export const createEvent = async (eventData) => {

    try {

        const requestEvent = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        const eventResponse = await requestEvent.json();
        return { success: true, event: eventResponse };

    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, message: error.message };
    }
    
}