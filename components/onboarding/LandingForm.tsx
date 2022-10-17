import { UseFormRegister } from "react-hook-form";
import DatePicker from "react-datepicker";
import { OnboardingFormValues } from "../../types/Onboarding";
import { useState } from "react";
import { getDate, getMonth, differenceInCalendarDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export default function LandingForm({
  register,
}: {
  register: UseFormRegister<OnboardingFormValues>;
}) {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const onChange = (date: Date) => {
    setStartDate(date);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    console.log(getDate(date), getDate(startDate));
    return (
      <div className="bg-white w-full h-full">
        <div
          className={`${
            differenceInCalendarDays(date, startDate) === 0 &&
            "bg-red-500 w-full h-full rounded-lg"
          }`}
          title={tooltipText}
        >
          {getDate(date)}
        </div>
      </div>
    );
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      renderDayContents={renderDayContents}
      renderCustomHeader={({
        date,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="m-3 flex justify-between">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
    />
  );
}
// return (
//   <>
//     <div className="w-full">
//       <div className="flex flex-wrap -mx-3">
//         <div className="w-1/2 md:w-1/2 px-3 mb-6 md:mb-0">
//           <label
//             className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//             htmlFor="grid-first-name"
//           >
//             First Name
//           </label>
//           <input
//             className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//             id="grid-first-name"
//             type="text"
//             placeholder="Jane"
//             {...register("first_name")}
//           />
//         </div>
//         <div className="w-1/2 md:w-1/2 px-3">
//           <label
//             className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//             htmlFor="grid-last-name"
//           >
//             Last Name
//           </label>
//           <input
//             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             id="grid-last-name"
//             type="text"
//             placeholder="Doe"
//             {...register("last_name")}
//           />
//         </div>
//       </div>
//       <div className="flex flex-wrap -mx-3 mb-6">
//         <div className="w-full px-3">
//           <label
//             className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//             htmlFor="grid-password"
//           >
//             Email
//           </label>
//           <input
//             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             id="grid-email"
//             type="email"
//             placeholder="example@gmail.com"
//             autoComplete="username"
//             {...register("email")}
//           />
//         </div>
//       </div>
//       <div className="flex flex-wrap -mx-3 mb-6">
//         <div className="w-full px-3">
//           <label
//             className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//             htmlFor="grid-password"
//           >
//             Password
//           </label>
//           <input
//             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             id="grid-password"
//             type="password"
//             placeholder="*******"
//             autoComplete="current-password"
//             {...register("password")}
//           />
//           <p className="text-gray-600 text-xs italic">
//             Make it as long and as crazy as you like
//           </p>
//         </div>
//       </div>
//     </div>
//   </>
// );
