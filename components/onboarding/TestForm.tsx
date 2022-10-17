import { AuthSession } from "@supabase/supabase-js";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";

type WelcomeFormValues = {
  full_name: string;
  email: string;
};

export function TestForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WelcomeFormValues>();

  const onSubmit: SubmitHandler<WelcomeFormValues> = async (form) => {
    const { data, error } = await supabase
      .from("providers")
      .insert({ full_name: form.full_name, email: form.email })
      .select();
    console.log(data, error);
    console.log(error);
  };

  console.log(watch("email")); // watch input value by passing the name of it

  return (
    <div className="mx-auto max-w-sm border-2 border-blue-400 bg-slate-400 p-6">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 flex-col">
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("full_name")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("email", { required: true })} />

        {/* errors will return when field validation fails  */}
        {errors.email && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
}

// type WelcomeFormValues = {
//   firstName: string;
//   lastName: string;
//   email: string;
// };

// export function JoinForm({ session }: { session: AuthSession | null }) {
//   const { register, handleSubmit } = useForm<WelcomeFormValues>();
//   const onSubmit: SubmitHandler<WelcomeFormValues> = (data) =>
//     console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName")} />
//       <input {...register("lastName")} />
//       <input type="email" {...register("email")} />

//       <input type="submit" />
//     </form>
//   );
// }
