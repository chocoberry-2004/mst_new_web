export const updatePartner = async (partnerId, partnerData) => {
  try {
    const formData = new FormData();

    formData.append("name", partnerData.name);
    formData.append("url", partnerData.url);
    formData.append("tier", partnerData.tier);
    formData.append("description", partnerData.description);
    formData.append("featured", partnerData.featured);

    // categories array
    if (partnerData.categories && partnerData.categories.length) {
      partnerData.categories.forEach((cat) => {
        formData.append("categories[]", cat);
      });
    }

    // logo file (if new file is uploaded)
    if (partnerData.logo && typeof partnerData.logo !== 'string') {
      formData.append("logo", partnerData.logo);
    }

    const requestPartner = await fetch(
      `${import.meta.env.VITE_API_URL}/partners/${partnerId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const partnerResponse = await requestPartner.json();

    return { success: true, partner: partnerResponse };

  } catch (error) {
    console.error("Error updating partner:", error);
    return { success: false, message: error.message };
  }
};