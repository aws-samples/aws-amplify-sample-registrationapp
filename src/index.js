import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {Windmill} from '@windmill/react-ui'

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";

import './assets/css/tailwind.output.css'
import App from './App'
import ThemedSuspense from './components/ThemedSuspense'

Amplify.configure(awsExports);

ReactDOM.render(
    <Suspense fallback={<ThemedSuspense/>}>
        <Windmill usePreferences>
            <App/>
        </Windmill>
    </Suspense>,
    document.getElementById('root')
)
