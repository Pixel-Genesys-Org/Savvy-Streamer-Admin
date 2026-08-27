import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../../redux/Apis/Auth";

const useForgotPasswordController = () => {

    const navigate = useNavigate()
    const { state } = useLocation()

    const [submit, { isLoading, isSuccess }] = useForgetPasswordMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm();

    useEffect(() => {
        if (state && state?.email) {
            setValue("email", state?.email)
        }
    }, [state])

    useEffect(() => {
        if (isSuccess) {
            navigate('/verify', { state: { email: getValues("email") }, replace: true })
        }
    }, [isSuccess])

    const onSubmit = (data) => submit(data)

    return {
        values: {
            register,
            errors,
            isLoading
        },
        functions: {
            handleSubmit: handleSubmit(onSubmit),
        },
    };
};


export default useForgotPasswordController;