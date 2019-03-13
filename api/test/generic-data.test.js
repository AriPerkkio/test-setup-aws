const fetch = require('node-fetch');

const URL = 'http://localhost:5000/api';
const ENDPOINT = '/generic-data';

const requestBody = {
    value: 'test-value',
    unit: 's',
    label: 'test-label',
};

describe('GetData', () => {
    beforeAll(async () => {
        // TODO clear possible previous records

        await fetch(URL + ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(requestBody),
        });
    });

    test('matches previous response', async () => {
        const response = await fetch(URL + ENDPOINT)
            .then(r => r.json())
            .catch(console.error);

        expect(response.data).toHaveLength(1);

        const [item] = response.data;
        const { time, ...result } = item;

        // Auto-generated timestamp expected to be 13 digit number.
        expect(time).toMatch(/^([0-9]{13})$/);

        expect(result).toMatchInlineSnapshot(`
Object {
  "label": "test-label",
  "unit": "s",
  "value": "test-value",
}
`);
    });
});
