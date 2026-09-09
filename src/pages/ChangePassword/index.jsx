import { Shield } from "lucide-react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import DetailsPage from "../../components/Wrappers/DetailsPage"
import useChangePasswordController from "./useChangePasswordController"

const ChangePassword = () => {
  const { values, functions } = useChangePasswordController()

  return (
    <DetailsPage title="Change Password">
      <div className="glass-panel max-w-2xl rounded-3xl p-5 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Shield size={18} />
          </div>
          <p className="text-sm text-muted">
            Enter your current password, then choose a new one.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Current Password"
            type="password"
            required
            {...values.register("old_password", {
              required: "Current password is required",
            })}
            error={values.errors.old_password?.message}
          />
          <Input
            label="New Password"
            type="password"
            required
            {...values.register("new_password", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            error={values.errors.new_password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            required
            {...values.register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === values.new_password || "Passwords do not match",
            })}
            error={values.errors.confirm_password?.message}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            text="Update Password"
            onClick={functions.handleSubmit}
            loading={values.isLoading}
          />
        </div>
      </div>
    </DetailsPage>
  )
}

export default ChangePassword
