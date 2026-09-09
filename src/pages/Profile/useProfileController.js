import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useGetMyProfileQuery, useUpdateProfileMutation } from "../../redux/apis/User"
import { extractData, insertData } from "../../utils/storage"

const useProfileController = () => {

    const stored_user = extractData("user")
    const { data, isLoading } = useGetMyProfileQuery()
    const [updateProfile, { data: updateData, isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateProfileMutation()
    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState("")

    const profile = data?.data?.user || stored_user || {}

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (profile?._id || profile?.email) {
            reset({
                name: profile?.name || "",
                email: profile?.email || "",
                phone: profile?.phone || "",
            })
            setPreview(profile?.image_url || "")
        }
    }, [profile?._id, profile?.name, profile?.email, profile?.phone, profile?.image_url])

    useEffect(() => {
        if (isUpdateSuccess && updateData?.data?.user) {
            insertData(updateData.data.user, "user")
            setImageFile(null)
        }
    }, [isUpdateSuccess, updateData])

    const onSelectImage = (file) => {
        if (!file) return
        setImageFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const onUpdateProfile = (values) => {
        const formData = new FormData()
        formData.append("name", values.name)
        if (values.phone) formData.append("phone", values.phone)
        if (profile?.dialing_code) formData.append("dialing_code", profile.dialing_code)
        if (profile?.country_code) formData.append("country_code", profile.country_code)
        if (imageFile) formData.append("image", imageFile)
        updateProfile(formData)
    }

    return {
        values: {
            profile,
            preview,
            isLoading,
            isUpdating,
            register,
            errors,
        },
        functions: {
            onSelectImage,
            handleProfileSubmit: handleSubmit(onUpdateProfile),
        },
    }
}

export default useProfileController
