import React from 'react';

function PropertiesPanel({
                             font,
                             fontSize,
                             onFontChange,
                             onFontSizeChange,
                             onSignatureUpload,
                             onSavePDF,
                         }) {
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
            <button onClick={onSavePDF} className="save-button">
                Сохранить в PDF
            </button>
        </div>
    );
}

export default PropertiesPanel;
