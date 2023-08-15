import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import charter from './image/charter.jpg';

import './App.css';

function App() {
    const [font, setFont] = useState('Arial');
    const [fontSize, setFontSize] = useState(14);
    const [showProperties, setShowProperties] = useState(false);
    const [textBlocks, setTextBlocks] = useState([]);
    const [editingTextIndex, setEditingTextIndex] = useState(null);
    const [signature, setSignature] = useState(null);
    const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });

    const certificateRef = useRef(null);

    const handleTextClick = (e) => {
        if (!editingTextIndex) {
            const x = e.clientX - certificateRef.current.getBoundingClientRect().left;
            const y = e.clientY - certificateRef.current.getBoundingClientRect().top;
            setTextBlocks([...textBlocks, { text: '', x, y, fontFamily: font, fontSize }]);
            setShowProperties(true);
            setEditingTextIndex(textBlocks.length);
        }
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
        setFontSize(parseInt(e.target.value));
        if (editingTextIndex !== null) {
            const updatedTextBlocks = [...textBlocks];
            updatedTextBlocks[editingTextIndex].fontSize = parseInt(e.target.value);
            setTextBlocks(updatedTextBlocks);
        }
    };

    const handleTextChange = (e, index) => {
        const updatedTextBlocks = [...textBlocks];
        updatedTextBlocks[index].text = e.target.value;
        setTextBlocks(updatedTextBlocks);
    };

    const handleInputKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            setEditingTextIndex(null);
            const updatedTextBlocks = [...textBlocks];
            updatedTextBlocks[index].text = e.target.value;
            setTextBlocks(updatedTextBlocks);
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
                alert('Пожалуйста, загрузите изображение в формате PNG.');
            }
        }
    };

    const handleSignatureDrag = (e, data) => {
        setSignaturePosition({ x: data.x, y: data.y });
    };

    const handleSavePDF = async () => {
        const scale = 3; // Увеличение разрешения вдвое
        const canvas = await html2canvas(certificateRef.current, { scale });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 300, '', 'FAST');
        pdf.save('certificate.pdf');
    };

    return (
        <div className="App">
            <div className="certificate" ref={certificateRef}>
                <img
                    src={charter}
                    alt="Certificate"
                    className="certificate__image"
                    onClick={handleTextClick}
                />
                {textBlocks.map((textBlock, index) => (
                    <Draggable bounds="parent" key={index}>
                        <div
                            className="certificate__text-field"
                            style={{
                                fontFamily: textBlock.fontFamily,
                                fontSize: textBlock.fontSize,
                                top: textBlock.y,
                                left: textBlock.x,
                            }}
                        >
                            {editingTextIndex === index ? (
                                <input
                                    type="text"
                                    value={textBlock.text}
                                    onChange={(e) => handleTextChange(e, index)}
                                    onKeyDown={(e) => handleInputKeyDown(e, index)}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        fontFamily: textBlock.fontFamily,
                                        fontSize: textBlock.fontSize,
                                    }}
                                    className="certificate__input"
                                />
                            ) : (
                                <div
                                    onDoubleClick={() => setEditingTextIndex(index)}
                                    style={{
                                        cursor: 'pointer',
                                        fontFamily: textBlock.fontFamily,
                                        fontSize: textBlock.fontSize,
                                    }}
                                >
                                    {textBlock.text}
                                </div>
                            )}
                        </div>
                    </Draggable>
                ))}
                {signature && (
                    <Draggable
                        bounds="parent"
                        position={signaturePosition}
                        onDrag={handleSignatureDrag}
                    >
                        <img
                            src={signature}
                            alt="Электронная подпись"
                            className="certificate__signature"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '100px',
                                height: 'auto',
                            }}
                        />
                    </Draggable>
                )}
            </div>
            {showProperties && (
                <div className="properties">
                    <label className="properties__label">
                        Font:
                        <select
                            value={font}
                            onChange={handleFontChange}
                            className="properties__select"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                        </select>
                    </label>
                    <label className="properties__label">
                        Font Size:
                        <input
                            type="number"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            className="properties__input"
                        />
                    </label>
                    <label className="properties__label">
                        Загрузка подписи (PNG):
                        <input
                            type="file"
                            accept="image/png"
                            onChange={handleSignatureUpload}
                            className="properties__input_signature properties__input_signature"
                        />
                    </label>
                    <button onClick={handleSavePDF} className="save-button">
                        Сохранить в PDF
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
