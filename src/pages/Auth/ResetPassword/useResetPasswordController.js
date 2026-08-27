import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetPasswordMutation } from "../../../redux/Apis/Auth";
import { useEffect } from "react";

const useResetPasswordController = () => {

    const { state } = useLocation()
    const navigate = useNavigate()

    const [submit, { isLoading, isSuccess }] = useSetPasswordMutation()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    useEffect(() => {
        if (isSuccess) {
            navigate('/login', { replace: true })
        }
    }, [isSuccess])

    const onSubmit = (data) => {

        let payload = {
            ...state,
            ...data
        }

        submit(payload)

    };

    return {
        values: {
            register,
            errors,
            password,
            isLoading
        },
        functions: {
            handleSubmit: handleSubmit(onSubmit),
        },
    };
};


export default useResetPasswordController;