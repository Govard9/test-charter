import React from 'react';
import FioTable from "../FioTable/FioTable";

function PropertiesPanel({
                             font,
                             fontSize,
                             onFontChange,
                             onFontSizeChange,
                             onSignatureUpload,
                             onSavePDF,
                             onCertificateUpload,
                             showTable,
                             tableData,
                             setTableData,
                             setShowTable,
                             textBlocks,
                             setTextBlocks,
                             certificateRef
                         }) {

    const handleCertificateUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    onCertificateUpload(event.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Пожалуйста, загрузите изображение в формате JPEG или PNG.');
            }
        }
    };

    return (
        <div className="properties">
            <label className="properties__label properties__label_fonts">
                <span className="properties__span-text">Font:</span>
                <select
                    value={font}
                    onChange={onFontChange}
                    className="properties__select"
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </label>
            <label className="properties__label properties__label_font-size">
                <span className="properties__span-text">Font Size:</span>
                <input
                    type="number"
                    value={fontSize}
                    onChange={onFontSizeChange}
                    className="properties__input properties__input_font-size"
                />
            </label>
            <label className="properties__label properties__label_signature">
                <span className="properties__span-text">Загрузка подписи (PNG):</span>
                <input
                    type="file"
                    accept="image/png"
                    onChange={onSignatureUpload}
                    className="properties__input_signature"
                />
            </label>
            <label className="properties__label properties__label_upload-certificate">
                <span className="properties__span-text properties__span-text_upload-certificate">Загрузка грамоты (JPEG/PNG: 600x850):</span>
                <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleCertificateUpload}
                    className="properties__input_certificate"
                />
            </label>
            {showTable && (
                <FioTable
                    tableData={tableData}
                    setTableData={setTableData}
                    setShowTable={setShowTable}
                    textBlocks={textBlocks}
                    setTextBlocks={setTextBlocks}
                    certificateRef={certificateRef}
                />
            )}
            <button onClick={onSavePDF} className="save-button">
                Сохранить в PDF
            </button>
        </div>
    );
}

export default PropertiesPanel;
