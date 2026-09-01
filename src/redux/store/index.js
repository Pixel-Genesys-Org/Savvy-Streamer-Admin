import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import errorLogger from "../../middlewares/apierror.middleware";
import successLogger from "../../middlewares/apisuccess.middleware";
import { appointmentsApi } from "../apis/Appointment";
import { authApi } from "../apis/Auth";
import { disputeApi } from "../apis/Dispute";
import { feedbackApi } from "../apis/Feedbacks";
import { generalApi } from "../apis/General";
import { listingApi } from "../apis/Listing";
import { notificationApi } from "../apis/Notification";
import { packageApi } from "../apis/Package";
import { quizApi } from "../apis/Quiz";
import { userApi } from "../apis/User";
import { analyticsApi } from "../apis/Analytics";
import { contentApi } from "../apis/Content";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [quizApi.reducerPath]: quizApi.reducer,
        [listingApi.reducerPath]: listingApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [appointmentsApi.reducerPath]: appointmentsApi.reducer,
        [packageApi.reducerPath]: packageApi.reducer,
        [generalApi.reducerPath]: generalApi.reducer,
        [analyticsApi.reducerPath]: analyticsApi.reducer,
        [disputeApi.reducerPath]: disputeApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [contentApi.reducerPath]: contentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(quizApi.middleware)
            .concat(listingApi.middleware)
            .concat(userApi.middleware)
            .concat(feedbackApi.middleware)
            .concat(appointmentsApi.middleware)
            .concat(packageApi.middleware)
            .concat(generalApi.middleware)
            .concat(analyticsApi.middleware)
            .concat(disputeApi.middleware)
            .concat(notificationApi.middleware)
            .concat(contentApi.middleware)
            .concat(errorLogger)
            .concat(successLogger)
})

setupListeners(store.dispatch)