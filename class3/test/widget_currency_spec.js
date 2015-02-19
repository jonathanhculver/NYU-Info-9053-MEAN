describe("widgetCurrency", function() {
	it("is defined", function() {
		expect(WidgetCurrency).toBeDefined();
	});
});

describe("defaults", function() {
	var currency;

	beforeEach(function() {
		currency = new WidgetCurrency();
	});

	it("base is foo", function() {
		expect(currency.base).toEqual("foo");
	});

	it("amount is 0", function() {
		expect(currency.amount).toEqual(0);
	});
});

describe("setting values with constructor", function() {
	it("we can set base to bar", function() {
		var currency = new WidgetCurrency("bar");
		expect(currency.base).toEqual("bar");
	});
	it("we can set amount to 18", function() {
		var currency = new WidgetCurrency(false, 18);
		expect(currency.amount).toEqual(18);
	});
});

describe("display", function() {
	describe("when base is buzz and amount 10", function() {
		it("is 'buzz : 10'", function() {
			var currency = new WidgetCurrency("buzz", 10);
			expect(currency.display()).toEqual('buzz : 10');
		});
	});
});

