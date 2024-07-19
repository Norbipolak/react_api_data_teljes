const l = window.location;
const protocol = l.protocol;
const host = l.host;
const port = l.port;
const path = l.path;
const baseUrl = `${protocol}//${host}:${port}`;
//ez visszaad egy basic url-t, ahol vagyunk éppen!!!!!!! 

export {protocol, host, port, path, baseUrl};