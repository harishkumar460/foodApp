'use strict';
foodApp.controller('homeController',function(homeService,$state){
    var self=this;
    function init(){
    homeService.getVendors().then(function(response){
	self.vendorsList=response.data.list;	
    });	
    }
    self.selectVendor=function(selectedVendor){
	homeService.setSelectedVendor(selectedVendor);
	$state.go('menu_item');
    };
    init();
});