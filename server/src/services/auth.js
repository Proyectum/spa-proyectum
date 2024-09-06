const logger = require('../utils/logger')
const configuration = require("../utils/config");
const { authClient } = require("../utils/clients");
const e = require("express");

const baseUrl = configuration.clients.auth.baseUrl;

const AUTH_HEADERS = {
    user : 'X-Auth-User',
    email : 'X-Auth-Email',
    scopes : 'X-Auth-Scopes',
}

const validationToken = async () => {
    try {
        const response = await authClient.get(`/validation`);
        const user = response.headers.get(AUTH_HEADERS.user);
        const email = response.headers.get(AUTH_HEADERS.email);
        const scopesStr = response.headers.get(AUTH_HEADERS.scopes);
        const scopes = scopesStr.split(",");
        return {
            username : user,
            email : email,
            scopes : scopes,
        }
    } catch (err) {
        console.error('Validation error:', err);
        throw new Error("Unable to authenticate token");
    }
}

const signUp = async (username, email, password) => {
    try {
        const response = await authClient.post(`/sign-up`, { username, email, password });
        const { token } = response.data;
        return token;
    } catch (err) {
        console.error('Sign In Error:', err);
        throw new Error("Something went wrong");
    }
}

const signIn = async (identifier, password) => {
    try {
        const response = await authClient.post(`/sign-in`, { username: identifier, password });
        const { token } = response.data;
        return token;
    } catch (err) {
        console.error('Sign In Error:', err);
        throw new Error("Something went wrong");
    }
}

module.exports = {
    validationToken,
    signUp,
    signIn
}