const verifySignUp = require("../middleware/verifySignUp")
const controller = require("../controllers/auth.controller")
const { authJwt } = require("../middleware")

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUserNameOrEmail
        ],
        controller.signUp
    )

    app.get(
        "/api/auth/me",
        [authJwt.verifyToken],
        controller.Me
    )

    app.post(
        "/api/auth/signin",
        controller.signIn
    )
}