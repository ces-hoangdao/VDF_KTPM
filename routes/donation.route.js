const { authJwt } = require("../middleware")
const controller = require("../controllers/donation.controller");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/donation/index", controller.index)

    app.post("/api/donation/create", [authJwt.verifyToken], controller.create)

    app.get("/api/donation/show", controller.show)

    app.patch("/api/donation/update", [authJwt.verifyToken], controller.update)

    app.delete("/api/donation/delete", [authJwt.verifyToken], controller.destroy)
}