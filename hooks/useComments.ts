import {useQuery} from "react-query";
import axios from "axios";

export const useComments = (postSlug: string) => {
    return useQuery("comments", async () => {
        const { data } = await axios.get(`/api/comments?slug=${postSlug}`)
        return data
    })
}
