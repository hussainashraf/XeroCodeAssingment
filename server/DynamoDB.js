const AWS = require('aws-sdk');

// Configure AWS credentials and region
AWS.config.update({
  accessKeyId: '/',
  secretAccessKey: '/',
  region: 'ap-south-1' // Change to your desired region
});

// Create an instance of the DynamoDB Document Client
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: 'userData',
  Item: {
    'email' : {S:'hussainashraf112@gmail.com'},
    'CUSTOMER_NAME' : {S: 'fdgdfg'},
    'CUSTOMER_PASSWORD' : {S: 'jansdjqind2912y812y@a'}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
  } else {
    console.log("Success Data Inserted Successfully", data);
  }
});

