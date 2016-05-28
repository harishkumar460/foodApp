'use strict';
foodApp.service('homeService', function($http,$q,dbService) {
    var self = this;
    var selectedVendor = '';
    self.loggedInUser=dbService.getLoggedInUser();
    self.loggedInUser=self.loggedInUser?JSON.parse(self.loggedInUser):'';
    self.setSelectedVendor = function(vendorSelected) {
	selectedVendor = vendorSelected;
    };
    self.getSelectedVendor = function() {
	return selectedVendor ? selectedVendor : '';
    };
    self.getVendors = function() {
	return $http.get('./scripts/mock-data/vendors.list.json');
    };
    self.getSelectedVendorItems = function() {
	var deferred=$q.defer();
	$http.get('./scripts/mock-data/vendors.menu.items.json').then(function(response){
	    var data=response.data.vendorItems;
	    deferred.resolve(data);
	});
	return deferred.promise;
    };
    self.checkoutOrder=function(selectedVendorItems,totalItemPrice,totalValue){
	var orderId=new Date().getTime();
	var vendor=self.getSelectedVendor();
	var itemsInfo=filterSelectedItems(selectedVendorItems,totalItemPrice);
	var orderSummary={
		vendor:{id:vendor.id,name:vendor.name},
		id:orderId,
		totalItemPrice:itemsInfo.totalItemPrice,
		totalValue:totalValue,
		itemsDetails:itemsInfo.items
	};
	if(self.loggedInUser){
	    dbService.storeInfo('orderDetails',orderSummary,self.loggedInUser.userName);   
	}
    };
    function filterSelectedItems(selectedVendorItems,totalItemPrice){
	var selectedItems=[],totalPrice=[];
	angular.forEach(selectedVendorItems,function(item,index){
	    if(item.selected&&!item.selected.id){
		selectedItems.push(item);
		totalPrice.push(totalItemPrice[index]);
	    }
	});
	return {items:selectedItems,totalItemPrice:totalPrice};
    }
    self.getOrderDetails=function(){
	if(self.loggedInUser){
	 return dbService.getOrderDetails(self.loggedInUser.userName);
	}else{
	  return false;  
	}
    };
});