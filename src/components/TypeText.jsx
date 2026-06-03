'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

const TextType = ({
  text = 'The Age of Autonomous Agents',
  as: Component = 'h1',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const processedTextArray = useMemo(
    () => textArray.map(item => (reverseMode ? item.split('').reverse().join('') : item)),
    [textArray, reverseMode]
  );
  const currentText = processedTextArray[currentTextIndex] || '';

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const startDeletePhase = () => {
      if (onSentenceComplete) {
        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
      }
      setIsDeleting(true);
    };

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentCharIndex(0);
          setCurrentTextIndex(prev => (prev + 1) % processedTextArray.length);
          return;
        }

        timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, deletingSpeed);
        return;
      }

      if (currentCharIndex < currentText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText(prev => prev + currentText[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          },
          variableSpeed ? getRandomSpeed() : typingSpeed
        );
        return;
      }

      if (loop || currentTextIndex < processedTextArray.length - 1) {
        timeout = setTimeout(startDeletePhase, pauseDuration);
      }
    };

    if (currentCharIndex === 0 && displayedText === '' && !isDeleting) {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    initialDelay,
    pauseDuration,
    loop,
    isVisible,
    currentText,
    processedTextArray.length,
    currentTextIndex,
    textArray,
    variableSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < currentText.length || isDeleting);
  const textContent = (
    <>
      <span 
        className={`inline ${
          getCurrentTextColor() === "#00e5ff"
            ? "bg-gradient-to-r from-[#00e5ff] from-0% via-[#00e5ff] via-60% to-white to-100% bg-clip-text text-transparent"
            : ""
        }`}
        style={
          getCurrentTextColor() !== "#00e5ff"
            ? { color: getCurrentTextColor() || 'inherit' }
            : {}
        }
      >
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </>
  );

  const typedElement = createElement(
    Component,
    { className: 'whitespace-pre-wrap tracking-tight font-bold' },
    textContent
  );

  return (
    <div ref={containerRef} className={`inline-block ${className}`} {...props}>
      {typedElement}
    </div>
  );
};

export default TextType;
