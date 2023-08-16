import React, { useState } from 'react';

function CertificateUploader({ onUpload }) {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setUploadedImage(event.target.result);
                    onUpload(event.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                setUploadedImage(null);
                alert('Пожалуйста, загрузите изображение в формате JPEG или PNG.');
            }
        }
    };

    return (
        <div className="certificate-uploader">
            <label htmlFor="imageUpload">Загрузите свою грамоту:</label>
            <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                id="imageUpload"
            />
            {uploadedImage && <img src={uploadedImage} alt="Uploaded Certificate" />}
        </div>
    );
}

export default CertificateUploader;
