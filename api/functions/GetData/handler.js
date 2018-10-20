module.exports.getData = async (event, context) => ({
    statusCode: 200,
    body: JSON.stringify({
        data: 'Response one',
        timestamp: new Date().toString(),
        event,
        context
    })
});