var WidgetCurrency = function(base, amount){
	this.base = base || "foo";
	this.amount = amount || 0;

	/*this.display = function() {
		return this.base+" : "+ this.amount;
	};*/
};

WidgetCurrency.prototype.display = function() {
	return this.base+" : "+ this.amount;
}