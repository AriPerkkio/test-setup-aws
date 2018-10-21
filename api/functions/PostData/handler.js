const { db, getTable } = require('../utils');

module.exports.postData = async event =>
    await addData(event)
        .then(onSuccess)
        .catch(onFailure);

const parseRequest = event => ({
    userId: event.requestContext.authorizer.claims.sub,
    value: JSON.parse(event.body).value
});

const addData = event => new Promise((resolve, reject) => {
    try {
        const { userId, value } = parseRequest(event);
        const item = generateItem(userId, value);

        db.putItem(item, (err, result) =>
            err ? reject(err) : resolve(result));
    } catch (e) {
        reject(e.message);
    }
});

const generateItem = (userId, value) => ({
    ...getTable(),
    Item: {
        userId: { S: userId },
        value: { S: value },
        key: { S: new Date().getTime().toString() }
    }
});

const onSuccess = data => ({
    statusCode: 200,
    body: JSON.stringify({
        ...data,
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