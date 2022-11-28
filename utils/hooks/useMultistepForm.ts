import { ReactElement, useState } from 'react'

export function useMultistepForm(steps: ReactElement[]): {
  currentStepIndex: number
  step: ReactElement
  steps: ReactElement[]
  isFirstStep: boolean
  isLastStep: boolean
  goTo: (index: number) => void
  nextStep: () => void
  backStep: () => void
} {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  function nextStep() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }

  function backStep() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i
      return i - 1
    })
  }

  function goTo(index: number) {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    nextStep,
    backStep,
  }
}
