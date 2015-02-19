describe("widgetCurrency", function() {
	it("is defined", function() {
		expect(WidgetCurrency).toBeDefined();
	});
});

describe("defaults", function() {
	it("base is foo", function() {
		var currency = new WidgetCurrency();
		expect(currency.base).toEqual("foo");
	});
	it("amount is 0", function() {
		var currency = new WidgetCurrency();
		expect(currency.amount).toEqual(0);
	});
});

