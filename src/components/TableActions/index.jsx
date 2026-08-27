import {
    CheckCircleIcon,
    CircleSlashIcon,
    EyeIcon,
    PencilLineIcon,
    Trash2Icon,
} from "lucide-react";
import { memo } from "react";
import Icon from "../Icon";

const TableActions = ({ onView, onEdit, onDelete, onToggleStatus, active, children = null }) => {
    return (
        <div className="flex items-center gap-2">
            {onView && (
                <Icon Icon={EyeIcon} onClick={onView} name={"View"} color="blue" />
            )}
            {onEdit && (
                <Icon Icon={PencilLineIcon} onClick={onEdit} name={"Edit"} color="yellow" />
            )}
            {onToggleStatus && (
                <Icon Icon={!active ? CheckCircleIcon : CircleSlashIcon} onClick={onToggleStatus} name={active ? "Mark Inactive" : "Mark Active"} color={!active ? "green" : "gray"} />
            )}
            {onDelete && (
                <Icon Icon={Trash2Icon} onClick={onDelete} name={"Delete"} color="red" />
            )}
            {children}
        </div>
    );
};

export default memo(TableActions);
