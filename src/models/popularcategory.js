const constants = require("../utils/constants");

const popularCategorySchema = {
  TableName: constants.POPULAR_CATEGORY_TABLE,
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

module.exports = popularCategorySchema;