module.exports.postData = async (event, context) => {
    let statusCode = 200;
    let body;
    let error;

    try {
        const { userId, data } = parseRequest(event);
        body = {
            userId,
            data
        };
    } catch (e) {
        statusCode = 500;
        error = e;
    }

    if (error) {
        body.error = error;
    }

    return {
        statusCode,
        body: JSON.stringify({
            ...body,
            timestamp: new Date().toString()
        })
    };
};

const parseRequest = event => ({
    userId: event.requestContext.authorizer.claims.sub,
    data: JSON.parse(event.body)
});
