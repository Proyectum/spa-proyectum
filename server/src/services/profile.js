const { profileClient } = require('../utils/clients');

const getProfile = async (username) => {
    try {
        const response = await profileClient.get(`/${username}/profile`)
        return response.data;
    } catch (err) {
        console.log("some error getting profile", err);
        throw new Error("Some error getting profile");
    }
}

module.exports = {
    getProfile,
}