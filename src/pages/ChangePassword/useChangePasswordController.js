import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useChangePasswordMutation } from "../../redux/apis/User"

const useChangePasswordController = () => {

    const [changePassword, { isLoading, isSuccess }] = useChangePasswordMutation()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const new_password = watch("new_password")

    useEffect(() => {
        if (isSuccess) {
            reset()
        }
    }, [isSuccess])

    const onSubmit = (values) => {
        changePassword({
            old_password: values.old_password,
            new_password: values.new_password,
        })
    }

    return {
        values: {
            register,
            errors,
            new_password,
            isLoading,
        },
        functions: {
            handleSubmit: handleSubmit(onSubmit),
        },
    }
}

export default useChangePasswordController
