const { AsyncLocalStorage } = require('async_hooks');

const tokenKey = 'token';

const asyncLocalStorage = new AsyncLocalStorage();

const newStorageMiddleware = (req, res, next) => {
    asyncLocalStorage.run(new Map(), () => { next() })
}

const setAuthToken = (value) => {
    const store = asyncLocalStorage.getStore()
    store.set(tokenKey, value)
}

const getAuthToken = () => {
    const store = asyncLocalStorage.getStore();
    return store ? store.get(tokenKey) : null;
};

module.exports = {
    setAuthToken,
    getAuthToken,
    newStorageMiddleware
}