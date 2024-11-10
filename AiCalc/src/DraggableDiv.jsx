import React, { useRef, useState } from 'react';
import './DraggableDiv.css';

const DraggableDiv = ({ analysisResult }) => {
  const wrapperRef = useRef(null);
  const isDragging = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // Handle mouse move events while dragging
  const onMouseMove = (event) => {
    if (!isDragging.current) return;

    const wrapper = wrapperRef.current;
    const movementX = event.movementX;
    const movementY = event.movementY;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const wrapperRect = wrapper.getBoundingClientRect();
    const newLeft = wrapper.offsetLeft + movementX;
    const newTop = wrapper.offsetTop + movementY;

    // Boundary checks
    const maxLeft = viewportWidth - wrapperRect.width;
    const maxTop = viewportHeight - wrapperRect.height;

    wrapper.style.left = `${Math.max(0, Math.min(newLeft, maxLeft))}px`;
    wrapper.style.top = `${Math.max(0, Math.min(newTop, maxTop))}px`;
  };

  // Start dragging
  const onMouseDown = () => {
    isDragging.current = true;
    setIsDraggingState(true);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Stop dragging and cleanup
  const onMouseUp = () => {
    isDragging.current = false;
    setIsDraggingState(false);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={wrapperRef}
      className="draggable-wrapper"
      style={{
        position: 'absolute',
        left: '50px',
        top: '50px',
        border: isDraggingState ? '2px solid red' : '2px solid transparent',
      }}
      onMouseDown={onMouseDown}
    >
      <div className="draggable-content">
        <span>{analysisResult}</span>
      </div>
    </div>
  );
};

export default DraggableDiv;
