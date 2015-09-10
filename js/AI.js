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
	//match partial phrases
	//parse
	
	//return output
	var output = "boo";
	$('#container').append('<div class="ai-content">'
			+ '<h3 class="ai-text col-xs-12 text-right">' + output + '</h3></div>');
	//scroll to bottom
	$('#container').scrollTop($("#container")[0].scrollHeight);
}
