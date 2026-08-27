import { useNavigate } from "react-router-dom"
import { useGetNotificationsQuery } from "../../redux/Apis/Notification"

const useNotificationsController = () => {

    const navigate = useNavigate()

    const { data, isLoading } = useGetNotificationsQuery()

    const onClickNotification = (data) => {
        if (data?.notification?.data?.admin_panel_route) {
            navigate(data?.notification?.data?.admin_panel_route)
        }
    }

    return {
        values: {
            data: data?.data || [],
            isLoading
        },
        functions: {
            onClickNotification
        }
    }
}

export default useNotificationsController