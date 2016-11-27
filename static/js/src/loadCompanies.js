'use strict';

function createRemoveConfirmationDomElement ({company}) {
	var	removeConfirmationTemplate = document.querySelector('#remove-confirmation-template').content,
		msg = 'Do you want to remove <b>' + company.attributes.data.value + '</b> company?';

	removeConfirmationTemplate.querySelector('.confirmation').innerHTML = msg;

	document.querySelector('#remove-confirmation-dest').appendChild(
		document.importNode(removeConfirmationTemplate, true)
	);
}

function removeConfirmationModal (modal) {
	var modal = modal || document.getElementsByClassName('remove-confirmation')[0];

    document.getElementById('remove-confirmation-dest').removeChild(modal);
}


function yesClick ({company}) {
	removeConfirmationModal();
    removeCompanyItem({company});	
}

function addListenersForConfirmationModal ({company}) {
	window.addEventListener('click', function(event) {
		var modal = document.getElementsByClassName('remove-confirmation')[0];

	    if (event.target == modal) {
	        removeConfirmationModal();
	    }
	});

	document.getElementsByClassName("close")[0].addEventListener('click', function () {
		removeConfirmationModal();
	});

	document.querySelector('.remove-confirmation-button').addEventListener('click', function () {
		yesClick({company});
	});
}

function displayConfirmation () {
	var company = this;
	console.log(this);

	createRemoveConfirmationDomElement({company});
	addListenersForConfirmationModal({company});
}

function removeCompanyItem ({company}) {
	var company = company || this;

	document.getElementById('companies-list').removeChild(company);
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

function createCompanyDomElement (company, index) {
	const companyTemplate = document.querySelector('#company-item-template').content;

	fillTemplate({companyTemplate, company});
	appendAndStampTemplate({companyTemplate});
	document.getElementsByClassName('company')[index].setAttribute('data', company.company);
	document.getElementsByClassName('company')[index].addEventListener('click', displayConfirmation);
}

function createCompanyListDomElements (companyList) {
	companyList.forEach(createCompanyDomElement);
}


function loadCompanies () {
	$.getJSON('/companies', createCompanyListDomElements);
}


module.exports = loadCompanies;