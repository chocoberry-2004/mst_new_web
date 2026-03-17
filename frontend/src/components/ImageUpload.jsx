import React, { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Images
      </label>

      <div className="relative bg-gray-200 h-52 w-full rounded-xl border border-gray-300 flex items-center justify-center overflow-hidden">

        {/* Image Preview */}
        {image ? (
          <img
            src={image}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-5xl text-gray-400">
            <i className="fa-solid fa-image"></i>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        {/* Edit Button */}
        {image && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
            Change
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;