'use strict';
var expect=chai.expect;
var assert=chai.assert;
describe('home service test case run',function(){
	var homeService,$http;
	beforeEach(module('foodApp'));
    beforeEach(inject(function(_homeService_,_$http_){
		homeService=_homeService_;
		$http=_$http_;
	}));	
   it('should test setSelectedVendor',function(){
	   var vendor={id:'v001',name:'Juice corner'};
	  homeService.setSelectedVendor(vendor);
       var vendor=homeService.getSelectedVendor();
       expect(vendor.id).to.equal('v001');	  	  
   });	 
   it('should test getSelectedVendor',function(){
	  var vendor={id:'v001',name:'Juice corner'};
	  homeService.setSelectedVendor(vendor); 
	  var vendor=homeService.getSelectedVendor();
     expect(vendor.id).to.equal('v001');	  
   }); 
   it('should test getVendors',function(){
	  var status=homeService.getVendors();
	  expect(typeof status).to.equal('object');	  
   });
   it('should test getSelectedVendorItems',function(){
	  var status=homeService.getSelectedVendorItems();
      expect(typeof status).to.equal('object');	  
   });
   it('should test checkoutOrder true case',function(){
	   homeService.loggedInUser={userName:'test',password:'test@123'};
	  var selectedVendorItems=[{name:'Mango Juice',price:30,selected:{count:1}},
							   {name:'Orange Juice',price:30,selected:{count:1}},
							   {name:'Litchi Juice ',price:60,selected:{count:1}}],totalItemPrice=[30,30,60],totalValue=120;  
	  homeService.checkoutOrder(selectedVendorItems,totalItemPrice,totalValue);
       var orderStatus=homeService.getOrderDetails();
      expect(typeof orderStatus).to.equal('object');	   
   });
   it('should test checkoutOrder false case',function(){
	   homeService.loggedInUser={userName:'test',password:'test@123'};
	  var selectedVendorItems=[{name:'Mango Juice',price:30,selected:{id:'qty',count:''}}],totalItemPrice=[30,30,60],totalValue=120;  
	  homeService.checkoutOrder(selectedVendorItems,totalItemPrice,totalValue); 
	  var orderStatus=homeService.getOrderDetails();
      expect(typeof orderStatus).to.equal('object');
   });
   it('should test getOrderDetails',function(){
	   homeService.loggedInUser={userName:'test',password:'test@123'};
	   var orderStatus=homeService.getOrderDetails();
	   expect(typeof orderStatus).to.equal('object');		   
   });
   it('should test getOrderDetails',function(){
	  var orderStatus=homeService.getOrderDetails();
      expect(orderStatus).to.equal(false);	  
   });
});