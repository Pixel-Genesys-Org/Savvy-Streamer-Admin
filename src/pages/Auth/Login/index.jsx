import { Mail } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import AuthWrapper from "../../../layout/AuthWrapper";
import useLoginController from "./useLoginController";

const Login = () => {
  const { values, functions } = useLoginController();

  return (
    <AuthWrapper title="Welcome Back!" subtitle="Enter your login information">
      <div className="flex w-full flex-col items-center space-y-4">
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
        <div className="flex w-full max-w-md items-center">
          <label className="flex cursor-pointer items-center space-x-2 text-sm text-white/80">
            <input
              type="checkbox"
              {...values?.register("rememberMe")}
              className="form-checkbox h-4 w-4 rounded accent-primary"
            />
            <span>Remember Me</span>
          </label>
        </div>
        <Button text="Login" onClick={functions.handleSubmit} size="lg" loading={values.isLoading} />
      </div>
    </AuthWrapper>
  );
};

export default Login;
