import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { useForgetPasswordMutation, useVerifyCodeMutation } from "../../../redux/apis/Auth"
import { hideEmail } from "../../../utils/helper"

const TIMER = 60

const useVerifyCodeController = () => {

    const { state } = useLocation()
    const navigate = useNavigate()

    const [submit, { data, isLoading, isSuccess }] = useVerifyCodeMutation()
    const [submitForgotPassword, { isLoading: isResending }] = useForgetPasswordMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [timer, setTimer] = useState(TIMER)

    useEffect(() => {
        if (isSuccess) {
            navigate('/reset-password', { state: { token: data?.data?.token }, replace: true })
        }
    }, [isSuccess, data])

    const onSubmit = (data) => {

        let payload = {
            ...data,
            email: state?.email,
        }

        submit(payload)

    }

    const handleResend = () => {

        let payload = {
            email: state?.email
        }

        submitForgotPassword(payload)
        setTimer(TIMER)

    }

    useEffect(() => {

        let interval

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        }

        return () => clearInterval(interval)

    }, [timer])

    return {
        values: {
            register,
            errors,
            timer,
            isLoading,
            email: hideEmail(state?.email)
        },
        functions: {
            handleSubmit: handleSubmit(onSubmit),
            handleResend,
        },
    }
}

export default useVerifyCodeController
