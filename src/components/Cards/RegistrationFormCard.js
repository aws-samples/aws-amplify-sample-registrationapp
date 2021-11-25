import React from 'react'

function RegistrationFormCard({children}) {
    return (
        <div className="px-4 py-2 mb-8 rounded-lg shadow-md dark:bg-gray-800 bg-blue-200">
            {children}
        </div>
    )
}

export default RegistrationFormCard
