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

			/*this.groceryLists[this.listNames[i]]
				.checkboxes = [...document.querySelectorAll(`input[name='${this.listNames[i]}[]']`)];*/
		}
		this.listNames.sort();

		// This is brute force code; needs to be optimized later if possible
		for(let i = 0; i < this.listNames.length; i++){
			for(let j = 0; j < this.groceryLists[this.listNames[i]].list.length; j++){
				this.setCheckboxEvents(this.groceryLists[this.listNames[i]].list[j].firstElementChild);
			}
		}
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
		let groceryToAdd = document.querySelector(`#${this.getAttribute('id')} + label  input[type=text]`).getAttribute('value');

		if(groceryToAdd != "" && groceryToAdd != null){
			let charSeqToMatch = this.getAttribute('id');
			let indexOfBtn = charSeqToMatch.indexOf('B');
			charSeqToMatch = charSeqToMatch.slice(0, indexOfBtn);

			let categoryName = MASTERGROCERYLIST.getListName(charSeqToMatch, indexOfBtn);

			let newLabel = document.createElement('LABEL');
			let newInput = document.createElement('INPUT');
			let newText = document.createTextNode(`${groceryToAdd}`);

			newInput.setAttribute('type', 'checkbox');
			newInput.setAttribute('name', `${categoryName}[]`);
			newInput.setAttribute('value', `${groceryToAdd}`);

			newLabel.appendChild(newInput);
			newLabel.appendChild(newText);

			MASTERGROCERYLIST.setCheckboxEvents(newLabel.firstElementChild);
			document.querySelector(`div[name=${categoryName}]`).appendChild(newLabel);
			// MASTERGROCERYLIST.groceryLists[categoryName].checkboxes.push(newInput);
		}
	}

	editGroceryName(e){
		this.setAttribute('value', e.target.value);
	}

	removeGroceryItem(e){
		// console.log(e.target, e.target.parentElement.innerText);
		if(e.target.checked === true){
			// console.log('Removing Item');
			// There's a lot of cool things you can try instead of just removing the item from the list
			// Maybe playing a small animation highlighting the item
			// then just adding a line-through effect to the innerText and leaving the item on the list
			e.target.parentElement.remove();
		}
	}

	getListName(charSeq, index){
		return this.listNames.filter(a => a.slice(0,index) === charSeq);
	}

	setCheckboxEvents(element){
		element.addEventListener('click', this.removeGroceryItem);
	}
}