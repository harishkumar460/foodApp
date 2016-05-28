'use strict';

/**
 * @ngdoc function
 * @name projectApp.controller:menuItemController
 * @description # menuItemController Controller of the projectApp
 */
foodApp.controller('menuItemController', function(homeService,$filter,$state) {
    var self = this;
    function init(){
        self.totalValue=0;
        self.totalItemPrice=[];
        self.showCTACheckout=true;
        self.selectedVendor=homeService.getSelectedVendor();
        if($state.current.name==='menu_item_confirm'){
          self.confirmedOrderDetails=homeService.getOrderDetails();  
        }else{
            self.quantity=[{id:'readonly',count:'Quantity'},{count:1},{count:2},{count:3},{count:4},
                           {count:5},{count:6},{count:7},{count:8}];
    	homeService.getSelectedVendorItems().then(function(response){
    	self.selectedVendorItems= $filter('filter')(response,homeService.getSelectedVendor().id);
    	self.selectedVendorItems=self.selectedVendorItems[0].items;   
        });
        }
    }
    self.calculatePrice=function(item,index){
	self.totalItemPrice[index]=item.selected && !item.selected.id?item.selected.count*item.price:'0.00';
	return self.totalItemPrice[index];
    };
    self.calculateTotalValue=function(){
	self.totalValue=0;
      angular.forEach(self.totalItemPrice,function(itemTotal){
	  itemTotal=itemTotal?parseInt(itemTotal):0;
	  self.totalValue+=itemTotal; 
      });
      return self.totalValue;
    };
    self.checkoutOrder=function(){
    homeService.checkoutOrder(self.selectedVendorItems,self.totalItemPrice,self.totalValue);
    $state.go('menu_item_confirm');
    };
    init();
});