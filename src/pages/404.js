import React from 'react'

function Page404() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1>
            <p className="text-gray-700 dark:text-gray-300">
                Page not found. Check the address or{' '}
                <a className="text-green-600 hover:underline dark:text-green-300" href="/">
                    go back
                </a>
                .
            </p>
        </div>
    )
}

export default Page404
