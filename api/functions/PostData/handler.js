const { db, getTable } = require('../utils');

module.exports.postData = async event =>
    await addData(event)
        .then(onSuccess)
        .catch(onFailure);

const parseRequest = event => {
    const body = JSON.parse(event.body);
    const { value, unit, label, time } = body || {};

    return {
        userId: event.requestContext.authorizer.claims.sub,
        value,
        unit,
        label: label || 'default-label',
        time: time || new Date().getTime().toString(),
    };
};

const addData = event => new Promise((resolve, reject) => {
    try {
        const body = parseRequest(event);
        const item = generateItem(body);

        db.putItem(item, err =>
            err ? reject(err) : resolve(body));

    } catch (e) {
        reject(e.message);
    }
});

const generateItem = ({ userId, value, unit, label, time }) => ({
    ...getTable(),
    Item: {
        userId: { S: userId },
        value: { S: value },
        unit: { S: unit },
        label: { S: label },
        time: { S: time },
    }
});

const onSuccess = ({ userId, ...data }) => ({
    statusCode: 200,
    body: JSON.stringify({ data }),
});

const onFailure = error => ({
    statusCode: 500,
    body: JSON.stringify({ error }),
});