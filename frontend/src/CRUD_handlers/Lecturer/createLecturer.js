export const createLecturer = async (formData) => {
    try {

        const requestLecturer = await fetch(`${import.meta.env.VITE_API_URL}/lecturers`, {
            method: 'POST',
            body: formData,
        });

        if (!requestLecturer.ok) {
            const text = await requestLecturer.text();
            console.error('Server response (not JSON):', text);
            throw new Error(`Server error: ${requestLecturer.status}`);
        }

        const lecturerResponse = await requestLecturer.json();
        
        return { success: true, lecturer: lecturerResponse };

    } catch (error) {
        console.error('Error creating lecturer:', error);
        return { 
            success: false, 
            message: error.message || 'Network error occurred' 
        };
    }
};