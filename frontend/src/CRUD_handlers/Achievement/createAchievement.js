export const createAchievement = async (formData) => {
    try {
       
        const requestAchievement = await fetch(`${import.meta.env.VITE_API_URL}/achievements`, {
            method: 'POST',
            body: formData,
        });

        if (!requestAchievement.ok) {
            const text = await requestAchievement.text();
            console.error('Server response (not JSON):', text);
            throw new Error(`Server error: ${requestAchievement.status}`);
        }

        const achievementResponse = await requestAchievement.json();
        
        return { success: true, achievement: achievementResponse };

    } catch (error) {
        console.error('Error creating event:', error);
        return { 
            success: false, 
            message: error.message || 'Network error occurred' 
        };
    }
};