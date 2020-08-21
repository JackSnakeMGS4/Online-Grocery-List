const MASTERGROCERYLIST = new MasterGroceryList();

window.onload = function(){
	// console.log('list.js loaded; window.onload; line 1');
	MASTERGROCERYLIST.loadGroceryLists(MASTERGROCERYLIST.allListContainers);
	MASTERGROCERYLIST.addEventsToBtnsAndNameFields();
}