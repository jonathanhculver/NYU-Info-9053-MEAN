describe("widgetCurrency", function() {
	it("is defined", function() {
		expect(widgetCurrency).toBeDefined();
	});
});

describe("defaults", function() {
	it("base is foo", function() {
		var currency = new widgetCurrency();
		expect(currency.base).toEqual("foo");
	});
});

