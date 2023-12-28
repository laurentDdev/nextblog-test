"use client";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import {Input} from "@/components/ui/input";
import {SyntheticEvent, useLayoutEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useCategories} from "@/hooks/useCategories";
import {Category, Post} from "@prisma/client";
import "react-quill/dist/quill.snow.css";


import {Button} from "@/components/ui/button";
import {useMutation} from "react-query";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {loading: () => <p> Loading... </p>,ssr: false})
const Page = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [catSlug, setCatSlug] = useState("")

    const [file, setFile] = useState<File>()
    const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null)

    const {data: categories, isFetching } = useCategories()
    const {data: session} = useSession()
    const router = useRouter()

    const createPost = (newPost: Partial<Post>) => axios.post("/api/posts", newPost).then(res => res.data)

    const {mutate, isLoading} = useMutation(createPost, {
        onSuccess: (data: Post) => {
            router.push(`/posts/${data.slug}`)
        }
    })



    useLayoutEffect(() => {
        if (!session) {
            router.replace("/login")
            return
        }
    }, [router, session])

    const onChangeFile = (e: SyntheticEvent) => {
        const files = (e.target as HTMLInputElement).files

        if (!files || !files[0]) {
            return
        }

        setFile(files[0])
        setImageObjectUrl(URL.createObjectURL(files[0]))
    }

    const uploadImage = async () => {
        try {
            if (!file) {
                return
            }
            const data = new FormData()
            data.set("file", file)

            const response = await axios.post("/api/upload", data)
            return response.data
        }catch (e) {
            console.log("Error uploading image", e)
        }
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const image = await uploadImage()
        console.log("image", image)

        if (title !== "" && content !== "" && catSlug !== "" && image ) {
            await mutate({
                title,
                content,
                catSlug,
                slug: title.trim().toLowerCase().replace(" ", "-"),
                image: image,
            })
        }
    }

    return (
        <PageContainer>
            <div className={"p-10"}>
                <PageTitle title={"Write a Post"} />

                <div className={"mb-6"}>
                    {imageObjectUrl && <div className={"relative w-40 h-40 mx-auto mb-2"}>
                        <Image src={imageObjectUrl} fill alt={title} />
                    </div>}
                    <Input type={"file"} name={"image"} onChange={onChangeFile} />
                </div>

                <Input type={"text"} placeholder={"Title"} className={"mb-6"}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {isFetching ?  <p>Loading catégories</p> :    <Select onValueChange={value => setCatSlug(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder={"Select a category"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category: Category) => (
                            <SelectItem key={category.id} value={category.slug}>
                                {category.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>}

                <ReactQuill
                    className={"mt-6"}
                    placeholder={"Content"}
                    value={content}
                    onChange={setContent}
                />

                <Button disabled={isLoading} className={"mt-6"} onClick={handleSubmit} >
                    {isLoading ? "Creating you article": "Publish"}
                </Button>

            </div>
        </PageContainer>
    );
};

export default Page;
