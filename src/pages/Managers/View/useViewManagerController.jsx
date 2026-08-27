import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Badge from "../../../components/Badge"
import ProfileViewer from "../../../components/ProfileViewer"
import TableActions from "../../../components/TableActions"
import { useSwal } from "../../../contexts/SwalContext"
import useFilters from "../../../middlewares/hooks/useFilters"
import { useDeleteUserMutation, useGetUsersQuery, useHandleStatusMutation } from "../../../redux/Apis/User"

const useViewManagerController = () => {

    const navigate = useNavigate()
    const { confirm, acknowledge } = useSwal()
    const { search, setSearch } = useFilters()

    const { data, isLoading } = useGetUsersQuery({ search, role: "user", status: "pending", profile_completed: true, active: true })
    const [submit, { data: dataDelete, isSuccess: isDeleteSuccess }] = useDeleteUserMutation()
    const [update, { data: dataUpdate, isSuccess: isUpdateSuccess }] = useHandleStatusMutation()

    useEffect(() => {
        if (isDeleteSuccess) {

            if (dataDelete?.success) {
                acknowledge({
                    title: "Success",
                    text: `Employee deleted successfully!`
                })
            } else {
                acknowledge({
                    icon: "error",
                    title: "Error",
                    text: dataDelete?.message
                })
            }

        }
    }, [isDeleteSuccess, dataDelete])

    useEffect(() => {
        if (isUpdateSuccess) {
            acknowledge({
                title: `Marked as ${dataUpdate?.data?.active ? "Active" : "Inactive"}`,
                text: `Employee ${dataUpdate?.data?.active ? "activated" : "inactivated"} successfully!`
            })
        }
    }, [isUpdateSuccess, dataUpdate])

    const handleDelete = async (id, name) => {
        let confirmed = await confirm({ title: "Delete Employee", text: `Are you sure you want to delete "${name}" employee?` })
        if (confirmed) submit(id)
    }

    const handleToggleStatus = async (id, name, active) => {

        let confirmed = await confirm({ title: `${active ? "Inactivate" : "Activate"} Employee`, text: `Are you sure you want to ${active ? "inactivate" : "activate"} "${name}" employee?` })

        let payload = {
            active: !active
        }

        if (confirmed) {
            update({ id, payload })
        }

    }

    const MANAGER_COLUMN = [
        {
            label: 'User Profile',
            render: (row) => <ProfileViewer name={row?.name} email={row?.email} />
        },
        {
            label: 'Phone',
            key: 'phone'
        },
        {
            label: 'Profile Status',
            render: (row) => <Badge type={row?.status === "pending" ? "warning" : "danger"} text={row?.status} />
        },
        {
            label: 'Status',
            render: (row) => <Badge type={row?.active ? "success" : "danger"} text={row?.active ? "Active" : "Inactive"} />
        },
        {
            label: 'Created Date',
            type: "date",
            key: 'createdAt'
        },
        {
            label: 'Actions',
            key: 'actions',
            render: (row) => (
                <TableActions
                    onView={() => navigate(`/users/${row._id}`)}
                />
            )
        }
    ]

    return {
        values: {
            columns: MANAGER_COLUMN,
            data: data?.data || [],
            isLoading
        },
        functions: {
            onSearch: setSearch
        }
    }

}

export default useViewManagerController