let allListContainers = document.getElementsByClassName("grocery-list-container");
let groceryLists = {};

window.onload = function(){
	console.log('list.js loaded; window.onload; line 1');
	loadGroceryLists(allListContainers);
}

function loadGroceryLists(listContainers){
	let listNames = [];
	for(let i = 0; i < listContainers.length; i++){
		listNames.push(listContainers[i].children[0].name);
	}

	for(let i = 0; i < listNames.length; i++){
		groceryLists[listNames[i]] = listContainers[i].children[0].elements;
	}
}