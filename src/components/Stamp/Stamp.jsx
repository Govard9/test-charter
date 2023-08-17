import React from 'react';
import Draggable from 'react-draggable';

function Stamp({ stampImage, position, onDrag }) {
    return (
        <Draggable bounds="parent" position={position} onDrag={onDrag}>
            <img
                src={stampImage}
                alt="Печать"
                className="certificate__stamp"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    height: '100px',
                }}
            />
        </Draggable>
    );
}

export default Stamp;
