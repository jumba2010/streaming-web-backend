const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromEnv } = require("@aws-sdk/credential-provider-env");
const { S3Client } = require("@aws-sdk/client-s3");
const { SESClient } = require("@aws-sdk/client-ses");

const { CognitoIdentityProviderClient } =require("@aws-sdk/client-cognito-identity-provider");

// Create a DynamoDB client
const dynamoDBClient = new DynamoDBClient({
  credentials: fromEnv(),
  region: process.env.C_AWS_REGION,
});

// Create a S3 client 
const s3Client = new S3Client({ 
  credentials: fromEnv(),
  region: process.env.C_AWS_REGION
});

// Create a cognito client
const cognitoClient = new CognitoIdentityProviderClient({ 
  credentials: fromEnv(),
  region:  process.env.C_AWS_REGION
});

const sesClient = new SESClient({ 
  credentials: fromEnv(),
  region: process.env.C_AWS_REGION
});

module.exports={
  dynamoDBClient,
  s3Client,
  cognitoClient,
  sesClient
}



