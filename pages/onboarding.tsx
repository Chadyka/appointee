import { SubmitHandler, useForm } from "react-hook-form";
import { OnboardingFormValues } from "../types/Onboarding";
import { useMultistepForm } from "../utils/hooks/useMultistepForm";
import { useSession } from "../utils/hooks/useSession";
import LandingForm from "../components/onboarding/LandingForm";

export default function SigninPage() {
  const { session } = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OnboardingFormValues>();

  const {
    step,
    steps,
    currentStepIndex,
    backStep,
    nextStep,
    isFirstStep,
    isLastStep,
  } = useMultistepForm([
    <LandingForm key={0} register={register} />,
    // <UserForm key={0} register={register} />,
    // <OrganizationForm key={1} register={register} />,
    // <ServiceForm key={2} register={register} />,
  ]);

  // const onSubmit: SubmitHandler<OnboardingFormValues> = async (form) => {
  //   const { data, error } = await supabase
  //     .from("providers")
  //     .insert({ full_name: form.full_name, email: form.email })
  //     .select();
  //   console.log(data, error);
  //   console.log(error);
  // };

  const onSubmit: SubmitHandler<OnboardingFormValues> = async (form) => {
    alert(
      `email: ${form.email}\npassword: ${form.password}\nfirst_name: ${form.first_name}\nlast_name: ${form.last_name}`
    );
  };

  if (session) return <div>Session available</div>;

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col">
      <div className="max-w-md bg-slate-200 w-full p-6">
        <div className="flex justify-between mb-12">
          <h1>Onboarding</h1>
          <h3>
            {currentStepIndex + 1}/{steps.length}
          </h3>
        </div>
        {errors.first_name && (
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        )}
        <div className="bg-white rounded-xl p-6">{step}</div>
        <div className="flex gap-x-6 w-full mt-12">
          <button
            className={`border-2 border-slate-700 bg-slate-700 text-white rounded-xl capitalize w-1/2 p-3 ${
              isFirstStep && "bg-transparent text-black"
            }`}
            disabled={isFirstStep}
            onClick={() => backStep()}
            type="button"
          >
            Back
          </button>

          {isLastStep ? (
            <button
              className="border-2 border-slate-700 bg-emerald-500 text-black rounded-xl capitalize w-1/2 p-3"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          ) : (
            <button
              className="border-2 border-slate-700 bg-slate-700 text-white rounded-xl capitalize w-1/2 p-3"
              onClick={() => nextStep()}
              type="button"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
