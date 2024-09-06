const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const merge = require('lodash.merge');

function loadYAMLConfig(filePath) {
    try {
        const fileContents = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
        return yaml.load(fileContents);
    } catch (e) {
        console.error(`Error loading configuration: ${filePath}`, e);
        throw e;
    }
}

const defaultConfig = loadYAMLConfig('../../configs/configmap.yml');
let profileConfig = {}
if (process.env.ENV !== undefined) {
    profileConfig = loadYAMLConfig(`../configs/configmap-${process.env.ENV}.yml`);
}

const configuration = merge({}, defaultConfig, profileConfig);

console.log("Configmap", configuration);

module.exports = configuration;