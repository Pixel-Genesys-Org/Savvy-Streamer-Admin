import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Badge from "../../../components/Badge"
import ProfileViewer from "../../../components/ProfileViewer"
import TableActions from "../../../components/TableActions"
import { useSwal } from "../../../contexts/SwalContext"
import useFilters from "../../../middlewares/hooks/useFilters"
import { useDeleteUserMutation, useGetUsersQuery, useHandleStatusMutation } from "../../../redux/Apis/User"

const useViewEmployeesController = () => {

    const navigate = useNavigate()
    const { confirm, acknowledge } = useSwal()
    const { search, setSearch } = useFilters()

    const { data, isLoading } = useGetUsersQuery({ search, role: "user" })
    const [submit, { data: dataDelete, isSuccess: isDeleteSuccess }] = useDeleteUserMutation()
    const [update, { data: dataUpdate, isSuccess: isUpdateSuccess }] = useHandleStatusMutation()

    useEffect(() => {
        if (isDeleteSuccess) {

            if (dataDelete?.success) {
                acknowledge({
                    title: "Success",
                    text: `User deleted successfully!`
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
                text: `User ${dataUpdate?.data?.active ? "activated" : "inactivated"} successfully!`
            })
        }
    }, [isUpdateSuccess, dataUpdate])

    const handleDelete = async (id, name) => {
        let confirmed = await confirm({ title: "Delete User", text: `Are you sure you want to delete "${name}" user?` })
        if (confirmed) submit(id)
    }

    const handleToggleStatus = async (id, name, active) => {

        let confirmed = await confirm({ title: `${active ? "Inactivate" : "Activate"} User`, text: `Are you sure you want to ${active ? "inactivate" : "activate"} "${name}" user?` })

        let payload = {
            active: !active
        }

        if (confirmed) {
            update({ id, payload })
        }

    }

    const COLUMNS = [
        {
            label: 'User Profile',
            render: (row) => <ProfileViewer name={row?.name} email={row?.email} picture={row?.image_url} />
        },
        {
            label: 'Phone',
            render: (row) => <p>{row?.dialing_code} {row?.phone}</p>
        },
        {
            label: 'Gender',
            key: "gender",
            capitalize: true
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
                    // onEdit={() => handleAddEdit(row)}
                    // onDelete={() => handleDelete(row.id, row.name)}
                    onView={() => navigate(`/users/${row._id}`)}
                    onToggleStatus={() => handleToggleStatus(row._id, row.name, row.active)}
                    active={row.active}
                />
            )
        }
    ]

    return {
        values: {
            columns: COLUMNS,
            data: data?.data || [],
            isLoading
        },
        functions: {
            onSearch: setSearch
        }
    }

}

export default useViewEmployeesController