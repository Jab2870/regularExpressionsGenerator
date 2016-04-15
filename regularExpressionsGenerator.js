function regularExpressionsGenerator(){
	this.test = arguments[0];
}

window.reg = regularExpressionsGenerator;

window.reg.special = {
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
};


