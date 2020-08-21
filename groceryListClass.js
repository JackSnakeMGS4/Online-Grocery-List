class MasterGroceryList{
	constructor(){
		this.allListContainers = document.getElementsByClassName("grocery-list-container");
		this.groceryLists = {};
		this.listNames = [];
	}

	loadGroceryLists(listContainers){
		for(let i = 0; i < listContainers.length; i++){
			this.listNames.push(listContainers[i].getAttribute('name'));
			this.groceryLists[this.listNames[i]] = {list: listContainers[i].children};
		}
		this.listNames.sort();
	}

	addEventsToBtnsAndNameFields(){
		for(let i = 0; i < this.listNames.length; i++){
			let currentButton = document.getElementById(`${this.listNames[i]}Btn`);
			currentButton.addEventListener('click', this.addGroceryItem);

			let currentNameLabel = document.querySelector(`#${this.listNames[i]}Btn + label  input[type=text]`);
			currentNameLabel.addEventListener('change',this.editGroceryName);

			this.groceryLists[this.listNames[i]].button = currentButton;
			this.groceryLists[this.listNames[i]].inputLabel = currentNameLabel;
		}
	}

	addGroceryItem(e){
		console.log(this);
		let groceryToAdd = document.querySelector(`#${this.getAttribute('id')} + label  input[type=text]`).getAttribute('value');
		console.log(`Adding ${groceryToAdd}`);
		// compare the calling element's id's first 3-5 letters to the list names found in listNames[]
		// if a match is found then use the matching list name from listNames to access the corresponding groceryList HTML collection
		// add new label and input of type text to the HTML file
		// save the new item into the HTML collection
	}

	editGroceryName(e){
		// console.log(this, e.target.value);
		this.setAttribute('value', e.target.value);
	}
}