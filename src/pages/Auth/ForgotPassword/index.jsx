import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import AuthWrapper from "../../../layout/AuthWrapper";
import useForgotPasswordController from "./useForgotPasswordController";

const ForgotPassword = () => {

  const { values, functions } = useForgotPasswordController()

  return (
    <AuthWrapper title="Forgot Password" subtitle="Please Enter Your Email To Receive A Verification Code">
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
        <Button text="Continue" onClick={functions.handleSubmit} outlined={false} size="lg" loading={values.isLoading} />
        <div className="pt-2 text-sm ">
          <Link to="/login" className="text-orange-700 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default ForgotPassword;
