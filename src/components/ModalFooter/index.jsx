import { memo } from "react"
import Button from "../Button"
import { useModal } from "../../contexts/ModalContext"

const ModalFooter = ({ onSubmit, isSubmitting = false }) => {

    const { close } = useModal()

    return (
        <div className="flex justify-end gap-3 mt-6">
            <Button text="Cancel" onClick={close} type="muted" />
            <Button text="Submit" onClick={onSubmit} loading={isSubmitting} />
        </div>
    )
}

export default memo(ModalFooter)