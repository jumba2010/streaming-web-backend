const {flattenAttributes}=require('../utils/DynamoDBUpdaterUtil');
const constants = require('../utils/constants')
const crudService =require('../services/crudService');
const {getCurrentDateTime}=require('../utils/DatetimeUtils');
const { marshall } = require('@aws-sdk/util-dynamodb');

const { v4: uuidv4 } = require('uuid');

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromEnv } = require("@aws-sdk/credential-provider-env");

const {
  PutItemCommand,
} = require('@aws-sdk/client-dynamodb');

const dynamoDBClient = new DynamoDBClient({
  credentials: fromEnv(),
  region: process.env.C_AWS_REGION,
});


exports.handler = async (event) => {
  const records = event.Records;
  records.forEach((record) => {
    const eventName = record.eventName;
    const newImage = record.dynamodb.NewImage || {};
    const oldImage = record.dynamodb.OldImage || {};
    const arn = record.eventSourceARN;
    const tableName = extractTableNameFromArn(arn);

    switch (eventName) {
      case 'INSERT':
        console.log('Something was inserted','NEW IMAGE:',JSON.stringify(newImage))
        handleInsert(newImage,tableName);
        break;

      case 'MODIFY':
        console.log('Something was updated','OLD IMAGE',JSON.stringify(oldImage),'NEW IMAGE:',JSON.stringify(newImage))
        handleModify(oldImage,newImage,tableName);
        break;

      case 'REMOVE':
        console.log('Something was deleted','NEW IMAGE:',JSON.stringify(oldImage))
        handleRemove(oldImage,tableName);
        break;

      default:
        console.log(`Unsupported event type: ${eventName}`);
    }
  });
};

function identifyChanges(oldImage, newImage) {
  const changes = [];

  for (const attributeName in newImage) {
    if (newImage.hasOwnProperty(attributeName)) {
      const oldAttributeValue = oldImage[attributeName];
      const newAttributeValue = newImage[attributeName];

      if (JSON.stringify(oldAttributeValue) !== JSON.stringify(newAttributeValue)) {
        changes.push({
          attributeName,
          oldValue: oldAttributeValue,
          newValue: newAttributeValue,
        });
      }
    }
  }

  return changes;
}

async function handleInsert(newImage,tableName) {

  // Extracting attributes for createdAt, createdBy, and details
  let insertedPayload = flattenAttributes(newImage);

  const userI = insertedPayload.createdBy;
  const sucursalId = insertedPayload.sucursalId;
  
  const details = extractRelevantAttributes(insertedPayload, relevantAttributes[tableName]);

  // Compose a new object
  const payload = {
    operation:'INSERT',
    tableName:'AUTO_CAR_PART',
    userI:'23232342',
    sucursalId:'3212342343444'
  };
 

  try {
    payload.id = await uuidv4();
    payload.active = 1;
    payload.createdAt = getCurrentDateTime();

    let newPayload =removeEmpty(payload)

    const params = {
      TableName:'AUTO_AUDIT',
      Item: marshall(newPayload),
    };
    console.log('About to insert 50 ','region',process.env.C_AWS_REGION,'PArams:', params)
    const command = new PutItemCommand(params);
    console.log('About to insert 100 ','region',process.env.C_AWS_REGION,'PArams:', params)
    await dynamoDBClient.send(command);
    console.log('After insert ',params)
  } catch (error) {
    console.log(error);
    throw error;
  }

  // await crudService.create(constants.AUDIT_TABLE,payload);

  console.log(`${tableName} Inserted` );
}

// Helper function to extract table name from ARN
function extractTableNameFromArn(arn) {
  const arnParts = arn.split(':');
  return arnParts[arnParts.length - 2].split('/')[1];
}

// Helper function to extract relevant attributes based on a map
function extractRelevantAttributes(item, relevantAttributesMap) {
  const details = {};

  for (const attributeName in relevantAttributesMap) {
    if (relevantAttributesMap.hasOwnProperty(attributeName) && item.hasOwnProperty(attributeName)) {
      details[attributeName] = item[attributeName];
    }
  }

  return details;
}

async function handleModify(oldImage, newImage,tableName) {

  const changes = identifyChanges(oldImage, newImage);
  const userI = newImage.updatedBy;
  const sucursalId = oldImage.sucursalId;

  console.log(changes,userI,sucursalId)
     // Compose a new object
     const payload = {
      operation:'MODIFY',
      tableName:'AUTO_CAR_PART',
      userI,
      sucursalId,
      details:{changes}
    };

    const payload2 = {
      operation:'MODIFY',
      tableName:'AUTO_CAR_PART',
      userI:'NoUser',
      sucursalId:'32123423423'
    };

    console.log('To be inserted3:',payload2)
    
  crudService.create(constants.AUDIT_TABLE,payload2)
  .then( data => {
    console.log(`${tableName} updated` );
  })
  .catch( err =>{
    console.log(err); 
  });
  
}

async function handleRemove(oldImage,tableName) {
  
    let deletedPayload = flattenAttributes(oldImage);
    const userId = oldImage.createdBy;
    const sucursalId = oldImage.sucursalId;
    
    const details = extractRelevantAttributes(deletedPayload, relevantAttributes[tableName]);
  
    // Compose a new object
    const payload = {
      operation:'REMOVE',
      tableName,
      userId,
      details,
      sucursalId
    };
  
  await crudService.create(constants.AUDIT_TABLE,payload);
  console.log(`${tableName} deleted` );
}

const removeEmpty = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
    else if (obj[key] !== undefined && obj[key] !== '') newObj[key] = obj[key];
  });
  return newObj;
};



// Map specifying relevant attributes for each table
const relevantAttributes = {
  'AUTO_CAR_PART': [
    'name',
    'id',
    'code'
  ],

  'AUTO_USER': [
    'name',
    'email',
  ],
  'AUTO_ORDER': [
    'code',
    'items',
  ],

  'AUTO_PROMOTION': [
    'code',
    'name',
    'percentage'
  ],

  'AUTO_REVIEW': [
    'user',
    'rating',
    'comment'
  ],

  'AUTO_WISH_LIST': [
    'product'
  ]
};
