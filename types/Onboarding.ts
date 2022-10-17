import { ReactElement } from "react";

export type OnboardingFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type OnboardingFormState = {
  currentStepIndex: number;
  step: ReactElement;
  steps: ReactElement[];
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  nextStep: () => void;
  backStep: () => void;
};
