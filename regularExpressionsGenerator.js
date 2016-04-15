//replace all in string
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

//extend an object
function extend(Child, Parent){
  var Temp = function(){};
 
  Temp.prototype = Parent.prototype;
 
  Child.prototype = new Temp();
 
  Child.prototype.constructor = Child;
}

//duplicate object
function duplicateObject(obj){
	if(typeof obj == "object" && obj !== null){
		var ret = {};
		for(var index in obj){
			ret[index] = duplicateObject(obj[index]);
		}
		return ret;
	} else {
		return obj;
	}
}


var regularExpressionsGenerator = function(){};

extend(regularExpressionsGenerator,RegExp);
regularExpressionsGenerator = function(){
	this.string = "";
	this.flags = "";
	if(arguments.length == 0){
		console.warn("You are creating an empty regular expression");
	}
	for(var i = 0;i<arguments.length;i++){
		this.string+=arguments[i];
	}
}


regularExpressionsGenerator.get = function(argument){
	if(typeof argument == "string" && regularExpressionsGenerator.specialChars[argument.toLowerCase().replaceAll(" ","")]!==undefined){
		return regularExpressionsGenerator.specialChars[argument.toLowerCase().replaceAll(" ","")];
	} else {
		console.error("cannot find " + argument);
	}
}

regularExpressionsGenerator.prototype.go = function(){
	return new RegExp(this.string,this.flags);
}

regularExpressionsGenerator.prototype.add = function(){
	if(arguments.length == 0){
		console.warn("You are adding nothing to a regular expression");
	}
	for(var i = 0;i<arguments.length;i++){
		this.string+=arguments[i];
	}
	return this;

}

regularExpressionsGenerator.specialChars = {
	//anchors
	"startofline"				:"^",
	"startofstring"				:"\\A",
	"endofline"					:"$",
	"endofstring"				:"\\Z",
	"wordboundary"				:"\\b",
	"notwordboundary"			:"\\B",
	"startofword" 				:"\\<",
	"endofword"					:"\\>",

	//Character Classes
	"controlcharacter"			:"\\c",
	"whitespace"				:"\\s",
	"notwhitespace"				:"\\S",
	"digit"						:"\\d",
	"notdigit"					:"\\D",
	"word"						:"\\w",
	"notword"					:"\\W",

	//Quantifiers
	"0ormore"					:"*",
	"1ormore"					:"+",
	"0or1"						:"?",
	"exactly"					:function(number){return "{"+number+"}";},
	"greaterorequal"			:function(number){return "{"+number+",}";},
	"betweenorequal"			:function(number1,number2){return "{"+number1+","+number2+"}";},

	//Special Characters
	"newline"					:"\\n",
	"carriage return"			:"\\r",
	"tab"						:"\\t",
	"verticaltab"				:"\\v",
	"formfeed"					:"\\f",

	//Groups and ranges
	"anynonnewlinecharacter"	:".",
	"or"						:function(){ var ret = "("; for(var i = 0; i<arguments.length;i++){ ret+=arguments[i]; if(i!=arguments.length-1){ ret+="|"; } } ret += ")"; return ret; },
	"ornoncapture"				:function(){ var ret = "(?:"; for(var i = 0; i<arguments.length;i++){ ret+=arguments[i]; if(i!=arguments.length-1){ ret+="|"; } } ret += ")"; return ret; },
	"group"						:function(content){ return "("+content+")"; },
	"groupnoncapture"			:function(content){ return "(?:"+content+")"; },
	"range"						:function(){ var ret = "["; for(var i = 0; i<arguments.length;i++){ ret+=arguments[i]; } ret += "]"; return ret; }
};



for(var special in regularExpressionsGenerator.specialChars){
	if(typeof regularExpressionsGenerator.specialChars[special] == "string"){

		regularExpressionsGenerator.prototype["add"+special] = (function(char){
			return function(){
				console.log(this);
				return this.add(char);
			};
		})(regularExpressionsGenerator.specialChars[special]);

	} else if(typeof regularExpressionsGenerator.specialChars[special] == "function"){
		regularExpressionsGenerator.prototype["add"+special] = (function(func){
			return function(){
				console.log(this);
				return this.add(func.apply(undefined,arguments));
			};
		})(regularExpressionsGenerator.specialChars[special]);
	}
	
}

window.reg = regularExpressionsGenerator;
