const constants = require("../utils/constants");

const popularProductSchema = {
  TableName: constants.POPULAR_PRODUCT_TABLE,
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

module.exports = popularProductSchema;