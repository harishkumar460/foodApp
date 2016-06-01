'use strict';
var expect=chai.expect;
var assert=chai.assert;
describe('Menu item controller test case run',function(){
	var self,scope,$state;
	beforeEach(module('foodApp'));
	beforeEach(inject(function($controller,$rootScope,_$state_){
	scope=$rootScope.$new();
	$state=_$state_;
    self=$controller('menuItemController',{
	$scope:scope,
    $state:$state
	});	
	}));
	it('should  test checkoutOrder function as expected',function(){
	 var statecaller = sinon.stub($state, 'go');
     statecaller.withArgs('menu_item_confirm');
	 self.checkoutOrder();
     expect(statecaller.called).to.equal(true);	 
	});
	it('should  test calculatePrice function as expected true',function(){
	 var item={id:'v001',name:'Mango Juice',price:30,selected:{count:2}};
	 var index=0;
	 self.calculatePrice(item,index);
     expect(self.totalItemPrice[index]).to.equal(60);	 
	});
	it('should  test calculatePrice function as expected false case',function(){
	 var item={id:'v001',name:'Mango Juice',price:30,selected:{id:'qty',count:''}};
	 var index=0;
	 self.calculatePrice(item,index);
     expect(self.totalItemPrice[index]).to.equal('0.00');	 
	});
	it('should  test calculateTotalValue function as expected',function(){
	 self.totalItemPrice=[30,20,50,''];
	 self.calculateTotalValue();
     expect(self.totalValue).to.equal(100);	 
	});
});