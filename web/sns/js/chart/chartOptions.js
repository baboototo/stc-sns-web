
var ChartTitle = function(text){
    this._chartOption = {};
    this._chartOption["text"] = text;
};
ChartTitle.prototype.setSubText = function(subtext) {this._chartOption["subtext"] = subtext;};
ChartTitle.prototype.setLink = function(link) {this._chartOption["link"] = link;};
ChartTitle.prototype.setPosition = function(positionText) {this._chartOption["x"] = positionText.toLowerCase();}
ChartTitle.prototype.addOption = function(option, value) {this._chartOption[option.toLocaleString()] = value.toLocaleString();}
ChartTitle.prototype.getOption = function() {return this._chartOption};





