const AWS = require('aws-sdk');
const config = require('../cf-output');

AWS.config.update({ region: config.region });

const db = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const getTable = () => ({ TableName: config.DbTableName });

module.exports = {
    db,
    getTable
};