"use client";
import React from 'react';
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";

const ToggleTheme = () => {

    const {theme, setTheme} = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <Button className={"flex justify-center"} variant={"ghost"} size={"icon"} onClick={toggleTheme}>
            <Moon className={"h-6 w-6 scale-100 dark:scale-0"} />
            <Sun className={"h-6 w-6 scale-0 dark:scale-100"} />
        </Button>
    );
};

export default ToggleTheme;
