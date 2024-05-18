// Validate incomming request body payload with the previous db schema
const validatePayload = (payload, schema) => {
    for (const key in schema) {
      const expectedType = schema[key];
      const actualType = typeof payload[key];
  
      if (actualType !== expectedType) {
        throw new Error(`Validation error: ${key} should be of type ${expectedType}`);
      }
    }
  };
  
  module.exports = { validatePayload };
  