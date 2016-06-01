'use strict';
var expect=chai.expect;
var assert=chai.assert;
describe('Test case run for home controller',function(){
    beforeEach(module('foodApp'));	
	var self,scope,q,homeService,$state;
	
	beforeEach(inject(function($controller,$rootScope,$q,_$state_){
		scope=$rootScope.$new();
		q=$q;
		$state=_$state_;
		self=$controller('homeController',{
		$scope:scope,
        homeService:mockhomeService		
		});
	}));
	it('Should test selectVendor',function(){
		var statecaller = sinon.stub($state, 'go');
         statecaller.withArgs('menu_item');
		self.selectVendor();
	  expect(statecaller.called).to.equal(true);		
	});
	var mockhomeService={
		getVendors:function(){
			var deferred=q.defer();
		  var data={data:{list:[{vendor:'vendormock'},{vendor:'vendormock2'}]}};
		  deferred.resolve(data);
		  return deferred.promise;
		},
		setSelectedVendor:function(setSelectedVendor){
			
		}
	};
});