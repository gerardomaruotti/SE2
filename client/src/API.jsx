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
					response
						.json()
						.then((services) => resolve(services))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function createTicket(service) {
	// call  POST /api/ticket
	return new Promise((resolve, reject) => {
		fetch(URL + `/ticket`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(service),
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((ticket) => resolve(ticket))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getCounters() {
	// call  /api/counters
	return new Promise((resolve, reject) => {
		fetch(URL + '/counter')
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((counters) => resolve(counters))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function deleteService(serviceId) {
	// call  DELETE /api/service
	return new Promise((resolve, reject) => {
		fetch(URL + `/services/${serviceId}/delete`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((service) => resolve(service))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

const API = {
	getServices,
	createTicket,
	getCounters,
	deleteService,
};
export default API;
