const url = "http://host.docker.internal:3000/callback?session_state=df87c387-26ef-4a7a-a6d3-8f777d09b118&iss=http%3A%2F%2Flocalhost%3A8080%2Frealms%2Ffullcycle-realm&code=74d39741-877f-49d7-bea4-aa9c7dd2e612.df87c387-26ef-4a7a-a6d3-8f777d09b118.b3d42f52-d89f-4a80-9226-c8095738a9bd";

const request1 = fetch(url);
const request2 = fetch(url);


Promise
    .all([request1, request2])
    .then(async (responses) => {
        return Promise.all(responses.map(response => response.json()));
    })
    .then((jsons) => console.log(jsons));