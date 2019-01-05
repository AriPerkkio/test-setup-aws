const generateRequest = config =>
    fetch('/api/generic-data', config)
        .then(resp => resp.json());

const config = ({ body, authToken }) => ({
    headers: {
        'X-Authorization': authToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined
});

const TestApi = authToken => ({
    get: () => generateRequest(config({ authToken })),
    post: body => generateRequest(config({ body, authToken }))
});

export default TestApi;