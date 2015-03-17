


(function () {
    
    
    // CODING NOTES: Still working this out!
    
    
    //- QUESTIONS --------------------------------------
    //-- NOTES: COLLECTION OF QUESTIONS

    //-- PRIVATE PROPERTIES:
    //----- loaded = false
    //----- questions = array
    //----- results = object { 
    //-----   correct = int
    //-----   incorrect = int
    //-----   attempts = int  
    //----- }
    
    //-- PUBLIC PROPERTIES:
    //----- completed = boolean
    
    //-- METHODS:
    //----- setCorrect() 
    //----- setIncorrect()
    
    var surveyMaker = function (questions) {
        
        if(typeof question === 'undefined') {
            console.log("ERROR: questions not passed");
        }
        
        if(questions.length === 0) {
            console.log("WARNING: questions length 0");
        }
        
        var survey = {},
            loaded = false,
            questions = [],
            results = {
                correct: 0,
                incorrect: 0,
                attempts: 0
            },
            completed = false
            
        survey.completed = false;
        
        inputTag.isLoaded = function() {
            return loaded;
        };
                    
        inputTag.setCorrect = function(correct) {
            // NEED TO ADD MORE TO RECALCUALTE WITH TOTAL
            results.correct = correct;
        };
        
        inputTag.setIncorrect = function(incorrect) {
            // NEED TO ADD MORE TO RECALCUALTE WITH TOTAL
            results.incorrect = incorrect;
        };
        
        inputTag.isCompleted = function() {
            return completed;
        };

        return survey;
        
    };
    
    
    //- QUESTION --------------------------------------
    //-- NOTES: EACH QUESTION OBJECT
    
    //-- PROPERTIES:
    //---- "question": string
    //---- "name" : string
    //---- "answer": string
    //---- "required": boolean
    //---- "tag": object
    
    //-- METHODS:
    
    var questionMaker = function (question, answer, options) {
        
        if(typeof question === 'undefined') {
            console.log("ERROR: question not passed");
        }
        
        if(typeof answer === 'undefined') {
            console.log("ERROR: answer not passed");
        }
        
        var question = {};
        var answer = answer;
        
        a = typeof a !== 'undefined' ? a : 42;
        b = typeof b !== 'undefined' ? b : 'default_b';
        
        question.question = question;
        question.required = required;
        question.input = '';
        
        question.tag = { };
                        
        question.validate = function(value) {
            question.input = value;
            if(answer === value) {
                question.valid = true;
                return true;
            } else {
                question.valid = false;
                return false;
            }
        };
        
        return question;
        
    };
    
    
    
    //- INPUTTAG  --------------------------------------
    //-- NOTES: INPUT TAG OBJECT.  
    //          EXTENDING TO MERGE OPTION WITH THE TAG & ADD VALIDATION
     
    //-- PROPERTIES:
    //---- "tagName": string
    //---- "name" : string
    //---- "type": string
    //---- "options": array
    
    //-- METHODS:
    
    var inputTagMaker = function (name, answer) {
        
        var inputTag = {};
        
        inputTag.tagName = '';
        inputTag.name = '';
        inputTag.type = '';
        inputTag.options = [];
                        
        inputTag.set = function(index) {
            
        };
        
        inputTag.get = function(index) {
            
        };

        return inputTag;
        
    };
    
    
}());


(function () {
    'use strict';    
         
    var Questions = function(){
        
        var that = this,
            isDebug = true,
            current = 0,
            hash = '', 
            src = '/json/data.json',
            length = 0,
            data = {
                loaded: false
            }
            
            
        function loadData (){
            
            debug("- CALL LOAD DATA");
            
            $.ajax({
                url:src, 
                dataType: "json",  
                beforeSend: function( xhr ) {
                    debug('- GETTING JSON DATA QUESTIONS');
                    debug(xhr); 
                },
            })
            .done(function( jsonData ) {

                debug('- RETURN JSON DATA QUESTIONS');
                debug(jsonData);
                
                debug('- ASSIGN DATA TO PRIVATE "data" PROPERTY');
                jsonData.loaded = true; 
                data = jsonData;
                length = jsonData.questions.length; 
                
                window.onhashchange = function () {
                    setQuestionNumber();
                    $("#question").html(data.questions[current].question);
                }
                
                $(document).ready(function(){      
                    setQuestionNumber();
                    $("#question").html(data.questions[current].question);
                    getQuestionInput();
                });
                
            });   
        }
        
        function setQuestionNumber() {
            if(window.location.hash) {
                hash = window.location.hash.replace("#", "");
                debug('- BOOKMARK DETECTED ' + hash); 
                
                if(!isNaN(hash)) {
                    hash = parseInt(hash);
                    debug('- BOOKMARK INT ' + hash); 
                    
                    if(hash < length) {
                        debug('- SET QUESTION NUMBER: ' + hash);                                
                        current = parseInt(hash);
                    }
                }
            }
            
            debug('- KEEP QUESTION NUMBER: ' + 0); 
        }
        
        function getQuestionInput() {
           
            debug('- GET QUESTION INPUT');
            
            var tagObject = data.questions[current].tag;
            var tags = {};
            var tagsArray = [];
            var tag = {};

            var tagName = tagObject.name;
            var tagType = tagObject.type;
            var tagOptions = {};
            
            if(tagObject.hasOwnProperty('options')) {
                var tagOptions =  tagObject.options;
            }
            
            debug('- TAG OBJECT' );
            debug(tagObject);
            
            if(tagName == "input") {
                
                if(tagType == "text") {
                    
                    debug("ANSWER IS A INPUT TEXT");
                    
                    tag = $('<'+tagName+'/>', {
                        'id':'answer-'+current,
                        'name':'answer-'+index,
                        'class':'answer form-control',
                        'type':tagType,
                    });
                    
                    debug(tag);
                    
                    tagsArray.push(tag);
                    
                }
                
                if(tagType == "radio" || tagType == "checkbox") {
                    
                    debug("ANSWER IS A INPUT " + tagType.toUpperCase() );
                    
                    $.each( tagOptions, function( index, inputObject ){
                        debug('index: ' + index ); 
                        debug(inputObject);
                        
                        tag = $('<'+tagName+'/>', {
                            'id':'answer-'+index,
                            'name':'answer-'+index,
                            'class':'answer form-control',
                            'type':tagType,
                        });
                        
                        debug(tag);
                        
                        tagsArray.push(tag);
                    });
                    
                    var test = $('<'+tagName+'/>', {
                        'id':'answer-'+current,
                        'class': 'answer form-control',
                        'type': tagType,
                    });
                    
                }
                
            }
            
            debug( data.questions[current].tag );
            //debug(tagsArray);
            
        }
        
        function debug(message) {
            if(isDebug === true) {
                console.log(message);
            }
        }
        
        function getMemberDetails () {
            debug(data);
            debug('getMemberDetails');
        } 

        return{
            loadData:loadData,
            get:getMemberDetails
        }
            
    }();

    
    Questions.loadData();
    
        
}());







