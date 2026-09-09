import { useForm } from "react-hook-form";
import { useModal } from "../../../contexts/ModalContext";

const initial = {
    reason: "",
}

const useRejectionReasonController = ({ onSubmitReason }) => {

    const { close } = useModal()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initial });

    const onSubmit = (values) => {
        onSubmitReason(values)
        close()
    }

    return {
        values: {
            register,
            errors,
        },
        functions: {
            handleSubmit: handleSubmit(onSubmit),
        },
    };
};


export default useRejectionReasonController