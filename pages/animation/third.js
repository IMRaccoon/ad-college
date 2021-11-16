/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-sync-scripts */

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '../../styles/AnimationThird.module.css';

export default function Third() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      document.getElementById('person').style.display = 'none';
    } else if (step === 1) {
      document.getElementById('person').style.display = 'inline-block';
    } else if (step === 5) {
      document.getElementById('person').style.display = 'none';
    }
  }, [step]);

  return (
    <>
      <main className={styled.container}>
        {step === 0 ? <FirstStep onClick={() => setStep(1)} /> : null}
        {step === 1 ? <SecondStep onClick={() => setStep(2)} /> : null}
        {step === 2 ? <ThirdStep onClick={() => setStep(3)} /> : null}
        {step === 3 ? <FourthStep onClick={() => setStep(4)} /> : null}
        {step === 4 ? <FifthStep onClick={() => setStep(5)} /> : null}
        {step === 5 ? <SixthStep /> : null}
        <div className={styled.person} id="person" />
      </main>
    </>
  );
}

function FirstStep({ onClick }) {
  useEffect(() => {
    document.getElementById('background').style.opacity = 0.6;
  }, []);

  return (
    <>
      <div className={styled.wrapperImage} id="background"></div>
      <div className={styled.firstText} />
      <div className={styled.firstClick} onClick={onClick} />
    </>
  );
}

function SecondStep({ onClick }) {
  const checkRef = useRef(null);
  const [func, setFunc] = useState(() => null);

  const changeAction = useCallback(() => {
    document.getElementById('background').style.cursor = 'pointer';
    setFunc(() => onClick);
  });

  useEffect(() => {
    if (!checkRef) return;
    checkRef.current.addEventListener('animationend', changeAction);
  }, []);

  return (
    <div className={styled.wrapperImage} id="background" onClick={func}>
      <div ref={checkRef} className={styled.secondFirstText} />
    </div>
  );
}

function ThirdStep({ onClick }) {
  const canvasRef = useRef(null);

  const [isPress, setPress] = useState(false);
  const [position, setPosition] = useState(null);
  const [round, setRound] = useState(0);
  const [checkPos, setCheckPos] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const vw = document.getElementById('background').offsetWidth / 100;
    setRound(vw * 5);

    canvas.width = vw * 18.9;
    canvas.height = vw * 24.5;

    const cover = new Image();
    cover.src = '/animation/third/mirror_cover.png';
    cover.onload = () => {
      setCheckPos([
        { x: canvas.width * 0.35, y: canvas.height * 0.25 },
        { x: canvas.width * 0.65, y: canvas.height * 0.25 },
        { x: canvas.width * 0.32, y: canvas.height * 0.5 },
        { x: canvas.width * 0.65, y: canvas.height * 0.5 },
        { x: canvas.width * 0.3, y: canvas.height * 0.75 },
        { x: canvas.width * 0.65, y: canvas.height * 0.75 },
      ]);
      ctx.drawImage(cover, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    if (checkPos.length !== 6) return;

    let count = 0;
    let timer = setInterval(() => {
      if (checkPos.length === 6) {
        if (count === 6) {
          clearInterval(timer);
          setFinished(true);
        } else {
          count = checkPos.reduce((acc, cur) => {
            return canvasRef.current
              .getContext('2d')
              .getImageData(cur.x, cur.y, 3, 3).data[3] === 0
              ? acc + 1
              : acc;
          }, 0);
        }
      }
    }, 500);
  }, [checkPos]);

  function eraseCover(origin, next) {
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
  }

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

  const drawing = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isPress) {
        const newPosition = getCoordinate(event, false);
        if (position && newPosition) {
          eraseCover(position, newPosition);
          setPosition(newPosition);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPress, position],
  );

  const drawingMobile = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isPress) {
        const newPosition = getCoordinate(event, true);
        if (position && newPosition) {
          eraseCover(position, newPosition);
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
    const background = document.getElementById('background');
    background.addEventListener('mousedown', startPaint);
    background.addEventListener('touchstart', startPaintMobile);
    background.addEventListener('mousemove', drawing);
    background.addEventListener('touchmove', drawingMobile);
    background.addEventListener('mouseup', exitPaint);
    background.addEventListener('touchend', exitPaint);
    background.addEventListener('mouseover', checkMouseClicked);

    return () => {
      background.removeEventListener('mousedown', startPaint);
      background.removeEventListener('touchstart', startPaintMobile);
      background.removeEventListener('mousemove', drawing);
      background.removeEventListener('touchmove', drawingMobile);
      background.removeEventListener('mouseup', exitPaint);
      background.removeEventListener('touchend', exitPaint);
      background.removeEventListener('mouseover', checkMouseClicked);
    };
  }, [
    startPaint,
    startPaintMobile,
    drawing,
    drawingMobile,
    exitPaint,
    exitPaint,
    checkMouseClicked,
  ]);

  return (
    <div
      className={styled.wrapperImage}
      id="background"
      onClick={finished ? onClick : () => null}
    >
      <div className={styled.mirrorBackground} />
      <div className={styled.mirrorSkirt} />
      <canvas
        ref={canvasRef}
        className={finished ? styled.mirrorCoverDisappear : styled.mirrorCover}
      />
    </div>
  );
}

function FourthStep({ onClick }) {
  const checkRef = useRef(null);
  const [func, setFunc] = useState(() => null);

  const changeAction = useCallback(() => {
    document.getElementById('background').style.cursor = 'pointer';
    setFunc(() => onClick);
  });

  useEffect(() => {
    if (!checkRef) return;
    checkRef.current.addEventListener('animationend', changeAction);
  }, []);

  return (
    <div className={styled.wrapperImage} id="background" onClick={func}>
      <div className={styled.mirrorBackground} />
      <div className={styled.mirrorSkirt} />
      <div className={styled.fourthFirstText} ref={checkRef} />
    </div>
  );
}

function FifthStep({ onClick }) {
  const checkRef = useRef(null);
  const [func, setFunc] = useState(() => null);

  const changeAction = useCallback(() => {
    document.getElementById('background').style.cursor = 'pointer';
    setFunc(() => onClick);
  });

  useEffect(() => {
    if (!checkRef) return;
    checkRef.current.addEventListener('animationend', changeAction);
  }, []);

  return (
    <div className={styled.wrapperImage} id="background" onClick={func}>
      <div className={styled.mirrorBackground} />
      <div className={styled.mirrorSkirt} />
      <div className={styled.fifthFirstText} />
      <div className={styled.fifthSecondText} ref={checkRef} />
    </div>
  );
}

function SixthStep() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.getElementById('transform_background').addEventListener(
      'animationend',
      () => {
        setShow(true);
      },
      true,
    );
  }, []);

  function onClick() {
    window.open('https://www.instagram.com/naenahee_70yr', '_blank');
  }

  return (
    <div className={styled.transform_background} id="transform_background">
      {show ? (
        <>
          <div className={styled.sixthFirstText} />
          <div className={styled.sixthBackground} />
          <div className={styled.sixthQR} />
          <div className={styled.sixthButton} onClick={onClick} />
        </>
      ) : null}
    </div>
  );
}
