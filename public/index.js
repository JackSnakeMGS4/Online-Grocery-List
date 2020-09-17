const MASTERGROCERYLIST = new MasterGroceryList();

document.addEventListener('DOMContentLoaded', event =>{

	MASTERGROCERYLIST.loadGroceryLists();
	MASTERGROCERYLIST.addEventsToBtnsAndNameFields();
});