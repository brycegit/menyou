angular.module('admin', ['services'])
  .controller('adminController', function($http, $scope, categoriesService){

    getCategories();

    $scope.formData = {};
    $scope.test = 'Hola';
    $scope.addCategory = function() {
      $http.post('/createCategory', JSON.stringify({name: $scope.formData.categoryname})).then(function(response){        
        $('.add-category-container').append('<p class="success">Category '+response.data[0].name+' successfully created!</p>')
        setTimeout(function(){  
          $('.success').fadeOut(300, function() { $(this).remove(); });       
        }, 1500);        
        getCategories();
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    $scope.addMenuItem = function() {
      $scope.formData.category_id = Number($scope.formData.category_id);
      console.log($scope.formData)
      $http.post('/createMenuItem', $scope.formData).then(function(response){
        console.log(response);
        $scope.formData = {};
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    function getCategories() {
      $http({
        method: 'GET',
        url: '/categories'
        }).then(function successCallback(response) {
          // console.log('category data', response)
          $scope.allcategories = response.data.map(function(category){
            return {name: category.name[0].toUpperCase() + category.name.slice(1), id: category.id};
          });
        }, function errorCallback(response) {
          console.log('Error getting data', response);
      });
    }
  })

  .directive('menuform', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/admin/addMenuItemForm.html',
      scope:{
        categories: '=',
        form: '=',
        add: '&'
      }
    }
  })
  .directive('categoryform', function(){
      return {
        restrict: 'E',
        templateUrl: 'app/components/admin/addCategoryForm.html',
        scope:{
          form: '=',
          add: '&',
          successAlert: '@'
        }
      }
    })
