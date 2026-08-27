import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import AuthWrapper from "../../../layout/AuthWrapper";
import useResetPasswordController from "./useResetPasswordController";

const ResetPassword = () => {

  const { values, functions } = useResetPasswordController()

  return (
    <AuthWrapper title="Reset Password" subtitle="Enter Your New Password">
      <div className="flex flex-col space-y-4 items-center w-full">
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
        <Input
          label="Confirm Password"
          type="password"
          required
          {...values?.register("confirm_password", {
            required: "Please confirm your password",
            validate: (value) =>
              value === values?.password || "Passwords do not match",
          })}
          error={values?.errors.confirm_password?.message}
        />
        <Button text="Submit" onClick={functions.handleSubmit} size="lg" loading={values.isLoading} />
        <div className="pt-2 text-sm ">
          <Link to="/login" className="text-orange-700 hover:underline !text-orange-700">
            Back to Login
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default ResetPassword;
