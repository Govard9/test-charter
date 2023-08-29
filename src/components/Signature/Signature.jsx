import React from 'react';
import Draggable from 'react-draggable';

function Signature({ signature, position, onDrag }) {
	return (
		<Draggable bounds="parent" position={position} onDrag={onDrag}>
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
	);
}

export default Signature;
