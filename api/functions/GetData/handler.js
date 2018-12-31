const { db, getTable } = require('../utils');

module.exports.getData = async event =>
    await getData(event)
        .then(parseQueryResult)
        .then(onSuccess)
        .catch(onFailure);

const parseRequest = event => ({
    userId: event.requestContext.authorizer.claims.sub,
});

const parseQueryResult = ({ Items }) => Items.map(({ key, value, unit }) => ({
    key: key.S,
    value: value.S,
    unit: unit.S
}));

const getData = event => new Promise((resolve, reject) => {
    try {
        const { userId } = parseRequest(event);
        const item = generateQueryParams(userId);

        db.query(item, (err, result) =>
            err ? reject(err) : resolve(result));
    } catch (e) {
        reject(e.message);
    }
});

const generateQueryParams = userId => ({
    ...getTable(),
    ExpressionAttributeValues: {
        ":v1": { S: userId }
    },
    KeyConditionExpression: 'userId = :v1'
});

const onSuccess = data => ({
    statusCode: 200,
    body: JSON.stringify({
        data,
        timestamp: new Date().toString()
    })
});

const onFailure = error => ({
    statusCode: 500,
    body: JSON.stringify({
        error,
        timestamp: new Date().toString()
    })
});