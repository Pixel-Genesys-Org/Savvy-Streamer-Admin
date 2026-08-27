import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import AuthWrapper from "../../../layout/AuthWrapper";
import useVerifyCodeController from "./useVerifyCodeController";

const VerifyCode = () => {

  const { values, functions } = useVerifyCodeController();

  return (
    <AuthWrapper title="Verification" subtitle={`Please enter the verification code sent to your email: ${values.email}`}>
      <div className="flex flex-col space-y-4 items-center w-full">
        <Input
          label="Code"
          required
          type="number"
          {...values?.register("otp", {
            required: "Code is required",
            minLength: {
              value: 4,
              message: "Code must be at least 4 characters",
            },
          })}
          error={values?.errors.otp?.message}
        />
        <Button text="Verify" onClick={functions.handleSubmit} size="lg" loading={values.isLoading} />
        <p className="text-sm text-gray-600">
          Didn't receive the code?{' '}
          <span
            onClick={values.timer <= 0 ? functions.handleResend : undefined}
            className={`font-medium ${values.timer > 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-primary hover:underline cursor-pointer'
              }`}
          >
            {values.timer > 0 ? `Resend in ${values.timer}s` : 'Resend'}
          </span>
        </p>
        <div className="pt-2 text-sm ">
          <Link to="/login" className="text-orange-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default VerifyCode;
