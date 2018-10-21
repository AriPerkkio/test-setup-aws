const generateRequest = config =>
    fetch(`/api/generic-data?time=${new Date().getTime()}`, config)
        .then(resp => resp.json());

const TestApi = ({
    authToken
}) => {
    const config = body => ({
        headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: body ? 'POST' : 'GET',
        body: body ? JSON.stringify(body) : undefined
    });

    return {
        get: () => generateRequest(config()),
        post: body => generateRequest(config(body))
    };
};

export default TestApi;
