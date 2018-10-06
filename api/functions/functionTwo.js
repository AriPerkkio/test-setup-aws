module.exports.handler = async (event, context) => ({
    statusCode: 200,
    body: JSON.stringify({
      data: 'Response two',
      timestamp: new Date().toString()
    })
});