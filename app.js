//Item Controller
const ItemCtrl = (function(){

  const Item = function(name, id){
    this.id = id;
    this.name = name;
  }

  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    completedItems: StorageCtrl.getCompletedItemsFromStorage(),
    currentItem: null,
  }

  return {
    addItem: function(name){
      let ID;
      // Create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      newItem = new Item(name, ID);
      data.items.push(newItem);
      return newItem;
    }
  }
})();

// App Controller
const App = (function()){
  // Load event listeners
  const loadEventListeners = function(){

    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Display greeting event
    document.querySelector(UISelectors.nameBtn).addEventListener('click', displayGreeting);

    //Add Item Event
    document.querySelector(UISelectors.rememberBtn).addEventListener('click', addItem);

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', editItemClick);

    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItem);

    //Delete icon click Event
    document.querySelector(UISelectors.itemList).addEventListener('click', deleteItemClick);

    //Mark item as complete
    document.querySelector(UISelectors.itemList).addEventListener('click', completeItem);

    //Edit completed item
    document.querySelector(UISelectors.completeItemList).addEventListener('click', deleteCompletedItem);

    //Clear all buttons
    document.querySelector(UISelectors.clearRememberBtn).addEventListener('click', clearRememberList);
    document.querySelector(UISelectors.clearCompletedBtn).addEventListener('click', clearCompletedList);
    document.querySelector(UISelectors.startOver).addEventListener('click', clearEverythingFromStorage);
  }

  //Display greeting to user, hide/show forms
  const displayGreeting = function(e){
    e.preventDefault();
    let name = UICtrl.getNameInput();
    UICtrl.updateName(name);
    StorageCtrl.storeName(name);
    UICtrl.hideNameForm();
    UICtrl.showListForm();
    UICtrl.hideUpdateItemBtn();
    UICtrl.hideItemList();
    UICtrl.showStartOverBtn();
    if(localStorage.getItem('name') !== null){
      UICtrl.resetRememberForm();
    }
  }

  //Add item to item list
  const addItem = function(e){
    const item = UICtrl.getItemInput();
    const newItem = ItemCtrl.addItem(item);
    StorageCtrl.storeItem(newItem);
    const items = ItemCtrl.getItems();
    UICtrl.populateItemList(items);
    UICtrl.showListItems();
    UICtrl.clearInput();
    e.preventDefault();
  }

  // Public methods
  return {
    init: function(){
      // Load event listeners
      loadEventListeners();
    }
  }

})(UICtrl, ItemCtrl, StorageCtrl);

// Initialize App
App.init();
