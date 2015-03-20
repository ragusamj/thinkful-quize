
(function () {
    
    
    // CODING NOTES: Still working this out!
    
    
    //- QUESTIONS ( OBJECT ) ==============================================
    //-- DESCRIPTION: COLLECTION OF QUESTIONS

    //-- PRIVATE / PROTECTED PROPERTIES:
    //----- debug = boolean
    //----- loaded = boolean
    //----- current = int
    //----- src = string
    //----- questions = array
    //----- results = object { 
    //-----   correct = int
    //-----   incorrect = int
    //-----   attempts = int  
    //----- }
    //----- completed = boolean
    
    //-- PUBLIC PROPERTIES:
    //----- NULL
    
    //-- PUBLIC METHODS:
    //----- isLoaded() : return protected "loaded" property
    //----- isCompleted() : return protected "completed" property
    //----- getCurrent() : return protected "current" property
    //----- setCorrect(value) : default is 1
    //----- setIncorrect(value) : default is 1
    
    var surveyMaker = function (questions) {
        
        debug('- surveyMaker( ' + questions + '  )');
        
        if(typeof questions === 'undefined') {
            debug("ERROR: questions not passed");
        }
        
        if(questions.length === 0) {
            debug("WARNING: questions length 0");
        }
        
        var Survey = {},
            debug = false,
            loaded = false,
            current = 0,
            src = '/json/data.json',
            questions = [],
            results = {
                correct: 0,
                incorrect: 0,
                attempts: 0
            },
            completed = false
            
            
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
            loaded = true; 
            
            if(jsonData.hasOwnProperty('questions') === false){
                debug('- ERROR DATA RETURN WITH NO "questions"');
                return false;
            }     
            
            debug('- LOOPING QUESTIONS');
            $.each( jsonData.questions, function( key, value ) {
                
                if(value.hasOwnProperty('question') === false) {
                    debug('- ERROR DATA ' + key + ' RETURN WITH NO "questions"');
                    return;
                }
                
                if(value.hasOwnProperty('answer') === false) {
                    debug('- ERROR DATA ' + key + ' RETURN WITH NO "answer"');
                    return;
                }
                
                if(value.hasOwnProperty('required') === false) {
                    debug('- ERROR DATA ' + key + ' RETURN WITH NO "required"');
                    return;
                }
                
                if(value.hasOwnProperty('tag') === false) {
                    debug('- ERROR DATA ' + key + ' RETURN WITH NO "tag"');
                    return;
                }
                
                debug('- CREATE INPUT OBJECT');
                var inputTagObj = inputTagMaker();
                
                debug('- CREATE QUESTION OBJECT');
                var questionObj = questionMaker(value.question, value.answer, value.required, inputTag);
                
                ebug('- PUSH QUESTION OBJECT');
                questions.push( questionObj );
                
            });  
            
            // NEED TO ADD DETECTION
            questions = jsonData.questions;
                
            window.onhashchange = function () {
                debug('- onhashchange() Event');
                //setQuestionNumber();
                //$("#question").html(data.questions[current].question);
            }
                
            $(document).ready(function(){      
                debug('- domready() Event');
                //setQuestionNumber();
                //$("#question").html(data.questions[current].question);
                //getQuestionInput();
            });
            
        });
                    
        // isLoaded() 
        //-- RETURNS: protected "loaded"
        Survey.isLoaded = function() {
            debug('- isLoaded() : return ' + loaded);
            return loaded;
        };  
        
        // isCompleted()
        //-- RETURNS: protected "completed" property
        Survey.isCompleted = function() {
            debug('- isCompleted() : return ' + completed);
            return completed;
        };
        
        
        // getCurrent() 
        //-- RETURNS: protected "current" property... question
        Survey.getCurrent = function() {
            debug('- getCurrent() : return ' + current);
            return current;
        };
        
        // setCurrent() 
        //-- PARAMETERS: value is the current question number to be set... default: 0
        //-- RETURNS: true of false
        Survey.setCurrent = function(value) {
            debug('- setCurrent() : passed ' + value);
            
            if(typeof value === 'undefined') {
                debug("ERROR: value not passed");
            }
            
            /*
                Note: 
                I Want to prtect set to ensure the UI get updated
                
                psuedo code
                1) if value is int proceed
                2) if value is in range of questions length proceed
                3) change up the UI to new set current value?
                4) once ui is succesfully changed set current?                
            */
        };
                
                
        //- setCorrect() 
        //-- PARAMETERS: value = optional : default will be 1
        Survey.setCorrect = function(value) {
            debug('- setCorrect( ' + value + ' )');
            
            // SET DEFAULT TO 1 IF "undefined"
            if (typeof(value)==='undefined') value = 1;
            
            // IF RESULTS ADDS UP TO TOTAL QUESTIONS.. DECREMENT "incorrect"
            if(( results.correct + results.incorrect ) === questions.length ) {
                results.incorrect = results.incorrect - value;
                debug('- DECREMENT INCORRECT: ' + results.correct );
            } 
            
            results.correct = results.correct + value;
            debug('- SET CORRECT: ' + results.correct );
        };
        
        
        //- setIncorrect()
        //-- PARAMETERS: value = optional : default will be 1
        Survey.setIncorrect = function(value) {
            debug('- setIncorrect( ' + value + ' )');
            
            // SET DEFAULT TO 1 IF "undefined"
            if (typeof(value)==='undefined') value = 1;
            
            // IF RESULTS ADDS UP TO TOTAL QUESTIONS.. DECREMENT "correct"
            if(( results.incorrect + results.incorrect ) === questions.length ) {
                results.correct = results.correct - value;
                debug('- DECREMENT CORRECT: ' + results.correct );
            } 
            
            results.incorrect = results.incorrect + value;
            debug('- SET INCORRECT: ' + results.incorrect );
            
        };
    

        return Survey;
        
    };
    
    
        
    
    //- QUESTION --------------------------------------
    //-- NOTES: EACH QUESTION OBJECT
    
    //-- PRIVATE / PROTECTED PROPERTIES:
    //----- answer = string
    //----- label = string
    //----- correct = boolean
    //----- required = boolean
    //----- attempts = int
    //----- tag = object -- "inputTag"
    
    //-- PUBLIC PROPERTIES:
    //----- input = string : users attempted answer

    //-- PUBLIC METHODS:
    //----- validate() : validates user input... returns true or false
    //----- getQuestion() : return protected "loaded" property
    
    var questionMaker = function (question, answer, tagObj, required) {
        
        debug('- questionMaker( ' + label + ',' + answer + ',' + required + ',' + tagObj + '   )');
                
        if(typeof question === 'undefined') {
            debug("ERROR: question not passed" + question + 'returned false' );
            return false;
        }
        
        if(typeof answer === 'undefined') {
            debug("ERROR: answer not passed" + answer + 'returned false');
            return false;
        }
        
        if(typeof tagObj !== 'object' ) {
            debug("ERROR: tagObj is not a object... returned false");
            return false;
        }
        
        if (typeof(required)==='undefined') value = false;
        
        
        var Question = {},
            answer = answer,
            question = question,
            required = required,
            tag = tagObj,
            correct = false,
            attempts = 0;
            
        Question.input = "";
                                
        Question.validate = function(value) {
            Question.input = value;
            if(answer === value) {
                question.valid = true;
                return true;
            } else {
                question.valid = false;
                return false;
            }
        };
        
        Question.getQuestion = function() {            
            debug('- getQuestion( )');
            
            var questionWrapper = $("<div>", {"class" : "form-group"}),
                questionLabel = $("<label>", {
                    'id' : "question", 
                    "text" : question, 
                    "for": "[ tag.getTagId() ]"
                });
            
            if(required === true) {
                questionLabel.addClass('required');
            }
            
            $(questionWrapper).append(questionLabel);
            
            // NEED TO BUILD OUT QUESTION INPUTS HERE
            
        };

        
        return Question;
        
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
        
        var InputTag = {};
        
        inputTag.tagName = '';
        inputTag.name = '';
        inputTag.type = '';
        inputTag.options = [];
                        
        InputTag.set = function(index) {
            
        };
        
        InputTag.get = function(index) {
            
        };

        return InputTag;
        
    };
    
    
}());








/*

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
*/







