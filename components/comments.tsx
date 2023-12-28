"use client";
import React, {SyntheticEvent} from 'react';
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import {useMutation} from "react-query";
import {useComments} from "@/hooks/useComments";
import {Comment} from "@prisma/client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CommentWithUser} from "@/types";

const Comments = ({
                      postSlug
                  }: {postSlug: string}) => {
    const [content, setContent] = React.useState("");

    const {data: session,status} = useSession()

    const createComment = (newComment: Partial<Comment>) => {
       return  axios.post("/api/comments", newComment).then((res) => res.data)
    }

    const {mutate, isLoading} = useMutation(createComment, {
        onSuccess: (data: Comment) => {
            setContent("")
        }
    })

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        // @ts-ignore
        mutate({content, postSlug})
    }

    const {data: comments, isFetching} = useComments(postSlug)

    return (
        <div className={"mt-10"}>
            <Separator />
            <h2 className={"text-2xl text-slate-500 font-semibold mt-4"}>Comments</h2>

            <div className={"mt-2 mb-6"}>
                {
                    status === "authenticated" ? (
                        <div className={""}>
                            <Textarea placeholder={"Any comment ?"} onChange={(e) => setContent(e.target.value)} />
                            <Button disabled={content == "" || isLoading} onClick={onSubmit} className={"mt-4"} >
                                {isLoading ? "Adding your comment" : "Add your comment"}
                            </Button>
                        </div>
                    ) : (
                        <Link href={"/login"}   className={"underline"} >
                            Login to write a comment
                        </Link>
                    )
                }
            </div>

            {/* List comments */}

            { isFetching ? <p>Loading content</p> : comments.map((comment: CommentWithUser) => (
                <div className={"flex items-center"} key={comment.id}>
                    <Avatar >
                        <AvatarImage src={comment.user.image || "/img/shadcn.jpg"} />
                        <AvatarFallback>{comment.user.name}</AvatarFallback>
                    </Avatar>

                    <div className={"ml-3 p-4 border rounded-lg border-slate-400"}>
                        <div className={"flex items-center gap-2"}>
                            <span>{comment.user.name}</span>
                            <span className={"text-slate-500 text-sm"}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p>{comment.content}</p>
                    </div>



                </div>
            ))}
        </div>
    );
};

export default Comments;
