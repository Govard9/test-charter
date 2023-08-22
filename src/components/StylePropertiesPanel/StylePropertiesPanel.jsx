import React from 'react';

function StylePropertiesPanel({
	 index,
	font,
	fontSize,
	onFontChange,
	onFontSizeChange,
	textBlocks,
	setTextBlocks,
	isVisible,
	activeTextIndex,
    setTextDecorationStyle
}) {

	const handleItalicChange = () => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index] = { ...updatedTextBlocks[index] };
		updatedTextBlocks[index].isItalic = !updatedTextBlocks[index].isItalic;
		setTextBlocks(updatedTextBlocks);
	};

	const handleTextDecorationChange = (style) => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index] = { ...updatedTextBlocks[index] };

		if (style === 'none') {
			updatedTextBlocks[index].isDecoration = 'none';
		} else if (style === 'underline') {
			updatedTextBlocks[index].isDecoration = 'underline';
		} else if (style === 'strikethrough') {
			updatedTextBlocks[index].isDecoration = 'strikethrough';
		}

		setTextBlocks(updatedTextBlocks);
		setTextDecorationStyle(style);
	};

	const handleBoldChange = () => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index] = { ...updatedTextBlocks[index] };
		updatedTextBlocks[index].isBold = !updatedTextBlocks[index].isBold;
		setTextBlocks(updatedTextBlocks);
	};

	return (
		<div className={`properties ${isVisible && activeTextIndex === index ? 'properties_visible' : 'properties_hidden'}`}>
			<label className="properties__label properties__label_fonts" htmlFor="fontSelect">
				<span className="properties__span-text">Font:</span>
				<select
					id="fontSelect"
					value={font}
					onChange={onFontChange}
					className="properties__select"
				>
					<option value="Arial">Arial</option>
					<option value="Times New Roman">Times New Roman</option>
				</select>
			</label>
			<label className="properties__label properties__label_font-size" htmlFor="fontSizeSelect">
				<span className="properties__span-text">Font Size:</span>
				<input
					id="fontSizeSelect"
					type="number"
					value={fontSize}
					onChange={onFontSizeChange}
					className="properties__input properties__input_font-size"
				/>
			</label>
			<label className="properties__label properties__label_italic" htmlFor="italicCheckbox">
				<input
					id="italicCheckbox"
					type="checkbox"
					checked={textBlocks[index].isItalic}
					onChange={handleItalicChange}
				/>
				<span className="properties__span-text">Курсив</span>
			</label>
			<label className="properties__label properties__label_bold" htmlFor="boldCheckbox">
				<input
					id="boldCheckbox"
					type="checkbox"
					checked={textBlocks[index].isBold}
					onChange={handleBoldChange}
				/>
				<span className="properties__span-text">Полужирный</span>
			</label>
			<label className="properties__label properties__label_text-decoration" htmlFor="underlineRadio">
				<input
					type="radio"
					name="textDecoration"
					value="underline"
					checked={textBlocks[index].isDecoration === 'underline'}
					onChange={() => handleTextDecorationChange('underline')}
				/>
				<span className="properties__span-text">Подчеркнутый</span>
			</label>

			<label className="properties__label properties__label_text-decoration" htmlFor="strikethroughRadio">
				<input
					type="radio"
					name="textDecoration"
					value="strikethrough"
					checked={textBlocks[index].isDecoration === 'strikethrough'}
					onChange={() => handleTextDecorationChange('strikethrough')}
				/>
				<span className="properties__span-text">Зачеркнутый</span>
			</label>

			<label className="properties__label properties__label_text-decoration" htmlFor="noneRadio">
				<input
					type="radio"
					name="textDecoration"
					value="none"
					checked={textBlocks[index].isDecoration === 'none'}
					onChange={() => handleTextDecorationChange('none')}
				/>
				<span className="properties__span-text">Нет</span>
			</label>
		</div>
	);
}

export default StylePropertiesPanel;
