import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import charter from '../../images/charter.jpg';
import TextBlock from '../TextBlock/TextBlock';
import Signature from '../Signature/Signature';
import Stamp from '../Stamp/Stamp';
import LateralPropertiesPanel from '../LateralPropertiesPanel/LateralPropertiesPanel';

function CertificateEditor() {
	const [font, setFont] = useState('Arial');
	const [fontSize, setFontSize] = useState(14);
	const [showProperties, setShowProperties] = useState(false);
	const [textBlocks, setTextBlocks] = useState([]);
	const [editingTextIndex, setEditingTextIndex] = useState(null);
	const [signature, setSignature] = useState(null);
	const [signaturePosition, setSignaturePosition] = useState({x: 0, y: 0});
	const [uploadedCertificate, setUploadedCertificate] = useState(null);
	const [showTable, setShowTable] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [stamp, setStamp] = useState(null);
	const [stampPosition, setStampPosition] = useState({x: 0, y: 0});
	const [textPosition, setTextPosition] = useState({x: 0, y: 0});
	const [activeTextIndex, setActiveTextIndex] = useState(null);
	const [textDecorationStyle, setTextDecorationStyle] = useState('none');
	const [pdfData, setPdfData] = useState(null);
	const [textBlockStyles, setTextBlockStyles] = useState([]);

	const certificateRef = useRef(null);

	const handleTextClick = (e) => {
		setFontSize(14)
		setFont('Arial')

		if (!editingTextIndex) {
			setTextBlocks([
				...textBlocks,
				{
					text: '',
					x: '',
					y: '',
					fontFamily: 'Arial',
					fontSize: 14
				},
			]);
			setTextBlockStyles([...textBlockStyles, {
				isItalic: false,
				isDecoration: 'none',
				isBold: false,
			}]);
			setEditingTextIndex(textBlocks.length);
			setActiveTextIndex(textBlocks.length);
			setShowProperties(true);
		}
	};

	const handleTextChange = (e, index) => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index].text = e.target.value;
		setTextBlocks(updatedTextBlocks);
	};

	const handleFontChange = (e) => {
		setFont(e.target.value);
		if (editingTextIndex !== null) {
			const updatedTextBlocks = [...textBlocks];
			updatedTextBlocks[editingTextIndex].fontFamily = e.target.value;
			setTextBlocks(updatedTextBlocks);
		}
	};

	const handleFontSizeChange = (e) => {
		const updatedTextBlocks = [...textBlocks];

		if (parseInt(e.target.value, 10) > 50) {
			setFontSize(50)
			updatedTextBlocks[editingTextIndex].fontSize = 50;
		} else if (parseInt(e.target.value, 10) < 0) {
			setFontSize(1)
			updatedTextBlocks[editingTextIndex].fontSize = 1;
		} else {
			setFontSize(parseInt(e.target.value, 10));

			if (editingTextIndex !== null) {
				updatedTextBlocks[editingTextIndex].fontSize = parseInt(e.target.value, 10);

				setTextBlocks(updatedTextBlocks);
			}
		}
	};

	const handleInputKeyDown = (e, index) => {
		if (e.key === 'Enter') {
			setEditingTextIndex(null);
			const updatedTextBlocks = [...textBlocks];
			updatedTextBlocks[index].text = e.target.value;
			updatedTextBlocks[index].x = textPosition.x;
			updatedTextBlocks[index].y = textPosition.y;
			setTextBlocks(updatedTextBlocks);
			setShowProperties(false);
			setActiveTextIndex(null);
		}
	};

	const handleSignatureUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.type === 'image/png') {
				const reader = new FileReader();
				reader.onload = (event) => {
					setSignature(event.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				setSignature(null);
				// alert('Пожалуйста, загрузите изображение в формате PNG.');
			}
		}
	};

	const handleStampUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.type === 'image/png') {
				const reader = new FileReader();
				reader.onload = (event) => {
					setStamp(event.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				setStamp(null);
				// alert('Пожалуйста, загрузите изображение в формате PNG.');
			}
		}
	};

	const handleSignatureDrag = (e, data) => {
		setSignaturePosition({x: data.x, y: data.y});
	};

	const handleStampDrag = (e, data) => {
		setStampPosition({x: data.x, y: data.y});
	};

	const handleCreateJson = () => {
		// Создание JSON объекта
		const jsonToSave = {
			text_field: textBlocks.map(block => ({
				text: block.text,
				x: block.x,
				y: block.y,
				fontFamily: block.fontFamily,
				fontSize: block.fontSize,
				italic: block.isItalic,
				textDecoration: block.isDecoration,
				fontWeight: block.isBold
			})),
			background: {
				width: 600,
				height: 850
			}, // Подставьте URL фона
			Stamp: {
				url: stamp,
				x: stampPosition.x,
				y: stampPosition.y
			},
			Signature: {
				url: signature,
				x: signaturePosition.x,
				y: signaturePosition.y
			} // Подставьте URL печати
		};
		// console.log(jsonToSave)
		setPdfData(jsonToSave);
	}

	const handleSavePDF = async () => {
		handleCreateJson()
		const scale = 3; // Увеличение разрешения в 3 раза
		const canvas = await html2canvas(certificateRef.current, {scale});
		const imgData = canvas.toDataURL('image/png');
		const pdf = new JsPDF();
		pdf.addImage(imgData, 'PNG', 0, 0, 210, 300, '', 'FAST');
		pdf.save('certificate.pdf');
	};

	const handleCertificateUpload = (uploadedImage) => {
		const img = new Image();
		img.src = uploadedImage;
		img.onload = () => {
			if (img.width === 600 && img.height === 850) {
				setUploadedCertificate(uploadedImage);
			} else {
				// alert(
				// 	'Загруженная грамота должна быть размером 600x850 пикселей. Загрузка отменена.'
				// );
			}
		};
	};

	return (
		<section className="certificate" ref={certificateRef}>
			{uploadedCertificate ? (
				<img
					src={uploadedCertificate}
					alt="Uploaded Certificate"
					className="certificate__image"
					onClick={handleTextClick}
				/>
			) : (
				<img
					src={charter}
					alt="Certificate"
					className="certificate__image"
					onClick={handleTextClick}
				/>
			)}
			{textBlocks.map((textBlock, index) => (
				<TextBlock
					key={index}
					index={index}
					textBlock={textBlock}
					setEditingTextIndex={setEditingTextIndex}
					editingTextIndex={editingTextIndex}
					onTextChange={(e) => handleTextChange(e, index)}
					onInputKeyDown={(e) => handleInputKeyDown(e, index)}
					font={font}
					setFont={setFont}
					fontSize={fontSize}
					setFontSize={setFontSize}
					onFontChange={handleFontChange}
					onFontSizeChange={handleFontSizeChange}
					textBlocks={textBlocks}
					setTextBlocks={setTextBlocks}
					certificateRef={certificateRef}
					isVisible={showProperties}
					setActiveTextIndex={setActiveTextIndex}
					activeTextIndex={activeTextIndex}
					setShowProperties={setShowProperties}
					setTextDecorationStyle={setTextDecorationStyle}
					textDecorationStyle={textBlockStyles[index].isDecoration}
					setTextPosition={setTextPosition}
					onTextClick={handleTextClick}
					textBlockStyles={textBlockStyles}
					setTextBlockStyles={setTextBlockStyles}
				/>
			))}

			<div className="properties__container">
				<LateralPropertiesPanel
					onSignatureUpload={handleSignatureUpload}
					onSavePDF={handleSavePDF}
					onCertificateUpload={handleCertificateUpload}
					showTable={showTable}
					setShowTable={setShowTable}
					tableData={tableData} // Передаем данные таблицы
					setTableData={setTableData} // Передаем функцию для обновления данных таблицы
					textBlocks={textBlocks}
					setTextBlocks={setTextBlocks}
					certificateRef={certificateRef}
					onStampUpload={handleStampUpload}
					activeTextIndex={activeTextIndex}
					setActiveTextIndex={setActiveTextIndex}
					onCreateJson={handleCreateJson}
				/>
			</div>

			{signature && (
				<Signature
					signature={signature}
					position={signaturePosition}
					onDrag={handleSignatureDrag}
				/>
			)}
			{stamp && (
				<Stamp
					stampImage={stamp}
					position={stampPosition}
					onDrag={handleStampDrag}
				/>
			)}
		</section>
	);
}

export default CertificateEditor;
