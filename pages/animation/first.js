import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '../../styles/AnimationFirst.module.css';

export default function First() {
  const mainRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!mainRef.current) {
      return;
    }
    setHeight(mainRef.current.clientHeight);
    setWidth(mainRef.current.clientWidth);
  }, [mainRef]);

  return (
    <main ref={mainRef} className={styled.container}>
      <div className={styled.wrapperImage}>
        <Canvas className={styled.erase} height={height} width={width} />
      </div>
    </main>
  );
}

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [isPress, setPress] = useState(false);
  const [position, setPosition] = useState(null);

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const getCoordinatesMobile = (event) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    return {
      x: event.changedTouches[0].pageX - canvas.offsetLeft,
      y: event.changedTouches[0].pageY - canvas.offsetTop,
    };
  };

  const startPaintMobile = useCallback((event) => {
    const coordinates = getCoordinatesMobile(event);
    if (coordinates) {
      setPress(true);
      setPosition(coordinates);
    }
  }, []);

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setPress(true);
      setPosition(coordinates);
    }
  }, []);

  const drawLine = (origin, next) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;
    context.globalCompositeOperation = 'destination-out';

    context.lineJoin = 'round';
    context.lineWidth = props.width / 5;

    context.beginPath();
    context.moveTo(origin.x, origin.y);
    context.lineTo(next.x, next.y);
    context.closePath();
    context.stroke();
  };

  const paint = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isPress) {
        const newPosition = getCoordinates(event);
        if (position && newPosition) {
          drawLine(position, newPosition);
          setPosition(newPosition);
        }
      }
    },
    [isPress, position],
  );

  const paintMobile = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isPress) {
        const newPosition = getCoordinatesMobile(event);
        if (position && newPosition) {
          drawLine(position, newPosition);
          setPosition(newPosition);
        }
      }
    },
    [isPress, position],
  );

  const exitPaint = useCallback(() => {
    setPress(false);
  }, []);

  const checkMouseClicked = useCallback((event) => {
    if (event.buttons === 1) {
      setPress(true);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('touchstart', startPaintMobile);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('touchmove', paintMobile);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('touchend', exitPaint);
    canvas.addEventListener('mouseover', checkMouseClicked);

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('touchstart', startPaintMobile);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('touchmove', paintMobile);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('touchend', exitPaint);
      canvas.removeEventListener('mouseover', checkMouseClicked);
    };
  }, [
    startPaint,
    startPaintMobile,
    paint,
    paintMobile,
    exitPaint,
    checkMouseClicked,
  ]);

  useEffect(() => {
    if (!window) return;
    if (props.height === 0 && props.width === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const info = new Image();
    info.src = '/animation/howto.png';

    const img = new Image();
    img.src = '/animation/wrapper.png';
    img.onload = function () {
      canvas.width = props.width;
      canvas.height = props.height;
      context.drawImage(img, 0, 0, props.width, props.height);
      context.drawImage(info, 0, 0, props.width, props.height);
    };
  }, [props]);

  return <canvas ref={canvasRef} />;
};

<p align="center">
  <iframe
    src="https://ad-college-5l6an40py-whdies816.vercel.app/animation/first"
    style="width: 80vw;
  max-width: 850px;
  height: 115vw;
	max-height: 1200px;
  display: flex;
  margin: auto;
  border: none;"
  ></iframe>
</p>;
