angular.module('services', [])
  .factory('categoriesService', function ($http, menuitemsService) {
    var categoryData = [
      {
        "id": 1,
        "name": "burgers"
      },
      {
        "id": 2,
        "name": "dinner"
      },
      {
        "id": 3,
        "name": "breakfast"
      },
      {
        "id": 4,
        "name": "drinks"
      }
    ];
    var menuItems = menuitemsService.getAllMenuItems();
    var menuItemsByCategory = {};
    menuItems.forEach(function(menuObj){
      var key = findCategoryById(menuObj.category_id)[0].name;
      var formattedKey = key[0].toUpperCase() + key.slice(1);
      menuItemsByCategory[formattedKey] = menuItemsByCategory[formattedKey] || [];
      menuItemsByCategory[formattedKey].push(menuObj);
    });

    var currentMenuItems =  {items: []};
    var currentCategory = {name: undefined};
    function findCategoryById(id){
      return categoryData.filter(function(category){
        return category['id'] === id;
      });
    }
    var getAllCategoryData = function(){
      return categoryData;
    }
    var getAllCategoryNames = function(){
      return categoryData.map(function(category){
        return category.name[0].toUpperCase() + category.name.slice(1);
      });
    }
    var setCurrentCategory = function(category) {
      currentCategory.name = category;
      currentMenuItems.items = menuItemsByCategory[category];
    };
    var getCurrentCategory = function() {
      return currentCategory;
    };
    var getMenuItemsInCurrentCategory = function() {
      return currentMenuItems;
    };

    return {
      setCurrentCategory: setCurrentCategory,
      getCurrentCategory: getCurrentCategory,
      getMenuItemsInCurrentCategory: getMenuItemsInCurrentCategory,
      getAllCategoryNames: getAllCategoryNames,
      getAllCategoryData: getAllCategoryData
    };
  })
  .factory('menuitemsService', function ($http) {
    var addedItems = {items: []};
    // data variable to hold on to all menu items
    // above creates state and below are functions which act on it (like setState)
    // this gets all menu items - not defined use yet
    var data = [
      {
        "id": 1,
        "name": "bigmac",
        "description": "the biggest burger",
        "price": 122,
        "category_id": 1
      },
      {
        "id": 2,
        "name": "nuggets",
        "description": "little nuggets",
        "price": 232,
        "category_id": 3
      },
      {
        "id": 3,
        "name": "fries",
        "description": "good fries",
        "price": 23,
        "category_id": 2
      }
    ];

    var getAllMenuItems = function() {
      return data;
    };
    var addMenuItemToChosenList = function(item){
      addedItems.items.push(item);
    }
    // give access to chosenItemList module will eventually use to place order
    var getChosenList = function(){
      return addedItems;
    }
    var removeMenuItemFromChosenList = function(index){
      addedItems.items.splice(index, 1);
    }

    return {
      getAllMenuItems: getAllMenuItems,
      addMenuItemToChosenList: addMenuItemToChosenList,
      getChosenList: getChosenList,
      removeMenuItemFromChosenList: removeMenuItemFromChosenList
    };
  })