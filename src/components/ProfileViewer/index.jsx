import { memo } from "react"
import Avatar from "../Avatar"

const ProfileViewer = ({ name = "", email = "", picture }) => {
    return (
        <div className="flex items-center space-x-3">
            <Avatar src={picture} name={name} />
            <div>
                <h2 className="text-sm font-medium text-gray-700">{name}</h2>
                <p className="text-sm text-gray-700">{email}</p>
            </div>
        </div>
    )
}

export default memo(ProfileViewer)