import React from 'react';
import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Eye, MessageCircle} from "lucide-react";
import {Post} from "@prisma/client";
import {PostWithCat} from "@/types";

type Props = {
    post: PostWithCat
}
const PostCard = ({post}: Props) => {
    return (
        <Link href={`/posts/${post.slug}`}>
            <Card className={"flex flex-col justify-between rounded-lg border-2 h-[100%]"}>
                <CardHeader>
                    <div className={"aspect-square relative"}>
                        <Image src={post.image || "/img/hero.jpg"} alt={post.title} fill className={"aspect-square object-cover transition-all duration-300 hover:scale-110"} />
                    </div>
                    <p className={"font-semibold text-lg mt-3"}>{post.title}</p>
                </CardHeader>
                <CardContent>
                    <Badge variant={"outline"}>{post.cat.title}</Badge>
                </CardContent>
                <CardFooter>
                    <div className={"flex gap-2"}>
                        <div className={"flex items-center gap-1"}>
                            <MessageCircle size={20} className={"text-slate-500"}/>
                            <p className={"text-slate-500"}>{post.nbComments}</p>
                        </div>
                        <div className={"flex items-center gap-1"}>
                            <Eye size={20} className={"text-slate-500"}/>
                            <p className={"text-slate-500"}>{post.view}</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default PostCard;
