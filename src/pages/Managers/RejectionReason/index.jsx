import { Fragment } from "react"
import Input from "../../../components/Input"
import ModalFooter from "../../../components/ModalFooter"
import useRejectionReasonController from "./useRejectionReasonController"

const RejectionReason = (props) => {

    const { values, functions } = useRejectionReasonController(props)

    return (
        <Fragment>
            <div className="grid gap-3">
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        type="textarea"
                        label="Reason"
                        required
                        error={values.errors.reason?.message}
                        {...values.register("reason", {
                            required: "Reason is required"
                        })}
                    />
                </div>
            </div>
            <ModalFooter onSubmit={functions.handleSubmit} />
        </Fragment>
    )
}

export default RejectionReason