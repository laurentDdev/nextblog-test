
import {Category} from "@/types";
import {NextResponse} from "next/server";
import prisma from "@/lib/connect";
// const CATEGORIES : Category[] = [
//     {
//         id: 1,
//         name: "React",
//         slug: "react"
//     },
//
//     {
//         id: 2,
//         name: "Next.js",
//         slug: "nextjs"
//     },
//     {
//         id: 3,
//         name: "React Native",
//         slug: "react-native"
//     },
//     {
//         id: 4,
//         name: "CSS",
//         slug: "css"
//     },
//     {
//         id: 5,
//         name: "JavaScript",
//         slug: "javascript"
//     }
// ];

export const GET = async () => {
    try {
        // @ts-ignore
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, {status: 200})
    }catch (e) {
        return NextResponse.json({
            error: "Something went wrong"
        }, {status: 500})
    }
}
