const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const REGION = process.env.AWS_REGION || 'ap-south-1';

const client = new DynamoDBClient({
  region: REGION
  // Credentials are picked from env: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
});

const ddbDocClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true
  }
});

module.exports = ddbDocClient;
