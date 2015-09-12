var pos = require('pos');
var _ = require('lodash');

function parseSentence(input) {
    console.log('Parsing...');
    var words = new pos.Lexer().lex(input);
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);
    var importantWords = [];
    for(var i in taggedWords) {
	var taggedWord = taggedWords[i];
	var word = taggedWord[0];
	var tag = taggedWord[1];
	if(isNoun(tag))
	    importantWords.push({word: word, pos: 'noun', tag: tag});
	if(isVerb(tag))
	    importantWords.push({word: word, pos: 'verb', tag: tag});
	if(isInterjection(tag))
	    importantWords.push({word: word, pos: 'interjection', tag: tag});
	if(isPronoun(tag))
	    importantWords.push({word: word, pos: 'pronoun', tag: tag});
    }
    
    importantWords = _.sortByOrder(importantWords, ['weight'], ['desc']);
    
    return importantWords;
}

function isNoun(part_of_speech) {
    return _.startsWith(part_of_speech, 'NN');
}

function isVerb(part_of_speech) {
    return _.startsWith(part_of_speech, 'VB');
}

function isInterjection(part_of_speech) {
    return part_of_speech === 'UH';
}

function isPronoun(part_of_speech) {
    return part_of_speech === 'PP$' || part_of_speech === 'PRP';
}

