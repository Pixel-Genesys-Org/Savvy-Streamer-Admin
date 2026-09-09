import { Camera, Mail } from "lucide-react"
import { useRef } from "react"
import Avatar from "../../components/Avatar"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Loader from "../../components/Loader"
import DetailsPage from "../../components/Wrappers/DetailsPage"
import useProfileController from "./useProfileController"

const Profile = () => {
  const { values, functions } = useProfileController()
  const fileRef = useRef(null)

  return (
    <DetailsPage title="My Profile" back={false}>
      {values.isLoading ? (
        <Loader center size={48} />
      ) : (
        <div className="glass-panel rounded-3xl p-5 sm:p-8">
          <h2 className="font-heading mb-6 text-lg font-semibold text-white">Profile Details</h2>
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-end">
            <div className="relative">
              <Avatar src={values.preview} name={values.profile?.name} size="xl" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -right-1 -bottom-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
                aria-label="Change photo"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => functions.onSelectImage(e.target.files?.[0])}
              />
            </div>
            <p className="text-sm text-muted">JPG or PNG. Click the camera to update your photo.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Name"
              required
              {...values.register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
              error={values.errors.name?.message}
            />
            <Input
              label="Email"
              icon={Mail}
              disabled
              {...values.register("email")}
            />
            <Input
              label="Phone"
              {...values.register("phone")}
              error={values.errors.phone?.message}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              text="Save Changes"
              onClick={functions.handleProfileSubmit}
              loading={values.isUpdating}
            />
          </div>
        </div>
      )}
    </DetailsPage>
  )
}

export default Profile
