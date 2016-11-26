'use strict';

function removeElem (event) {
	document.getElementById('companies-list').removeChild(this);
}

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

function loadCompanies () {

	$.getJSON('/companies', function (companyList) {

		companyList.forEach(function (company, index) {
			var companyTemplate = document.querySelector('#company-item-template').content;

			fillTemplate({companyTemplate, company});

			appendAndStampTemplate({companyTemplate});
			
			document.getElementsByClassName('company')[index].addEventListener('click', removeElem);
		});

	});
}


document.addEventListener('DOMContentLoaded', function () {
	loadCompanies();
});