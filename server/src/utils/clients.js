const axios = require("axios");
const configuration = require("./config");
const logger = require("./logger");
const {getAuthToken} = require("./storage");

const authenticationInterceptor = (config) => {

    if (config.url.includes("/sign-in")) {
        return config;
    }

    if (config.url.includes("/sign-up")) {
        return config;
    }

    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}

const loggerRequestInterceptor = (config) => {
    logger.info(`Request outgoing ${config.request.method} - ${config.request.path}`);
    return config
}

const authClient = axios.create({
    baseURL: configuration.clients.auth.baseUrl
})

authClient.interceptors.request.use(authenticationInterceptor);
authClient.interceptors.response.use(loggerRequestInterceptor);

const profileClient = axios.create({
    baseURL: configuration.clients.profile.baseUrl
})

profileClient.interceptors.request.use(authenticationInterceptor);
profileClient.interceptors.response.use(loggerRequestInterceptor);

module.exports = {
    authClient,
    profileClient
}
