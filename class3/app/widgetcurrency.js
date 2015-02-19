var WidgetCurrency = function(base, amount){
	this.base = base || "foo";
	this.amount = amount || 0;

	/*this.display = function() {
		return this.base+" : "+ this.amount;
	};*/
};

WidgetCurrency.prototype.display = function() {
	return this.base+" : "+ this.amount;
};

WidgetCurrency.prototype.convert = function(toBase, exchangeRates) {
	var ratio = exchangeRates[this.base]/exchangeRates[toBase];
	this.amount = this.amount * ratio;
	this.base = toBase;
};

WidgetCurrency.prototype.callApi = function(callback) {
	setTimeout(function(){
		callback("hello world " + message);	
	}, 2000);
};