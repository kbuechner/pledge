'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(){
	this.state = 'pending';
	this.value = null;
	this.handlerGroups = [];
}

$Promise.prototype.then = function(success, error){
	var handler = {
		successCb: null,
		errorCb: null
	}

	if(typeof success == 'function'){
		handler.successCb = success;

	}

	if(typeof error == 'function'){
		handler.errorCb = error;
	}

	this.handlerGroups.push(handler);
}

$Promise.prototype.callHandlers = function(){
	console.log(this)

}


function Deferral(){
	this.$promise = new $Promise;
}

Deferral.prototype.resolve = function(resolveData){

	if(this.$promise.state == 'pending'){
		this.$promise.state = 'resolved';
		this.$promise.value = resolveData;
	}	
}

Deferral.prototype.reject = function(rejectReason){
	if(!((this.$promise.state == 'rejected') || (this.$promise.state == 'resolved'))){
		this.$promise.state = 'rejected';
		this.$promise.value = rejectReason;		
	}
}

function defer(){
	var returnDeferral = new Deferral;
	return returnDeferral;
}


// $Promise.prototype.handler = {
// 	var successCb;
// 	var errorCb;
// }

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
