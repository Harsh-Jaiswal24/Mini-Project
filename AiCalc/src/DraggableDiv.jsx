import React, { useRef, useState } from 'react';
import './DraggableDiv.css';

const DraggableDiv = ({ analysisResult }) => {
  const wrapperRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  const [isDraggingState, setIsDraggingState] = useState(false);

  // Start dragging - mouse
  const onMouseDown = (event) => {
    isDragging.current = true;
    setIsDraggingState(true);
    dragStartX.current = event.clientX - wrapperRef.current.getBoundingClientRect().left;
    dragStartY.current = event.clientY - wrapperRef.current.getBoundingClientRect().top;
    document.body.style.overflow = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Start dragging - touch
  const onTouchStart = (event) => {
    isDragging.current = true;
    setIsDraggingState(true);
    const touch = event.touches[0];
    dragStartX.current = touch.pageX - wrapperRef.current.getBoundingClientRect().left;
    dragStartY.current = touch.pageY - wrapperRef.current.getBoundingClientRect().top;
    document.body.style.overflow = 'none';
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    event.preventDefault();
  };

  // Handle mouse move
  const onMouseMove = (event) => {
    if (!isDragging.current) return;
    const newLeft = event.clientX - dragStartX.current;
    const newTop = event.clientY - dragStartY.current;
    updatePosition(newLeft, newTop);
  };

  // Handle touch move
  const onTouchMove = (event) => {
    if (!isDragging.current) return;
    const touch = event.touches[0];
    const newLeft = touch.pageX - dragStartX.current;
    const newTop = touch.pageY - dragStartY.current;
    updatePosition(newLeft, newTop);
    event.preventDefault();
  };

  // Update position with boundary check
  const updatePosition = (left, top) => {
    const wrapper = wrapperRef.current;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const wrapperRect = wrapper.getBoundingClientRect();
    const maxLeft = viewportWidth - wrapperRect.width;
    const maxTop = viewportHeight - wrapperRect.height;

    wrapper.style.left = `${Math.max(0, Math.min(left, maxLeft))}px`;
    wrapper.style.top = `${Math.max(0, Math.min(top, maxTop))}px`;
  };

  // Stop dragging - mouse
  const onMouseUp = () => {
    isDragging.current = false;
    setIsDraggingState(false);
    document.body.style.overflow = 'auto';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // Stop dragging - touch
  const onTouchEnd = () => {
    isDragging.current = false;
    setIsDraggingState(false);
    document.body.style.overflow = 'auto';
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
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
      onTouchStart={onTouchStart}
    >
      <div className="draggable-content">
        <span>{analysisResult}</span>
      </div>
    </div>
  );
};

export default DraggableDiv;


//All Done

