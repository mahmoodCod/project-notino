"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  className?: string
}

export function TypingAnimation({ 
  texts, 
  speed = 100,
  className = "" 
}: TypingAnimationProps) {
  const [currentText, setCurrentText] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const text = texts[0] // فقط اولین متن
    
    if (!isComplete && charIndex < text.length) {
      // Typing
      const timeout = setTimeout(() => {
        setCurrentText(text.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete && charIndex === text.length) {
      // تایپ تمام شد
      setIsComplete(true)
    }
  }, [charIndex, isComplete, texts, speed])

  return (
    <span className={className}>
      {currentText}
      {!isComplete && (
        <span className="animate-pulse inline-block w-0.5 h-[1em] bg-current align-text-bottom mx-1">|</span>
      )}
    </span>
  )
}

