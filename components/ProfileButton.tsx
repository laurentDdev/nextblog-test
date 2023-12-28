"use client";
import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const ProfileButton = () => {
    const {data: session, status} = useSession()

    if (!session) {
        return (
            <Link href={"/login"}>
                <Button>

                    Login
                </Button>
            </Link>
        );
    }

    const onLogout = async () => {
        signOut()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={session.user?.image || "/img/shadcn.jpg"} />
                    <AvatarFallback>{session.user?.name}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onLogout()} className={"cursor-pointer"}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )


};

export default ProfileButton;
