import React from 'react'

function ErrorLabel({children}) {
    return (
        <div className="text-red-400 text-sm mt-1">
            {children}
        </div>
    )
}

export default ErrorLabel
