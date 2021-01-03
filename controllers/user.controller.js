exports.allAccess = function (req, res) {
    res.status(200).send("Public Content.");
};

exports.userBoard = function (req, res) {
    res.status(200).send("User Content.");
};

exports.adminBoard = function (req, res) {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = function (req, res) {
    res.status(200).send("Moderator Content.");
};