'use strict';

var companiesList = require('./listing.json');

function getCompaniesService (req, res) {
	res.send(companiesList);
}

module.exports = getCompaniesService;