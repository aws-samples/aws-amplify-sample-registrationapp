import React from "react";

function PageTitle({children}) {
    return (
        <h1 className="mb-4 mt-2 ml-2 text-4xl font-bold dark:text-gray-200">
            {children}
        </h1>
    );
}

export default PageTitle;
