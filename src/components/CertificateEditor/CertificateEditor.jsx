import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import charter from '../../image/charter.jpg';
import TextBlock from "../TextBlock/TextBlock";
import Signature from "../Signature/Signature";
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";

function CertificateEditor() {
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
        <section className="certificate" ref={certificateRef}>
            <img
                src={charter}
                alt="Certificate"
                className="certificate__image"
                onClick={handleTextClick}
            />
            {textBlocks.map((textBlock, index) => (
                <TextBlock
                    index={index}
                    textBlock={textBlock}
                    editingTextIndex={editingTextIndex}
                    onTextChange={(e) => handleTextChange(e, index)}
                    onInputKeyDown={(e) => handleInputKeyDown(e, index)}
                />
            ))}
            {signature && (
                <Signature
                    signature={signature}
                    position={signaturePosition}
                    onDrag={handleSignatureDrag}
                />
            )}
            {showProperties && (
                <PropertiesPanel
                    font={font}
                    fontSize={fontSize}
                    onFontChange={handleFontChange}
                    onFontSizeChange={handleFontSizeChange}
                    onSignatureUpload={handleSignatureUpload}
                    onSavePDF={handleSavePDF}
                />
            )}
        </section>
    );
}

export default CertificateEditor;
