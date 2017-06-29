'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.b4566e63-7745-4a8f-a742-0e005dc4b67b"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Dog Facts';

/**
 * Array containing dog facts.
 */
var FACTS = [
    "Cats are the most popular pet in the United States.",
    "A group of cats is called a clowder.",
    "There are cats who have survived falls from over 32 stories onto concrete.",
    "Cats have over 20 muscles that control their ears.",
    "70% of a cat's life is spent sleeping.",
    "The world's longest cat measured 48.5 inches long",
    "Cats are often lactose intolerant",
    "The oldest cat video on YouTube dates back to 1894",
    "Female cats are typically right-pawed while male cats are typically left-pawed.",
    "Abraham Lincoln kept four cats in the White House.",
    "Isaac Newton is credited with inventing the cat door.",
    "A cat can jump up to six times its length.",
    "A house cat is faster than Usain Bolt.",
    "Cats only sweat through their foot pads."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random dog fact from the dog facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a dog fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};