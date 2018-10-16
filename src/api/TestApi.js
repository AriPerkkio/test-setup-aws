const generateRequest = resource => config => () =>
    fetch(`/api/${resource}`, config)
        .then(resp => resp.json());

const TestApi = ({
    authToken
}) => {
    const config = {
        headers: {
            'X-Authorization': authToken
        }
    };

    return {
        getOne: generateRequest('endpoint-one')(config),
        getTwo: generateRequest('endpoint-two')(config)
    };
};

export default TestApi;
