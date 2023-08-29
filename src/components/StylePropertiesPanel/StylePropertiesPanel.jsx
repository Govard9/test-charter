import React, {useState, useEffect} from 'react';

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
								  setTextDecorationStyle,
								  textBlockStyles,
								  setTextBlockStyles
							  }) {

	const handleItalicChange = () => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index] = { ...updatedTextBlocks[index] };
		updatedTextBlocks[index].isItalic = !updatedTextBlocks[index].isItalic;
		setTextBlocks(updatedTextBlocks);
	};

	const handleTextDecorationChange = (currentIndex, style) => {
		const updatedStyles = [...textBlockStyles];
		updatedStyles[currentIndex] = { ...updatedStyles[currentIndex] };
		if (style === 'none') {
			updatedStyles[currentIndex].isDecoration = 'none';
		} else if (style === 'underline') {
			updatedStyles[currentIndex].isDecoration = 'underline';
		} else if (style === 'strikethrough') {
			updatedStyles[currentIndex].isDecoration = 'strikethrough';
		}

		setTextBlockStyles(updatedStyles);
		setTextDecorationStyle(style);
	};

	const handleBoldChange = () => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index] = { ...updatedTextBlocks[index] };
		updatedTextBlocks[index].isBold = !updatedTextBlocks[index].isBold;
		setTextBlocks(updatedTextBlocks);
	};

	return (
		<div
			className={`properties ${
				isVisible && activeTextIndex === index
					? 'properties_visible'
					: 'properties_hidden'
			}`}
		>
			<button className="properties__button-move">Двигать панель</button>
			<label
				className="properties__label properties__label_fonts"
				htmlFor="fontSelect"
			>
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
			<label
				className="properties__label properties__label_font-size"
				htmlFor="fontSizeSelect"
			>
				<span className="properties__span-text">Font Size:</span>
				<input
					id="fontSizeSelect"
					type="number"
					min={1}
					value={fontSize}
					onChange={onFontSizeChange}
					className="properties__input properties__input_font-size"
				/>
			</label>
			<label
				className="properties__label properties__label_italic"
				htmlFor="italicCheckbox"
			>
				<input
					id="italicCheckbox"
					type="checkbox"
					checked={textBlocks[index].isItalic}
					onChange={handleItalicChange}
				/>
				<span className="properties__span-text">Курсив</span>
			</label>
			<label
				className="properties__label properties__label_bold"
				htmlFor="boldCheckbox"
			>
				<input
					id="boldCheckbox"
					type="checkbox"
					checked={textBlocks[index].isBold}
					onChange={handleBoldChange}
				/>
				<span className="properties__span-text">Полужирный</span>
			</label>
			<label
				className="properties__label properties__label_text-decoration"
				htmlFor="underlineRadio"
			>
				<input
					id="underlineRadio"
					type="radio"
					name={`textDecoration-${index}`}
					value="underline"
					checked={textBlockStyles[index].isDecoration === 'underline'}
					onChange={() => handleTextDecorationChange(index, 'underline')}
				/>
				<span className="properties__span-text">Подчеркнутый</span>
			</label>

			<label
				className="properties__label properties__label_text-decoration"
				htmlFor="strikethroughRadio"
			>
				<input
					id="strikethroughRadio"
					type="radio"
					name={`textDecoration-${index}`}
					value="strikethrough"
					checked={textBlockStyles[index].isDecoration === 'strikethrough'}
					onChange={() => handleTextDecorationChange(index, 'strikethrough')}
				/>
				<span className="properties__span-text">Зачеркнутый</span>
			</label>

			<label
				className="properties__label properties__label_text-decoration"
				htmlFor="noneRadio"
			>
				<input
					id="noneRadio"
					type="radio"
					name={`textDecoration-${index}`}
					value="none"
					checked={textBlockStyles[index].isDecoration === 'none'}
					onChange={() => handleTextDecorationChange(index, 'none')}
				/>
				<span className="properties__span-text">Нет</span>
			</label>
		</div>
	);
}

export default StylePropertiesPanel;
