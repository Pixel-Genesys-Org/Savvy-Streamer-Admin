import { useParams } from "react-router-dom"
import { useSwal } from "../../../contexts/SwalContext"
import { useGetUserByIdQuery, useHandleStatusMutation } from "../../../redux/apis/User"
import { useEffect } from "react"
import { useModal } from "../../../contexts/ModalContext"
import RejectionReason from "../RejectionReason"

const useViewManagerDetailsController = () => {

    const { id } = useParams()
    const { confirm, acknowledge } = useSwal()
    const { open } = useModal()

    const { data, isLoading, refetch } = useGetUserByIdQuery(id)
    const [update, { data: updateData, isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] = useHandleStatusMutation()

    useEffect(() => {
        if (isUpdateSuccess) {
            if (data?.data?.status === updateData?.data?.status) {
                acknowledge({
                    title: `Marked as ${updateData?.data?.active ? "Active" : "Inactive"}`,
                    text: `User ${updateData?.data?.active ? "activated" : "inactivated"} successfully!`
                })
            } else {
                acknowledge({ title: "Success", text: `User has been ${updateData?.data?.status} successfully!` })
            }
            refetch()
        }
    }, [isUpdateSuccess, updateData])

    const onSubmitReason = async values => {

        let confirmed = await confirm({ title: "Reject Request", text: `Are you sure you want to reject "${data?.data?.name}" user?` })

        if (confirmed) {
            update({ id, payload: { ...values, status: "rejected" } })
        }

    }

    const toggleStatus = async () => {

        let confirmed = await confirm({
            title: `${data?.data?.active ? "Inactivate" : "Activate"} User`,
            text: `Are you sure you want to ${data?.data?.active ? "inactivate" : "activate"} "${data?.data?.name}" user?`
        })

        if (confirmed) {
            update({ id, payload: { active: !data?.data?.active } })
        }

    }

    const onAccept = async () => {

        let confirmed = await confirm({ title: "Approve Request", text: `Are you sure you want to approve "${data?.data?.name}" user?` })

        if (confirmed) {
            update({ id, payload: { status: "approved" } })
        }

    }

    const onReject = async () => {
        open("Rejection Reason", <RejectionReason onSubmitReason={onSubmitReason} />)
    }

    return {
        values: {
            data: data?.data || [],
            isLoading
        },
        functions: {
            onAccept,
            onReject,
            toggleStatus
        }
    }

}

export default useViewManagerDetailsController