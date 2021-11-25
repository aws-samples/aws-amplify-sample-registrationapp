/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "blogregistration";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "email";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/users";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/************************************************************************************************************
* Function to generate unique ID for every user registration. 
* This method should be added to the generated code for the registration 
* application demo. 
************************************************************************************************************/
/*Starts here***********************************************************************************************/

//A Unique ID is generated for each user
function generateUID() {
  return (Math.floor(Math.random() * 10)).toString() + Date.now().toString();
}
/*Ends here***********************************************************************************************/

/***********************************************************************************************************
 * HTTP Get method for list objects *
 * This method should be replaced with the generated code for the registration 
 * application demo. This method is used for the email validation.
************************************************************************************************************/
/*Starts here***********************************************************************************************/

 app.get('/users', function (req, res) {
  console.log(req);

  let getItemParams = {
      TableName: tableName,
      IndexName : 'emailIndex',
      KeyConditionExpression: "email = :email ",      
       ExpressionAttributeValues: {         
          ":email": req.apiGateway.event.queryStringParameters.email
      }
  }
  
  dynamodb.query(getItemParams, (err, data) => {
      if (err) {
          res.statusCode = 500;
          res.json({error: 'Could not load item: ' + err.message});
      } else {
          if (data.Items) {
              res.json(data.Items);
          } else {
              res.json(data);
          }
      }
  });
});

/*Ends here***********************************************************************************************/


/*****************************************
 * HTTP Get method for get single object *
* This method is not required for the *
* registration application demo. *
* Please remove or block the code *
 *****************************************/

/**
app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});
**/

/************************************
* HTTP put method for insert object *
* This method is not required for the *
* registration application demo. *
* Please remove or block the code *
*************************************/
/**
app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});
**/

/************************************************************************************************************
* HTTP post method for insert object *
* This method should be replaced with the generated code for the registration 
* application demo. This method is used for generating, constructing and posting the registration form.
************************************************************************************************************/
/*Starts here***********************************************************************************************/
app.post(path, function (req, res) {
  var params = {
      TableName: tableName,
      Item: {
          id: generateUID(),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          countryCode: req.body.countryCode,
          countryName: req.body.countryName,
          state: req.body.state,
          city: req.body.city,
          postalCode: req.body.postalCode,
          phoneNumber: req.body.phoneNumber,        
          career: {
              interestFor: req.body.career.interestFor,
              jobTitle: req.body.career.jobTitle,
              companyName: req.body.career.companyName,
              jobRole: req.body.career.jobRole,
              industry: req.body.career.industry,
              companyType: req.body.career.companyType,
              companySize: req.body.career.companySize,
              awsUsage: req.body.career.awsUsage                
          }
      }
  }

  dynamodb.put(params, function (err, data) {
      if (err) res.json({err});
      else res.json({success: 'Registered Successfully!'})
  });
});
/*Ends here***********************************************************************************************/

/**************************************
* HTTP remove method to delete object *
* This method is not required for the *
* registration application demo. *
* Please remove or block the code *
***************************************/
/**
app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});
**/

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
