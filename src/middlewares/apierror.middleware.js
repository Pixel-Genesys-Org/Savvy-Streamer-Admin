import { isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const errorLogger = () => (next) => (action) => {

    if (isRejectedWithValue(action)) {
        const errorMessage = action?.payload?.data?.message || action?.error?.message || 'Something went wrong';
        toast.error(errorMessage);
    }

    return next(action);

};

export default errorLogger