module.exports.handler = async (event, context) => ({
    statusCode: 200,
    body: JSON.stringify({
        data: 'Response one',
        timestamp: new Date().toString(),
        user: event.requestContext.authorizer.claims['cognito:username']
    })
});