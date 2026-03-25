export const updateLecturer = async (Id, formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lecturers/${Id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    // Check content type
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Update failed",
        };
      }
      
      return {
        success: true,
        lecturer: data,
      };
    } else {
      // Handle non-JSON response
      const text = await response.text();
      console.error('Server response (not JSON):', text);
      
      if (text.includes('MulterError')) {
        return {
          success: false,
          message: 'Image upload error: Make sure the image field is named "image".'
        };
      }
      
      return {
        success: false,
        message: `Server error: ${response.status} - ${response.statusText}`
      };
    }
  } catch (error) {
    console.error("Error updating lecturer:", error);
    return {
      success: false,
      message: error.message || "Network error occurred",
    };
  }
};