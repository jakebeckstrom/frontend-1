// Get API_STUB env variable from window, default to backup api stub otherwise
let backup_api_stub = 'http://localhost:8080/api';
const API_STUB = (window._env_ && window._env_.API_STUB) || backup_api_stub;

const throwIfNot200 = res => {
  if (res.status >= 200 && res.status < 300) {
    return Promise.resolve(res);
  }

  return Promise.reject(new Error(res.statusText));
};

const throwIfRepsonseNotSuccessful = res => {
  if (!res.success) {
    return Promise.reject(new Error(res.message));
  } else {
    return Promise.resolve(res);
  }
};

const convertToJSON = res => res.json();

const convertToText = res => res.text();

const logOnFailure = err => {
  console.error('Failure when communicating with API:');
  console.error(err);

  // throw so upstream can catch if they want to:
  throw err;
};

export const getTicketListing = () => {
  return fetch(`${API_STUB}/tickets`)
    .then(throwIfNot200)
    .then(convertToJSON)
    .then(throwIfRepsonseNotSuccessful)
    .catch(logOnFailure);
};

export const getTicket = ticketID => {
  return fetch(`${API_STUB}/tickets/${ticketID}`)
    .then(throwIfNot200)
    .then(convertToJSON)
    .then(throwIfRepsonseNotSuccessful)
    .catch(logOnFailure);
};

export const createTicket = body => {
  return fetch(`${API_STUB}/tickets`, {
    method: 'POST',
    body,
  })
    .then(throwIfNot200)
    .then(convertToJSON)
    .then(throwIfRepsonseNotSuccessful)
    .catch(logOnFailure);
};

export const getArtifactURL = (ticketId, filename) =>
  `${API_STUB}/tickets/${ticketId}/artifacts/${filename}`;

export const getArtifactListing = ticketId => {
  return fetch(`${API_STUB}/tickets/${ticketId}/artifacts`)
    .then(throwIfNot200)
    .then(convertToJSON)
    .then(throwIfRepsonseNotSuccessful)
    .catch(logOnFailure);
};

export const getArtifact = (ticketId, filename) => {
  return fetch(getArtifactURL(ticketId, filename))
    .then(throwIfNot200)
    .then(convertToText)
    .catch(logOnFailure);
};
