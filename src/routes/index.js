import {lazy} from 'react'

const RegistrationForm = lazy(() => import("../pages/Registration"));
const Page404 = lazy(() => import('../pages/404'));
const Success = lazy(() => import('../pages/Success'));

//These are the app routes and their corresponding page to be displayed created via an array of objects.
//Each array object should have a path and corresponding component to display.
const routes = [
    {
        path: '/registration',
        component: RegistrationForm,
    },
    {
        path: '/404',
        component: Page404,
    },
    {
        path: '/success',
        component: Success,
    },
]

export default routes
