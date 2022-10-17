import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function SigninForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleLogin = async (
    loginProvider: "OTP" | "EMAIL" | "GOOGLE",
    email: string
  ) => {
    try {
      switch (loginProvider) {
        case "OTP":
          const { error } = await supabase.auth.signInWithOtp({ email });
          if (error) throw error;
          setEmailSent(true);
          break;
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
          break;
      }
      setLoading(true);
    } catch (error: any) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {emailSent ? (
        <div className="prose">
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("OTP", email);
            }}
            className="flex flex-col space-y-4"
          >
            <p>
              To sign in or create an account, please enter your email address.
              You will receive a magic link in your mailbox.
            </p>
            <div className="form-group">
              <label className="label" htmlFor="email">
                E-mail address
              </label>
              <div>
                <input
                  id="email"
                  className="field"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  required
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn" disabled={loading}>
                <span>{loading ? "Processing…" : "Send magic link"}</span>
              </button>
            </div>
            <button type="button" className="bg-red-600">
              Google
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
