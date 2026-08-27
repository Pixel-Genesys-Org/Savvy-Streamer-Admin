import { isFulfilled } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const successLogger = () => (next) => (action) => {

    if (isFulfilled(action)) {

        const show_success = action?.meta?.baseQueryMeta?.show_success
        const message = action?.meta?.baseQueryMeta?.message || action.payload?.message;

        if (show_success) {
            toast.success(message);
        }
    }

    return next(action);

};

export default successLogger