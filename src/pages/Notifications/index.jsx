import { dateFormatter } from "../../utils/helper"
import useNotificationsController from "./useNotificationsController"
import Loader from "../../components/Loader"

function NotificationCard({
    data,
    className = '',
    onClick
}) {
    return (
        <div className={`${className}`} onClick={onClick}>
            <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{data?.title}</h4>
                            <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{dateFormatter(data?.createdAt)}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-700 leading-6">{data?.message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Notifications = () => {

    const { values, functions } = useNotificationsController()

    return (
        <div className="grid gap-7">
            <h2 className="text-2xl font-semibold text-secondary">
                Notifications
            </h2>
            <div className="grid gap-2">
                {
                    values?.isLoading ? <Loader center size={48} /> :
                        values?.data?.length <= 0 ? <p className="text-center text-secondary font-medium mt-4">No Notifications Found</p> :
                            values?.data?.map(item => (
                                <NotificationCard data={item} className={`${item?.notification?.data?.admin_panel_route ? "cursor-pointer" : ""}`} onClick={() => functions.onClickNotification(item)} />
                            ))
                }
            </div>
        </div>
    )
}

export default Notifications