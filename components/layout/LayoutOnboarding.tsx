import { PropsWithChildren, ReactElement } from "react";
import { OnboardingFormState } from "../../types/Onboarding";

export default function LayoutOnboarding({
  formState,
  submitForm,
  children,
}: PropsWithChildren<{
  formState: OnboardingFormState;
  submitForm: () => void;
  children: ReactElement;
}>) {


  return (

  );
}
