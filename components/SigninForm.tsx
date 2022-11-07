/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function SigninForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleLogin = async (
    loginProvider: 'OTP' | 'EMAIL' | 'GOOGLE',
    email: string
  ) => {
    try {
      switch (loginProvider) {
        case 'OTP':
          const { error } = await supabase.auth.signInWithOtp({ email })
          if (error) throw error
          setEmailSent(true)
          break
        // case "EMAIL":
        // const { data, error } = await supabase.auth.signUp({
        //   email: "example@email.com",
        //   password: "example-password",
        // });
        // break;
        // case "GOOGLE":
        // const { data, error } = await supabase.auth.signInWithOAuth({
        //   provider: "google",
        // });
        // break;
        default:
          break
      }
      setLoading(true)
    } catch (error: any) {
      console.error(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin('OTP', email)
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <img src="/logo.svg" alt="logo" className="w-3/4" />
          <h2 className="mt-12 text-xl font-semibold">
            Sign in to your account
          </h2>
        </div>
        {emailSent ? (
          <div className="max-w-sm">
            <p>An e-mail has been sent to your e-mail address.</p>
            <p>Please click the link in this mail to sign in.</p>
            <p>
              <button className="btn-link" onClick={() => setEmailSent(false)}>
                Retry
              </button>
            </p>
          </div>
        ) : (
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              id="email"
              className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-zinc-500 focus:ring-zinc-500"
              type="email"
              placeholder="name@company.com"
              value={email}
              required
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-zinc-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-300"
              disabled={loading}
            >
              <span>{loading ? 'Processing…' : 'Send magic link'}</span>
            </button>
            <div className="mt-12 flex flex-col items-center justify-center gap-y-3">
              <span className="mb-6 h-0.5 w-3/4 bg-zinc-300"></span>
              <button
                type="button"
                className="flex w-full justify-center gap-x-3 rounded-lg bg-red-500 py-2 font-medium text-zinc-50"
              >
                Sign in with Google
                <svg
                  width="24px"
                  height="24px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#FAFAFA"
                >
                  <path
                    d="M15.547 8.303A5.148 5.148 0 0012.11 7C9.287 7 7 9.239 7 12s2.287 5 5.109 5c3.47 0 4.751-2.57 4.891-4.583h-4.159"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="flex w-full justify-center gap-x-3 rounded-lg bg-zinc-800 py-2 font-medium text-zinc-50"
              >
                Sign in with Github
                <svg
                  width="24px"
                  height="24px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#FAFAFA"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14.333 19v-1.863c.025-.31-.018-.62-.126-.913a2.18 2.18 0 00-.5-.781c2.093-.227 4.293-1 4.293-4.544 0-.906-.358-1.778-1-2.434a3.211 3.211 0 00-.06-2.448s-.787-.227-2.607.961a9.152 9.152 0 00-4.666 0c-1.82-1.188-2.607-.96-2.607-.96A3.211 3.211 0 007 8.464a3.482 3.482 0 00-1 2.453c0 3.519 2.2 4.291 4.293 4.544a2.18 2.18 0 00-.496.773 2.134 2.134 0 00-.13.902V19M9.667 17.702c-2 .631-3.667 0-4.667-1.948"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )}
        {/* <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div> */}
        {/* <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div> */}

        {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{' '}
            <a
              href="#"
              className="text-zinc-700 hover:underline dark:text-zinc-500"
            >
              Create account
            </a>
          </div> */}
      </form>
    </div>
  )
}
