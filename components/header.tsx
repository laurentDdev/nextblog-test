import React from 'react';
import PageContainer from "@/components/page-container";
import {HeaderNavigation} from "@/components/header-navigation";
import ProfileButton from "@/components/ProfileButton";
import ResponsiveMenu from "@/components/responsive-menu";
import ToggleTheme from "@/components/toggle-theme";

const Header = () => {
    return (
        <header className={"p-4 border-b"}>
            <PageContainer>
                <div className={"flex items-center justify-between w-full"}>
                    <div className={"flex items-center gap-2"}>
                        <ResponsiveMenu/>
                        <h1 className={"text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600"}>NextBlog</h1>
                    </div>
                    <HeaderNavigation/>
                    {/*Button*/}

                    <div className={"flex items-center gap-2"}>
                        <ToggleTheme/>
                        <ProfileButton/>
                    </div>
                </div>
            </PageContainer>
        </header>
    );
};

export default Header;
