"use client";
import PageContainer from "@/components/page-container";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import PostsList from "@/components/posts-list";
import {usePosts} from "@/hooks/usePosts";
import {useCategories} from "@/hooks/useCategories";
import {Category} from "@prisma/client";


export default function Home() {

    const {data: posts, isFetching, error } = usePosts()
    const {data: categories, isFetching: isFetchingCategories, error: errorCategories } = useCategories()

  return (
      <PageContainer>
          <div className={"py-10 px-4"}>
              <div style={{backgroundImage: "url(/img/hero.jpg)"}} className={"rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"}>
                  <div className={"h-full w-full flex flex-col justify-center items-center"}>
                      <div className={"sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg"}>
                          <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white">Become A Better React Developper</h1>
                      </div>
                      <Input type={"email"} placeholder={"Email"} className={"dark:bg-white mt-4"}/>
                      <Button size={"lg"} className={"w-full py-6 text-xl mt-4"}>
                          Subscribe to our newsletter
                      </Button>
                  </div>
              </div>

              <div className={"mt-6 flex flex-col md:flex-row gap-4 justify-center items-center"}>
                  {!isFetchingCategories && categories.map((category: Category) => (
                      <Button variant={"outline"} key={category.id}>
                          <Link href={`/categories/${category.slug}`}>
                              {category.title}
                            </Link>
                      </Button>
                  ))}
              </div>

              {!isFetching && <PostsList posts={posts} />}
          </div>
      </PageContainer>
  )
}
