const report = require('../controllers/report.controllers.js');
module.exports = function(app){

    app.post('api/report', report.createReport);
    app.get('api/report/:id', report.getReport);
    app.get('api/report/' , report.reports);
    app.delete('api/report/:id', report.deleteReport);
}