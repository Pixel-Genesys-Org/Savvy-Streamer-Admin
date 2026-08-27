import { Mail } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import AuthWrapper from "../../../layout/AuthWrapper";
import useLoginController from "./useLoginController";

const Login = () => {

  const { values, functions } = useLoginController()

  return (
    <AuthWrapper title="Login" subtitle="Please Sign In to Continue">
      <div className="flex flex-col space-y-4 items-center w-full">
        <Input
          label="Email"
          icon={Mail}
          required
          {...values?.register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
          error={values?.errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          required
          {...values?.register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={values?.errors.password?.message}
        />
        <div className="w-full max-w-md flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              {...values?.register("rememberMe")}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>Remember Me</span>
          </label>
          <p
            className="text-xs text-red-500 cursor-pointer"
            onClick={functions.onForgot}
          >
            Forgot Password?
          </p>
        </div>
        {/* <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={functions.handleCaptchaChange}
        /> */}
        <Button text="Login" onClick={functions.handleSubmit} size="lg" loading={values.isLoading} />
      </div>
    </AuthWrapper>
  );
}

export default Login;
