/* A Cleverbot Application, meant to pass the Turing Test
 * 
 * For CS427
 *
 * Written by Katelyn Narum, Dan Green and Peter Ortegel
 */

/* Binds Enter to call reply */
$('#usertext').keypress(function(event){
	if(event.keyCode == '13') { reply(); }
});



/* reply
 * This function controls the overall flow for the cleverbot
 * It grabs the input from the user and displays it and a reply
 * on the html file
 * 
 * Takes: nothing
 * Returns: nothing
 */
function reply() {
	//get input
	var input = $('#usertext').val();
    
	//clear out textbox
	$('#usertext').val("");
	//set input into html page
	$('#container').append('<div class="user-content"><h3 class="user-text col-xs-12">' 
							+ input + '</h3></div>');
	//scroll to bottom
	$('#container').scrollTop($("#container")[0].scrollHeight);
	
	//match complete phrases
    output = matchComplete(input);
    if (output != "") { returnOutput(output); return; }
    
	//match partial phrases
    output = matchPartial(input);
    if (output != "") { returnOutput(output); return; }
    
	//check keywords
    output = matchKeywords(input);
    if (output != "") { returnOutput(output); return; }
    
    //parse
    var parsedInput = parseSentence(input);
    //get word
    var length = parsedInput.length;
    var number = Math.floor(Math.random() * length);
    
    var word = parsedInput[number];
    
    //get sentence
    output = outputSentence(word);
	
	//default output
	if (output == "") { output = "I don't understand."; }
	
	//return output
	returnOutput(output);
}



/* returnOutput
 * This function sets the output in the html file
 * 
 * Takes: output
 * Returns: nothing

 */
function returnOutput(output) {
	//return output
	$('#container').append('<div class="ai-content">'
			+ '<h3 class="ai-text col-xs-12 text-right">' + output + '</h3></div>');
	//scroll to bottom
	$('#container').scrollTop($("#container")[0].scrollHeight);
}



/* matchComplete
 * This function matches full sentences and picks an output
 * 
 * Takes: input - from user
 * Returns: output - empty string or thing to reply
 */
function matchComplete(input) {
    var output = "";
    var json = "";
    
    //get the json file
    $.ajax({
        url: "./full.json",
        dataType: 'json',
        async: false,
        success: function(data) { json = data; }
    });
    
    var full = json.full;
    
    //set output if it matches
    full.forEach(function(data) {
        if (data.input == input) {
            var length = data.output.length;
            var response = Math.floor(Math.random() * length);
            output = data.output[response];
        }
    });
    
    return output;
}



/* matchPartial
 * This function matches partial sentences and picks an output
 * 
 * Takes: input - from user
 * Returns: output - empty string or thing to reply
 */
function matchPartial(input) {
    var output = "";
    var json = "";
    
    //get the json file
    $.ajax({
        url: "./partial.json",
        dataType: 'json',
        async: false,
        success: function(data) { json = data; }
    });
    
    var partial = json.partial;
	
	//set output if it matches
    partial.forEach(function(data) {
        var reg = new RegExp(data.regex,"i");
        if (reg.test(input)) {
            var length = data.output.length;
            var response = Math.floor(Math.random() * length);
            output = data.output[response];
            
            var add = ""; //anything added to the end
            if (output == "I like") { add = " too!"; }
            if (output == "I don't like") { add = "."; }
            
            //handle I like x and I don't like y
            if ((output == "I like") || (output == "I don't like")) {            
                var stringl = data.regex.length - 4;
                var outputsq = input.substring(stringl);
                var reg2 = new RegExp(".","i");
                if (reg2.test(outputsq,"i")) {
                    outputsq = outputsq.substring(0,outputsq.length-1);
                }
                output = output + outputsq + add;
            }
        }
    });
    
    return output;
}



/* matchKeywords
 * This function matches full sentences and picks an output
 * 
 * Takes: input - from user
 * Returns: output - empty string or thing to reply
 */
function matchKeywords(input) {
    var output = "";
    var json = "";
    
    //get the json file
    $.ajax({
        url: "./keywords.json",
        dataType: 'json',
        async: false,
        success: function(data) { json = data; }
    });
    
    var keywords = json.keywords;
    
    //set output if it matches
    keywords.forEach(function(data) { 
        var reg = new RegExp(data.regex,"i");
        if (reg.test(input)) {
            var length = data.output.length;
            var response = Math.floor(Math.random() * length);
            output = data.output[response];
        }
    });
    
    return output;
}



/* outputSentence
 * This function picks a sentence randomally and sticks the picked word onto the end
 * 
 * Takes: input - from user
 * Returns: output - empty string or thing to reply
 */
function outputSentence(word) {
    var output = "";
    
    //get the json file
    $.ajax({
        url: "./sentences.json",
        dataType: 'json',
        async: false,
        success: function(data) { json = data; }
    });
    
    var sentences = json.sentences;
    
    //set output if it matches
    sentences.forEach(function(data) {
        if (word.word == "I") { word.word = "you"; word.pos = "pronoun"; }
        if ((word.word == "you") || (word.word == "You")) { word.word = "me"; word.pos = "pronoun"; }
        if ((word.word == "he") || (word.word == "He")) { word.word = "him"; word.pos = "pronoun"; }
        if ((word.word == "she") || (word.word == "She")) { word.word = "her"; word.pos = "pronoun"; }
        if ((word.word == "they") || (word.word == "They")) { word.word = "them"; word.pos = "pronoun"; }
        if (data.type == word.pos) {
            var length = data.output.length;
            var response = Math.floor(Math.random() * length);
            output = data.output[response] + word.word;
        }
    });
    
    return output;
}
