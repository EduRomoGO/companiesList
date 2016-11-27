'use strict';

function removeCompanyItem ({company}) {
	var company = company || this;

	document.getElementById('companies-list').removeChild(company);
}

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

module.exports = {
	displayConfirmation
};