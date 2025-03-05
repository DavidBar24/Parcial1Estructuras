import { useState } from "react";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const title = prompt("Ingrese un título para la imagen:") || "Sin título";
        setPhotos([...photos, { title, src: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="gallery-container">
      <input
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <input type="file" accept="image/*" onChange={handleFileUpload} className="upload-button" />
      <div className="photo-grid">
        {photos
          .filter((photo) => photo.title.toLowerCase().includes(search.toLowerCase()))
          .map((photo, index) => (
            <div key={index} className="photo-card">
              <img src={photo.src} alt={photo.title} className="photo" />
              <p>{photo.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotoGallery;