const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Number Input', function() {
    test('whole number', () => {
      assert.strictEqual(convertHandler.getNum("2kg"), 2);
    });
    test('decimal number', () => {
      assert.strictEqual(convertHandler.getNum("2.5l"), 2.5);
    });
    test('fractional', () => {
      assert.strictEqual(convertHandler.getNum("1/2gal"), 0.5);
    });
    test('fractional input with a decimal', () => {
      assert.strictEqual(convertHandler.getNum("2/0.5lbs"), 4);
    });
    test('error on a double-fraction', () => {
      assert.isNull(convertHandler.getNum("2/2/3kg"));
    });
    test('default to 1 when no numerical input is provided', () => {
      assert.strictEqual(convertHandler.getNum("mi"), 1);
    });
  });
  
  suite('Unit Input', function() {
    test('each valid input unit', () => {
      assert.strictEqual(convertHandler.getUnit("2kg"), "kg");
      assert.strictEqual(convertHandler.getUnit("2lbs"), "lbs");
      assert.strictEqual(convertHandler.getUnit("2km"), "km");
      assert.strictEqual(convertHandler.getUnit("2mi"), "mi");
      assert.strictEqual(convertHandler.getUnit("2gal"), "gal");
      assert.strictEqual(convertHandler.getUnit("2l"), "L");
    });
    test('error on invalid input unit', () => {
      assert.isNull(convertHandler.getUnit("2oz"));
    });
    test('return unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
      assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
      assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
      assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
      assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
      assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
    });
    test('spelled-out unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
      assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
      assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
      assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
      assert.strictEqual(convertHandler.spellOutUnit("L"), "liters");
    });
  });
  
  suite('Conversion', function() {
    test('gal -> L', () => {
      assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541);
    });
    test('L -> gal', () => {
      assert.strictEqual(convertHandler.convert(1, "L"), 0.26417);
    });
    test('lbs -> kg', () => {
      assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359);
    });
    test('kg -> lbs', () => {
      assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462);
    });
    test('mi -> km', () => {
      assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934);
    });
    test('km -> mi', () => {
      assert.strictEqual(convertHandler.convert(1, "km"), 0.62137);
    });
  });
  
});