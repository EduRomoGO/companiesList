'use strict';

const removeCompanyModal = require('./removeCompanyModal.js');

function fillTemplate ({companyTemplate, company}) {
	companyTemplate.querySelector('.name').textContent = company.company;
	companyTemplate.querySelector('.description').textContent = company.description;
	companyTemplate.querySelector('.email').textContent = company.email;
	companyTemplate.querySelector('.url').textContent = company.url;
	companyTemplate.querySelector('.country').textContent = company.country;
}

function appendAndStampTemplate ({companyTemplate}) {
	document.querySelector('#companies-list').appendChild(
		document.importNode(companyTemplate, true)
	);
}

function createCompanyDomElement (company, index) {
	const companyTemplate = document.querySelector('#company-item-template').content;

	fillTemplate({companyTemplate, company});
	appendAndStampTemplate({companyTemplate});
	document.getElementsByClassName('company')[index].setAttribute('data', company.company);
	document.getElementsByClassName('company')[index].addEventListener('click', removeCompanyModal.displayConfirmation);
}

function createCompanyListDomElements (companyList) {
	companyList.forEach(createCompanyDomElement);
}


function loadCompanies () {
	$.getJSON('/companies', createCompanyListDomElements);
}


module.exports = loadCompanies;