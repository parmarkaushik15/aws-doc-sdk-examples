/*
   Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

   This file is licensed under the Apache License, Version 2.0 (the "License").
   You may not use this file except in compliance with the License. A copy of
   the License is located at

    http://aws.amazon.com/apache2.0/

   This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied. See the License for the
   specific language governing permissions and limitations under the License.
     
   ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
   https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-managing-visibility-timeout.html
*/

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION'});

// Create SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "QUEUE_URL";

var params = {
  AttributeNames: [
    "SentTimestamp"
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    "All"
  ],
  QueueUrl: queueURL
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else {
    var visibilityParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
      VisibilityTimeout: 36000 // 10 hour timeout
    };
    sqs.changeMessageVisibility(visibilityParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Timeout Changed", data);
      }
    });
  }
});
