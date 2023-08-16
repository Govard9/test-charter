import React from 'react';
    import Draggable from 'react-draggable';

function TextBlock({
                       index,
                       textBlock,
                       editingTextIndex,
                       onTextChange,
                       onInputKeyDown,
                       setEditingTextIndex
                   }) {
    return (
        <Draggable bounds="parent">
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
                        onChange={(e) => onTextChange(e, index)}
                        onKeyDown={(e) => onInputKeyDown(e, index)}
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
    );
}

export default TextBlock;
