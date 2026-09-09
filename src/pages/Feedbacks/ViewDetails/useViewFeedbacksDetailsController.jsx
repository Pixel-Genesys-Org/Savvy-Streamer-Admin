import { useParams } from "react-router-dom"
import { useGetFeedbackByIdQuery } from "../../../redux/apis/Feedbacks"

const useViewFeedbacksDetailsController = () => {

    const { id } = useParams()
    const { data, isLoading } = useGetFeedbackByIdQuery(id)

    return {
        values: {
            data: data?.data || [],
            isLoading
        }
    }

}

export default useViewFeedbacksDetailsController