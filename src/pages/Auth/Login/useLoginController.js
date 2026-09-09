import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/apis/Auth";
import { insertData } from "../../../utils/storage";

const useLoginController = () => {

    const navigate = useNavigate()

    const [login, { data, isLoading, isSuccess }] = useLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (isSuccess) {
            insertData(data?.data?.user, "user")
            insertData(data?.data?.token, "access_token")
            navigate("/dashboard")
        }
    }, [isSuccess, data])

    const onSubmit = (data) => {

        let payload = {
            ...data,
            fcm_token: ""
        }

        login(payload)

    };

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


export default useLoginController;
