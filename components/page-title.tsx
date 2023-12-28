import React from 'react';

const PageTitle = ({title}: {title: string}) => {
    return (
        <h1 className={"text-4xl font-bold text-center mb-10"}>
            {title}
        </h1>
    );
};

export default PageTitle;
