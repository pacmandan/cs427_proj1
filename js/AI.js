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
    
	//parse
	
	//check keywords
	var keywords = [
	    {"key":"math","output":["In a group of 23 people, at least two have the same birthday with the probability greater than 1/2","The spiral shapes of sunflowers follow a Fibonacci sequence.","If you shuffle a pack of cards properly, chances are that exact order has never been seen before in the whole history of the universe.","10! seconds is exactly 6 weeks.","Complex number to a complex power may be real."]}
	];
	
	keywords.forEach(function(data) { 
	    var reg = new RegExp(data.key, "i");
	    //do check here, then set output
	});
	
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
    //full sentence matches
	var full = [
        {"input":"Nice to meet you.","output":["Nice to meet you too!"]},
        {"input":"I like math.","output":["I love math!","I like math too!","What's your favorite thing about math?"]}
    ];
    
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
    //regexes and matches
	var partial = [
        {"regex":"^Hello{1}","output":["Hi!","Hello.","Hey"]},
	    {"regex":"^I like{1}","output":["I like","I don't like"]},
	    {"regex":"^I hate{1}","output":["I like","I don't like"]},
	    {"regex":"^Math is{1}","output":["Math is great!"]}
	];
	
	//set output if it matches
    partial.forEach(function(data) {
        var reg = new RegExp(data.regex,"i");
        if (reg.test(input)) {
            var length = data.output.length;
            var response = Math.floor(Math.random() * length);
            output = data.output[response];
            var add = ""; //anything added to the end
            if (output == "I like") { add = " too!"; }
            //handle I like x and I don't like y
            if ((output == "I like") || (output == "I don't like")) {            
                var stringl = data.regex.length - 4;
                var outputsq = input.substring(stringl);
                if (/./.test(outputsq,"i")) {
                    outputsq = outputsq.substring(0,outputsq.length-1);
                }
                output = output + outputsq + add;
            }
        }
    });
    
    return output;
}
