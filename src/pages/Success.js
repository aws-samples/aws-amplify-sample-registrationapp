import React from 'react'

import RegistrationFormCard from "../components/Cards/RegistrationFormCard";
import event from "../data/calendar-event";

// const { google, outlook, office365, yahoo, ics } = require("calendar-link");
const { ics } = require("calendar-link");

function Success() {
    return (
        <>
        <RegistrationFormCard>
           <div className="flex flex-col">
           <span className="my-6 ml-2 text-sm font-bold dark:text-gray-800">
              <h1 className="text-2xl my-4 dark:text-gray-200 mx-auto">Registration for learning how to develop a Serverless Full Stack Registration App in minutes using AWS Amplify.</h1>
            </span>
              <span className="text-4xl text-green-800">
              <a className="text-lg my-2 dark:text-blue-300 cursor-pointer dark:hover:text-blue-500" href={ics(event)}>Click and Add the event to your Calendar</a>
              </span>
           </div>
        </RegistrationFormCard>
     </>
    );
}

export default Success;
