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

		let charSeqToMatch = this.getAttribute('id').slice(0,4);
		// console.log(charSeqToMatch);
		let categoryName = MASTERGROCERYLIST.getListName(charSeqToMatch);
		// console.log(categoryName);

		let newLabel = document.createElement('LABEL');
		newLabel.innerHTML = `<input type='checkbox' name='${categoryName}[]' value='${groceryToAdd}'>${groceryToAdd}`;
		document.querySelector(`div[name=${categoryName}]`).appendChild(newLabel);

		// Still need to update groceryLists in code to reflect the changes from adding an item to the html doc
	}

	editGroceryName(e){
		// console.log(this, e.target.value);
		this.setAttribute('value', e.target.value);
	}

	getListName(charSeq){
		return this.listNames.filter(a => a.slice(0,4) === charSeq);
	}
}