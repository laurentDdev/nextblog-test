import {useQuery} from "react-query";
import axios from "axios";

export const usePosts = ( slug: string | null = null) => {
    return useQuery("posts", async () => {
        const { data } = await axios.get(`/api/posts?cat=${slug}`)
        return data;
    })
}
