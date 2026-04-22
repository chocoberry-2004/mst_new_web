const BASE_URL = `${import.meta.env.VITE_API_URL}/faculties`;

// CREATE FACULTY
export const createFaculty = async (facultyData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(facultyData),
    });

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error creating faculty:", error);
    return { success: false, message: error.message };
  }
};



// GET ALL FACULTIES
export const getFaculties = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching faculties:", error);
    return { success: false, message: error.message };
  }
};






//DELETE FACULTY
export const deleteFaculty = async (facultyId) => {
  try {
    const res = await fetch(`${BASE_URL}/${facultyId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error deleting faculty:", error);
    return { success: false, message: error.message };
  }
};




//UPDATE FACULTY
export const updateFaculty = async (facultyId, facultyData) => {
  try {
    const res = await fetch(`${BASE_URL}/${facultyId}`, {
      method: "PUT", // or PATCH
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(facultyData),
    });

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error updating faculty:", error);
    return { success: false, message: error.message };
  }
};




