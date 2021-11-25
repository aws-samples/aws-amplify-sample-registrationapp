import React from "react";

function SectionTitle({children}) {
    return (
        <h1 className="mt-6 mb-5 text-2xl font-bold text-gray-900 dark:text-gray-200">
            {children}
        </h1>
    );
}

export default SectionTitle;
