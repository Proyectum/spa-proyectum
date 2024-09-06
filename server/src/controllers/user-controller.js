const {getProfile} = require("../services/profile");
exports.getUserProfile = async (req, res) => {
    const { username } = req.user
    const profile = await getProfile(username)
    res.status(200).json(profile);
};