const math = require("mathjs")

function ConvertHandler() {

  this.getNum = function (input) {
    let num = input.replace(/[a-zA-Z]/g, '');
    if (!num) return 1;

    if(/^\d+(\.\d+)?\/?\d+(\.\d+)?$/.test(num)){
      num = math.evaluate(num)
    }

    if(/^\d+$/.test(num) || /^\d+\.?\d+$/.test(num)){
      return parseFloat(num);
    }

    return null;
  };

  this.getUnit = function(input) {
    const unit = input.match(/[a-zA-Z]+/i);
    if (unit) {
      const unitName = unit[0].toLowerCase();
      if (["gal", "lbs", "kg", "mi", "km"].includes(unitName)) {
        return unitName;
      } else if (unitName === "l") {
        return "L";
      }
    }
    return null;
  };

  this.getReturnUnit = function(initUnit) {
    const conversions = {
      "gal": "L",
      "lbs": "kg",
      "mi": "km",
      "L": "gal",
      "kg": "lbs",
      "km": "mi"
    };

    return conversions[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const units = {
      "gal": "gallons",
      "lbs": "pounds",
      "mi": "miles",
      "L": "liters",
      "kg": "kilograms",
      "km": "kilometers"
    };

    return units[unit] || null;
  };

  this.convert = function(initNum, initUnit) {
    const unitToConversion = {
      gal: 3.78541, // 1 gallon = 3.78541 liters
      L: 1 / 3.78541,
      mi: 1.60934, // 1 mile = 1.60934 kilometers
      km: 1 / 1.60934,
      lbs: 0.453592, // 1 pound = 0.453592 kilograms
      kg: 1 / 0.453592,
    };

    if (!unitToConversion.hasOwnProperty(initUnit)) {
      return "invalid unit";
    }

    return Number.parseFloat(
      (initNum * unitToConversion[initUnit]).toFixed(5)
    );
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum.toString()} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toString()} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
