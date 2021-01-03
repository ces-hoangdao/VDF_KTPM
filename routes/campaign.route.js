const { authJwt } = require("../middleware")
const controller = require("../controllers/campaign.controller");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/campaigns/index", controller.index)

    app.get("/api/campaigns/indexMyCampaigns", [authJwt.verifyToken], controller.indexMyCampaigns)

    app.post("/api/campaigns/create", [authJwt.verifyToken], controller.create)

    app.get("/api/campaigns/show", controller.show)

    app.patch("/api/campaigns/update", [authJwt.verifyToken], controller.update)

    app.post("/api/campaigns/delete", [authJwt.verifyToken], controller.destroy)
}