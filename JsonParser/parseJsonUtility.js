var Model = require('../models');
var assert = require('assert');


//var needValueofSubParams = "data2.J_abc.A_|0|.vale";
//var inputJson =  JSON.parse('{"hello": "world", "data": [ {"array1" : "value1"}, 2, 3 ], "data2" : {"abc" : [ {"vale" : "an"}]} }');

//getValueFromJson(needValueofSubParams,inputJson);
module.exports.getValueFromJson = function (needValueofSubParams,inputJson)
{
	var matchedCount=0;
var needValueofSubParamsarray = needValueofSubParams.split(".");

// verify if input value sub params string is in dot notation or not.
if(needValueofSubParamsarray.length == 0)
{
	return undefined;
}

var curJson = inputJson;
var curkyArray = Object.keys(curJson);

// loop through needValueofSubParamsarray keys
for (var i=0;i<needValueofSubParamsarray.length; i++)
{

// check if the key is inside type Array
if(needValueofSubParamsarray[i].indexOf("A_") != -1)
{
	if(needValueofSubParamsarray[i].indexOf("|") != -1)
	{
		
		curJson = curJson[needValueofSubParamsarray[i].split("|")[1]];
		if(typeof curJson == "object")
		{
			curkyArray = Object.keys(curJson);
			matchedCount = matchedCount+1;
		}
		
	}
}

// check if the key is inside type Json
if(needValueofSubParamsarray[i].indexOf("J_") != -1)
{
curJson = curJson[needValueofSubParamsarray[i].split("_")[1]];
matchedCount = matchedCount+1;
}
else
{
	    for(var k=0;k<curkyArray.length;k++)
		{
			     // check if the key is matched with input key in needValueofSubParams
			    if((needValueofSubParamsarray[i] === curkyArray[k]))
				{
					curJson = curJson[curkyArray[k]];
									   
					if(typeof curJson == Object)
					{
						curkyArray = Object.keys(curJson);
					}
					matchedCount = matchedCount+1;
					
				}
		}
}
}
// check if no of matches are equal to count of input needValueofSubParamsarray
if(needValueofSubParamsarray.length == matchedCount)
{
	return curJson;
}
return undefined;
}
