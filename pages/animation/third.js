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
  return (
    <div className={styled.wrapperImage} id="background" onClick={onClick}>
      <div className={styled.mirrorBackground} />
      <div className={styled.mirrorSkirt} />
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
        console.log('?');
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
