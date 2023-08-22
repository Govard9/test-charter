import React from 'react';
import Draggable from 'react-draggable';
import StylePropertiesPanel from "../StylePropertiesPanel/StylePropertiesPanel";

function TextBlock({
                       index,
                       textBlock,
                       editingTextIndex,
                       onTextChange,
                       onInputKeyDown,
                       setEditingTextIndex,
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
                       certificateRef,
                       onStampUpload,
                       isVisible,
                       setActiveTextIndex,
                       activeTextIndex,
                       setShowProperties,
                       setTextDecorationStyle,
                       textDecorationStyle
                   }) {

    return (
        <Draggable bounds="parent">
            <div
                className="certificate__text-field"
                style={{
                    top: textBlock.y,
                    left: textBlock.x,
                }}
            >
                {editingTextIndex === index ? (
                    <input
                        type="text"
                        value={textBlock.text}
                        onChange={(e) => onTextChange(e, index)}
                        onKeyDown={(e) => onInputKeyDown(e, index)}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            fontFamily: textBlock.fontFamily,
                            fontSize: textBlock.fontSize,
                            fontStyle: textBlock.isItalic ? 'italic' : 'normal',
                            textDecoration: textDecorationStyle === 'underline' ? 'underline' :
                                textDecorationStyle === 'strikethrough' ? 'line-through' : 'none',
                            fontWeight: textBlock.isBold ? 'bold' : 'normal',
                        }}
                        className="certificate__input"
                    />
                ) : (
                    <div
                        onDoubleClick={() => {
                            setEditingTextIndex(index);
                            setShowProperties(true);
                            setActiveTextIndex(index);
                        }}
                        style={{
                            fontFamily: textBlock.fontFamily,
                            fontSize: textBlock.fontSize,
                            fontStyle: textBlock.isItalic ? 'italic' : 'normal',
                            textDecoration: textDecorationStyle === 'underline' ? 'underline' :
                                textDecorationStyle === 'strikethrough' ? 'line-through' : 'none',
                            fontWeight: textBlock.isBold ? 'bold' : 'normal',
                        }}
                    >
                        {textBlock.text}
                    </div>
                )}
                <StylePropertiesPanel
                    index={index}
                    font={font}
                    fontSize={fontSize}
                    onFontChange={onFontChange}
                    onFontSizeChange={onFontSizeChange}
                    onSignatureUpload={onSignatureUpload}
                    onSavePDF={onSavePDF}
                    onCertificateUpload={onCertificateUpload}
                    showTable={showTable}
                    setShowTable={setShowTable}
                    tableData={tableData} // Передаем данные таблицы
                    setTableData={setTableData} // Передаем функцию для обновления данных таблицы
                    textBlocks={textBlocks}
                    setTextBlocks={setTextBlocks}
                    certificateRef={certificateRef}
                    onStampUpload={onStampUpload}
                    isVisible={isVisible}
                    activeTextIndex={activeTextIndex}
                    setActiveTextIndex={setActiveTextIndex}
                    setTextDecorationStyle={setTextDecorationStyle}
                />
            </div>
        </Draggable>
    );
}

export default TextBlock;
