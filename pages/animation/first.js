import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '../../styles/AnimationFirst.module.css';

export default function First() {
  const canvasRef = useRef(null);
  const [isPress, setPress] = useState(false);
  const [position, setPosition] = useState(null);
  const [round, setRound] = useState(0);
  const [checkPos, setCheckPos] = useState([]);
  const [isFinish, setFinish] = useState(false);

  function getCoordinate(event, isMobile) {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    return isMobile
      ? {
          x: event.changedTouches[0].pageX - canvas.offsetLeft,
          y: event.changedTouches[0].pageY - canvas.offsetTop,
        }
      : {
          x: event.pageX - canvas.offsetLeft,
          y: event.pageY - canvas.offsetTop,
        };
  }

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinate(event, false);
    if (coordinates) {
      setPress(true);
      setPosition(coordinates);
    }
  }, []);

  const startPaintMobile = useCallback((event) => {
    const coordinates = getCoordinate(event, true);
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
    context.lineWidth = round;

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
        const newPosition = getCoordinate(event, false);
        if (position && newPosition) {
          drawLine(position, newPosition);
          setPosition(newPosition);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPress, position],
  );
  const paintMobile = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isPress) {
        const newPosition = getCoordinate(event, true);
        if (position && newPosition) {
          drawLine(position, newPosition);
          setPosition(newPosition);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const wrapper = document.getElementById('wrapper');
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    setRound(canvas.width / 5);
    const info = new Image();
    info.src = '/animation/first/howto.png';

    const img = new Image();
    img.src = '/animation/first/wrapper.png';
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(info, 0, 0, canvas.width, canvas.height);

      const arr = [];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          arr.push({
            x: canvas.width * (0.1 + 0.2 * i),
            y: canvas.width * (0.1 + 0.2 * j),
          });
        }
      }
      setCheckPos(arr);
    };
  }, []);

  useEffect(() => {
    if (checkPos.length !== 25) return;
    if (canvasRef.current === null) return;

    let timer = setInterval(() => {
      if (checkPos.length > 0) {
        let count = 0;
        checkPos.forEach((pos) => {
          if (
            canvasRef.current.getContext('2d').getImageData(pos.x, pos.y, 3, 3)
              .data[3] === 0
          )
            count += 1;
        });
        if (count >= 15) {
          clearInterval(timer);
          setFinish(true);
        }
      }
    }, 500);
  }, [checkPos]);

  return (
    <main className={styled.container}>
      <div className={styled.wrapperImage} id="wrapper">
        <canvas
          ref={canvasRef}
          className={isFinish ? styled.fadeoutCanvas : null}
        />
      </div>
    </main>
  );
}
