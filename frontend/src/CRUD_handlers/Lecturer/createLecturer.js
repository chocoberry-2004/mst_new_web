// export const createLecturer = async (formData) => {
//     try {

//         const requestLecturer = await fetch(`${import.meta.env.VITE_API_URL}/lecturers`, {
//             method: 'POST',
//             body: formData,
//         });

//         if (!requestLecturer.ok) {
//             const text = await requestLecturer.text();
//             console.error('Server response (not JSON):', text);
//             throw new Error(`Server error: ${requestLecturer.status}`);
//         }

//         const lecturerResponse = await requestLecturer.json();
        
//         return { success: true, lecturer: lecturerResponse };

//     } catch (error) {
//         console.error('Error creating lecturer:', error);
//         return { 
//             success: false, 
//             message: error.message || 'Network error occurred' 
//         };
//     }
// };


export const createLecturer = async (formData) => {
    try {
        const requestLecturer = await fetch(`${import.meta.env.VITE_API_URL}/lecturers`, {
            method: 'POST',
            body: formData,
        });

        // Try to parse as JSON first
        const contentType = requestLecturer.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const lecturerResponse = await requestLecturer.json();
            
            if (!requestLecturer.ok) {
                return { 
                    success: false, 
                    message: lecturerResponse.message || `Server error: ${requestLecturer.status}`
                };
            }
            
            return { success: true, lecturer: lecturerResponse };
        } else {
            // Handle non-JSON response (like HTML error)
            const text = await requestLecturer.text();
            console.error('Server response (not JSON):', text);
            
            // Check if it's a Multer error
            if (text.includes('MulterError')) {
                return { 
                    success: false, 
                    message: 'Image upload error: Unexpected field. Make sure the image field is named "image".'
                };
            }
            
            return { 
                success: false, 
                message: `Server error: ${requestLecturer.status} - ${requestLecturer.statusText}`
            };
        }
    } catch (error) {
        console.error('Error creating lecturer:', error);
        return { 
            success: false, 
            message: error.message || 'Network error occurred' 
        };
    }
};