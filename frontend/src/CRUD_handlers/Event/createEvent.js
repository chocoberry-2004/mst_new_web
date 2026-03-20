export const createEvent = async (eventData) => {
    try {
        const formData = new FormData();

        // Append all text fields
        formData.append("title", eventData.title);
        formData.append("type", eventData.type);
        formData.append("date", eventData.date);
        formData.append("time", eventData.time);
        formData.append("venue", eventData.venue);
        formData.append("description", eventData.description);
        formData.append("status", eventData.status);
        formData.append("highlight", eventData.highlight.toString());

        if (eventData.imageFiles && eventData.imageFiles.length > 0) {
            eventData.imageFiles.forEach(file => {
                formData.append("imageURL", file);
            });
            // console.log(`Appended ${eventData.imageFiles.length} images`);
        }

        // Debug log
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + (pair[0] === 'imageURL' ? 'File object' : pair[1]));
        // }

        const requestEvent = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
            method: 'POST',
            body: formData,
        });

        if (!requestEvent.ok) {
            const text = await requestEvent.text();
            console.error('Server response (not JSON):', text);
            throw new Error(`Server error: ${requestEvent.status}`);
        }

        const eventResponse = await requestEvent.json();
        
        return { success: true, event: eventResponse };

    } catch (error) {
        console.error('Error creating event:', error);
        return { 
            success: false, 
            message: error.message || 'Network error occurred' 
        };
    }
};