// NOTE: Refactor class into more dynamic/concise code after completing category
// removal/creation (including the generic ones) and checkbox event features

class MasterGroceryList{
	constructor(){
		this.allListContainers = document.getElementsByClassName("grocery-list-container");
		this.groceryLists = {};
		this.listNames = [];
		this.categoryCreationKit;
	}

	loadGroceryLists(listContainers){
		this.categoryCreationKit = document.querySelector('.category-creation-container').children[0];

		for(let i = 0; i < listContainers.length; i++){
			this.listNames.push(listContainers[i].getAttribute('name'));
			this.groceryLists[this.listNames[i]] = {list: listContainers[i].children};
		}

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
			currentNameLabel.addEventListener('change', this.editName);

			let currentQuantityInput = document.getElementsByName(`${this.listNames[i]}Quantity`)[0];
			currentQuantityInput.addEventListener('change', this.editQuantity);

			this.groceryLists[this.listNames[i]].button = currentButton;
			this.groceryLists[this.listNames[i]].inputLabel = currentNameLabel;
			this.groceryLists[this.listNames[i]].quantityInput = currentQuantityInput;
		}

		this.categoryCreationKit.querySelector('[name=categoryName]').addEventListener('change', this.editName);
		this.categoryCreationKit.querySelector('[name=categoryType]').addEventListener('change', this.editName);
		this.categoryCreationKit.querySelector('p').addEventListener('click', this.addCategory);
	}

	addCategory(e){
		// console.log('adding category', this);
		let categoryName = document.querySelector(`#${this.id} + label input`).value;
		let lowerCaseName = categoryName.toLowerCase()+'s';
		let categoryHierarchy = document.querySelector(`#${this.id} + label + label input`).value;
		categoryHierarchy = categoryHierarchy.toLowerCase();

		// Use validations on the inputs instead checking it in code and run the code below only if the validation reqs are satisfied
		if((categoryName != "" && categoryName != null) && 
			(categoryHierarchy === 'main' || categoryHierarchy === 'sub')){
			let div = document.createElement('DIV');
			div.classList.add('grocery-category');
			div.innerHTML = 
				`<div class="grocery-type">
					${categoryName}
				</div>

				<div class="grocery-list-container" name="${lowerCaseName}">
				</div>

				<div class="controls-container">
					<p class="addItemButton" id="${lowerCaseName}Btn">Add ${categoryName}</p>
					<label for="${lowerCaseName}Name">
						<input type="text" name="${lowerCaseName}Name" placeholder="Rigatoni">
					</label>
					<label for="${lowerCaseName}Quantity">
						<input type="text" name="${lowerCaseName}Quantity" placeholder="Quantity in X units">
					</label>
				</div>`;

			let mainList = document.querySelector('#master-list');
			let subList = document.querySelector('.grocery-subcategories');

			categoryHierarchy === 'main' ? mainList.insertBefore(div,subList) : subList.appendChild(div);

			MASTERGROCERYLIST.listNames.push(lowerCaseName);
			MASTERGROCERYLIST.groceryLists[lowerCaseName] = {list: document.querySelector(`div [name=${lowerCaseName}]`).children};

			MASTERGROCERYLIST.setNewCatEvents(lowerCaseName);
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

		// Use validations on the inputs instead checking it in code and run the code below only if the validation reqs are satisfied
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

	removeCategory(e){
		console.log(this);
		// check if the icon being clicked has a class of .category-delete
		// then remove the entire category: should be something like this.parentElement.parentElement(remove);
	}

	getListName(charSeq, index){
		return this.listNames.filter(a => a.slice(0,index) === charSeq);
	}

	setTrashEvents(element){
		element.addEventListener('click', this.removeGroceryItem);
	}

	setNewCatEvents(listName){
		let currentButton = document.getElementById(`${listName}Btn`);
		currentButton.addEventListener('click', this.addGroceryItem);

		let currentNameLabel = document.querySelector(`#${listName}Btn + label input[type=text]`);
		currentNameLabel.addEventListener('change', this.editName);

		let currentQuantityInput = document.getElementsByName(`${listName}Quantity`)[0];
		currentQuantityInput.addEventListener('change', this.editQuantity);

		this.groceryLists[listName].button = currentButton;
		this.groceryLists[listName].inputLabel = currentNameLabel;
		this.groceryLists[listName].quantityInput = currentQuantityInput;
	}

	editName(e){
		this.setAttribute('value', this.value);
	}

	editQuantity(e){
		this.setAttribute('value', this.value);
	}
}