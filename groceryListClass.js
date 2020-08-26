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
		// this.listNames.sort();

		// This is brute force code; needs to be optimized later if possible
		for(let i = 0; i < this.listNames.length; i++){
			for(let j = 0; j < this.groceryLists[this.listNames[i]].list.length; j++){
				let trashIcon = this.groceryLists[this.listNames[i]]
									.list[j]
									.querySelector('.fa-trash-alt');

				this.setTrashEvents(trashIcon);
			}
		}
	}

	addEventsToBtnsAndNameFields(){
		for(let i = 0; i < this.listNames.length; i++){
			let currentButton = document.getElementById(`${this.listNames[i]}Btn`);
			currentButton.addEventListener('click', this.addGroceryItem);

			let currentNameLabel = document.querySelector(`#${this.listNames[i]}Btn + label input[type=text]`);
			currentNameLabel.addEventListener('change', this.editGroceryName);

			let currentQuantityInput = document.getElementsByName(`${this.listNames[i]}Quantity`)[0];
			currentQuantityInput.addEventListener('change', this.editGroceryQuantity);

			this.groceryLists[this.listNames[i]].button = currentButton;
			this.groceryLists[this.listNames[i]].inputLabel = currentNameLabel;
			this.groceryLists[this.listNames[i]].quantityInput = currentQuantityInput;
		}
	}

	addGroceryItem(e){
		let charSeqToMatch = this.id;
		let indexOfBtn = charSeqToMatch.indexOf('B');

		// slice off the Btn from the button's ID so we can match the grocery list by property I.E. meatsBtn becomes meats which can then be matched to groceryLists[meats]
		charSeqToMatch = charSeqToMatch.slice(0, indexOfBtn);
		let categoryName = MASTERGROCERYLIST.getListName(charSeqToMatch, indexOfBtn);

		let groceryToAdd = MASTERGROCERYLIST.groceryLists[charSeqToMatch].inputLabel.value;
		let quantity = MASTERGROCERYLIST.groceryLists[charSeqToMatch].quantityInput.value;;

		if((groceryToAdd != "" && groceryToAdd != null) &&
			(quantity != "" && quantity != null)){
			let newLabel = document.createElement('LABEL');
			let newInput = document.createElement('INPUT');
			let newText = document.createTextNode(`${groceryToAdd}`);

			let newQuantity = document.createElement('SPAN');
			let quantityText = document.createTextNode(`${quantity}`);
			newQuantity.appendChild(quantityText);

			let newIcon = document.createElement('I');
			newIcon.classList.add('fas', 'fa-trash-alt');

			newInput.setAttribute('type', 'checkbox');
			newInput.setAttribute('name', `${categoryName}[]`);
			newInput.setAttribute('value', `${groceryToAdd}`);

			newLabel.appendChild(newInput);
			newLabel.appendChild(newText);
			newLabel.appendChild(newQuantity);
			newLabel.appendChild(newIcon);

			MASTERGROCERYLIST.setTrashEvents(newLabel.querySelector('.fa-trash-alt'));
			document.querySelector(`div[name=${categoryName}]`).appendChild(newLabel);
		}
	}

	editGroceryName(e){
		this.setAttribute('value', this.value);
	}

	editGroceryQuantity(e){
		this.setAttribute('value', this.value);
	}

	removeGroceryItem(e){
		// console.log(this);
		if(this.tagName === 'I'){
			// console.log('Removing Item');
			// There's a lot of cool things you can try instead of just removing the item from the list
			// Maybe playing a small animation highlighting the item
			// then just adding a line-through effect to the innerText and leaving the item on the list
			this.parentElement.remove();
		}
	}

	getListName(charSeq, index){
		return this.listNames.filter(a => a.slice(0,index) === charSeq);
	}

	setTrashEvents(element){
		element.addEventListener('click', this.removeGroceryItem);
	}
}