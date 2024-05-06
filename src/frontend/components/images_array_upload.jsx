import React, { useState, useCallback } from 'react';

export default function ImagesArrayUpload({ value, onChange }) {
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false); // State for managing drag over status

  const updateImages = (newImages) => {
    setImages(newImages);
    onChange(newImages); // This updates the form state.
  };

  const processFiles = (files) => {
    const newImages = [...images];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        updateImages(newImages);
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (indexToDelete) => {
    const newImages = images.filter((_, index) => index !== indexToDelete);
    updateImages(newImages);
  };
  

  const uploadImage = (event) => {
    processFiles(event.target.files);
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation(); // Stop the event from bubbling
    setDragOver(false);
    processFiles(event.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!dragOver) setDragOver(true);
  }, [dragOver]);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  // Using onMouseLeave to handle leaving the drag area more reliably
  const handleMouseLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  return (
    <div 
      className={`flex flex-col items-start overflow-y-auto border rounded-md border-zync-100 ${dragOver ? 'bg-blue-100' : 'bg-white'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', transition: 'background-color 0.2s' }}
    >
      {dragOver && (
        <div className="absolute inset-0 flex justify-center items-center text-xl text-gray-800 pointer-events-none">
          Drop files here
        </div>
      )}
      <div className="flex flex-nowrap items-center p-5 overflow-x-auto relative">
        {images.map((image, index) => (
          <div key={index} className="relative mx-2 flex-shrink-0">
            <img src={image} alt={`Uploaded ${index}`} className="w-24 h-24 object-cover rounded-md" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded-full 
                        h-6 w-6 flex justify-center items-center transform translate-x-1/2 -translate-y-1/2"
              onClick={() => deleteImage(index)}
            >
              &#x2715;
            </button>
          </div>
        ))}
        <label className="w-24 h-24 flex justify-center items-center mx-2 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 cursor-pointer rounded-md flex-shrink-0">
          <input type="file" onChange={uploadImage} className="hidden" multiple accept=".jpg" />
          <span className="text-gray-800">+ Upload Images</span>
        </label>
      </div>
    </div>
  );
}