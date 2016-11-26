'use strict';

document.addEventListener('DOMContentLoaded', function () {

	$.getJSON('/companies', function (data) {
		console.log(data);
	});

	var companyList = JSON.parse(document.getElementById("companyList").childNodes[0].data);

	function removeElem (event) {
		document.getElementById('companies-list').removeChild(this);
	}

	function loadCompanies () {
		companyList.forEach(function (company, index) {
			var content = document.querySelector('#company-item-template').content;
			
			content.querySelector('.name').textContent = company.company;
			content.querySelector('.description').textContent = company.description;
			content.querySelector('.email').textContent = company.email;
			content.querySelector('.url').textContent = company.url;
			content.querySelector('.country').textContent = company.country;

			document.querySelector('#companies-list').appendChild(
				document.importNode(content, true)
			);
			
			document.getElementsByClassName('company')[index].addEventListener('click', removeElem);
		});
	}

	loadCompanies();
});