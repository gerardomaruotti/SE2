/**
 * All the API calls
 */

const URL = 'http://localhost:3001/api';

function getServices() {
    // call  /api/services
    return new Promise((resolve, reject) => {
        fetch(URL + '/services')
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((services) => resolve(services))
                        .catch(() => { reject({ error: "Cannot parse server response." }) });
                } else {
                    // analyze the cause of error
                    response.json()
                        .then((message) => { reject(message); }) // error message in the response body
                        .catch(() => { reject({ error: "Cannot parse server response." }) });
                }
            }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
}


const API = {
    getServices
};
export default API;