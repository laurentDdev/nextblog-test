import React from 'react';
import {PostWithCat} from "@/types";
import PostCard from "@/components/post-card";


type Props = {
    posts: PostWithCat[]
}

const PostsList = ({posts}: Props) => {
    return (
        <div className={"gap-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
            {
                posts.map((post: PostWithCat) => (
                    <PostCard key={post.id} post={post}/>
                ))
            }
        </div>
    );
};

export default PostsList;
