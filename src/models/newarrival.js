const constants = require("../utils/constants");

const newArrivalSchema = {
  TableName: constants.NEW_ARRIVALS_TABLE,
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'createdAt', AttributeType: 'S' } 
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH', 
    },
    {
      AttributeName: 'createdAt',
      KeyType: 'RANGE', 
    }
  ],
};

module.exports = newArrivalSchema;