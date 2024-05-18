const constants = require("../utils/constants");

const topratedSchema = {
  TableName: constants.TOP_RATED_TABLE,
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'createdAt', AttributeType: 'S' } // Use 'S' for string data type
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH', // Partition Key
    },
    {
      AttributeName: 'createdAt',
      KeyType: 'RANGE', // Sort Key
    }
  ],
};

module.exports = topratedSchema;