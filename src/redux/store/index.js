import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import errorLogger from "../../middlewares/apierror.middleware";
import successLogger from "../../middlewares/apisuccess.middleware";
import { appointmentsApi } from "../Apis/Appointment";
import { authApi } from "../Apis/Auth";
import { disputeApi } from "../Apis/Dispute";
import { feedbackApi } from "../Apis/Feedbacks";
import { generalApi } from "../Apis/General";
import { listingApi } from "../Apis/Listing";
import { notificationApi } from "../Apis/Notification";
import { packageApi } from "../Apis/Package";
import { quizApi } from "../Apis/Quiz";
import { userApi } from "../Apis/User";
import { analyticsApi } from "../Apis/Analytics";
import { contentApi } from "../Apis/Content";

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