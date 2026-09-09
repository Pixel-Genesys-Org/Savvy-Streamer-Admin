import { memo } from "react";
import Avatar from "../Avatar";

const ProfileViewer = ({ name = "", email = "", picture }) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar src={picture} name={name} />
      <div className="min-w-0">
        <h2 className="truncate text-sm font-medium text-white">{name}</h2>
        <p className="truncate text-sm text-muted">{email}</p>
      </div>
    </div>
  );
};

export default memo(ProfileViewer);
