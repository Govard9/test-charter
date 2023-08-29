import React, { useState } from 'react';

function CertificateUploader({ onUpload }) {
	const [uploadedImage, setUploadedImage] = useState(null);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.type === 'images/jpeg' || file.type === 'images/png') {
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
			<label className="certificate-uploader__label" htmlFor="imageUpload">
				<span className="certificate-uploader__span">
					Загрузите свою грамоту:
				</span>
				<input
					id="imageUpload"
					type="file"
					accept="image/jpeg,image/png"
					onChange={handleImageUpload}
					className="certificate-uploader__input"
				/>
			</label>
			{uploadedImage && <img src={uploadedImage} alt="Uploaded Certificate" />}
		</div>
	);
}

export default CertificateUploader;
