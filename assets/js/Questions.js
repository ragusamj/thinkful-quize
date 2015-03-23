
(function () {
    
    
    // CODING NOTES: Still working this out!
    
    
    //- QUIZE ( OBJECT ) ==============================================================
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
    
    //-- PUBLIC METHODS:
    //----- isLoaded() : return protected "loaded" property
    //----- isCompleted() : return protected "completed" property
    //----- getCurrent() : return protected "current" property
    //----- setCorrect(value) : default is 1
    //----- setIncorrect(value) : default is 1
    
    var quizeMaker = function (options) {
        debug('LOG: surveyMaker() ==============================================================');
        
        // VALIDATE FUNCTION INPUT  -----------------------------

        if (typeof(options)==='undefined') options = {};
        debug(options);

        // SET PROPERTIES (PRIVATE)  -----------------------------
        var Quize = {},
            src = src,
            debug = debug,
            current = 0,
            loaded = false,
            questions = [],
            completed = false,
            results = {
                correct: 0,
                incorrect: 0,
                attempts: 0
            }
            
            
        // $.AJAX : PRIVATE -------------------------------
        $.ajax({
            url:src, 
            dataType: "json",  
            beforeSend: function( xhr ) {
                
                // $.AJAX.BEFORE : PRIVATE 
                
                debug('LOG: GETTING JSON DATA QUESTIONS');
                debug(xhr); 
            }
        })
        .done(function( jsonData ) {
            
            // $.AJAX.DONE : PRIVATE 

            debug('LOG: RETURN JSON DATA QUESTIONS');
            debug(jsonData);
            
            if(jsonData.hasOwnProperty('questions') === false){
                debug('ERROR: ERROR DATA RETURN WITH NO "questions"');
                return false;
            }     
            
            debug('LOG: LOOPING QUESTIONS');
            $.each( jsonData.questions, function( key, attributes ) {
                
                debug('LOG: LOOPING [' + key + '] QUESTION');
                
                if(value.hasOwnProperty('question') === false) {
                    debug('ERROR: DATA ' + key + ' RETURN WITH NO "questions"');
                    return false;
                }
                
                if(value.hasOwnProperty('answer') === false) {
                    debug('ERROR: DATA ' + key + ' RETURN WITH NO "answer"');
                    return false;
                }
                
                if(value.hasOwnProperty('required') === false) {
                    debug('ERROR: DATA ' + key + ' RETURN WITH NO "required"');
                    return false;
                }
                
                if(value.hasOwnProperty('tag') === false) {
                    debug('ERROR: DATA ' + key + ' RETURN WITH NO "tag"');
                    return false;
                }
                
                debug('LOG: CREATE AND PUSH QUESTION OBJECT to "questions" ARRAY ');
                questions.push( questionMaker(attributes) );
                return true;                
            });  
            
            debug(questions);                            
            
            debug('LOG: ASSIGN DATA TO PRIVATE "data" PROPERTY');
            loaded = true; 
                
            window.onhashchange = function () {
                debug('LOG: onhashchange() Event');
                //setQuestionNumber();
                //$("#question").html(data.questions[current].question);
            }
                
            $(document).ready(function(){      
                debug('LOG: domready() Event');
                //setQuestionNumber();
                //$("#question").html(data.questions[current].question);
                //getQuestionInput();
            });
            
        });
                    
        // Quize.isLoaded() : PUBLIC -------------------------------
        //-- RETURNS: protected "loaded"
        Quize.isLoaded = function() {
            debug('LOG: isLoaded() : return ' + loaded + ' ------------------------------');
            return loaded;
        };  
        
        // Quize.isCompleted() : PUBLIC ----------------------------
        //-- RETURNS: protected "completed" property
        Quize.isCompleted = function() {
            debug('LOG: isCompleted() : return ' + completed+ ' ------------------------------');
            return completed;
        };
        
        // Quize.getCurrent() : PUBLIC -----------------------------
        //-- RETURNS: protected "current" property... question
        Quize.getCurrent = function() {
            debug('LOG: getCurrent() : return ' + current+ ' ------------------------------');
            return current;
        };
        
        // Quize.setCurrent() : PUBLIC -----------------------------
        //-- PARAMETERS: value is the current question number to be set... default: 0
        //-- RETURNS: true of false
        Quize.setCurrent = function(value) {
            debug('LOG: setCurrent() : passed ' + value+ ' ------------------------------');
            
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
                
                
        //- Quize.setCorrect() -----------------------------
        //-- PARAMETERS: value = optional : default will be 1
        Quize.setCorrect = function(value) {
            debug('LOG: setCorrect( ' + value + ' )'+ ' ------------------------------');
            
            // SET DEFAULT TO 1 IF "undefined"
            if (typeof(value)==='undefined') value = 1;
            
            // IF RESULTS ADDS UP TO TOTAL QUESTIONS.. DECREMENT "incorrect"
            if(( results.correct + results.incorrect ) === questions.length ) {
                results.incorrect = results.incorrect - value;
                debug('LOG: DECREMENT INCORRECT: ' + results.correct );
            } 
            
            results.correct = results.correct + value;
            debug('LOG: SET CORRECT: ' + results.correct );
        };
        
        
        //- Quize.setIncorrect() -----------------------------
        //-- PARAMETERS: value = optional : default will be 1
        Quize.setIncorrect = function(value) {
            debug('LOG: setIncorrect( ' + value + ' )'+ ' ------------------------------');
            
            // SET DEFAULT TO 1 IF "undefined"
            if (typeof(value)==='undefined') value = 1;
            
            // IF RESULTS ADDS UP TO TOTAL QUESTIONS.. DECREMENT "correct"
            if(( results.incorrect + results.incorrect ) === questions.length ) {
                results.correct = results.correct - value;
                debug('LOG: DECREMENT CORRECT: ' + results.correct );
            } 
            
            results.incorrect = results.incorrect + value;
            debug('LOG: SET INCORRECT: ' + results.incorrect );
            
        };
    
        return Quize;
        
    };
    
    
        
    
    //- QUESTION ==============================================================
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
    
    var questionMaker = function (attributes) {
        
        debug('LOG: questionMaker( )'+ ' ==============================================================');
        
        // VALIDATE FUNCTION INPUT  -----------------------------
        
        debug(attributes);
        
        //- attributes
        if(typeof attributes === 'undefined') {
            debug('ERROR: attributes not passed' + attributes + 'returned false' );
            return false;
        }
        
        //- attributes.question
        if(attributes.hasOwnProperty('question') === false) {
            debug("ERROR: attributes.question not passed returned false" );
            return false;
        }
        
        //- attributes.answer
        if(attributes.hasOwnProperty('answer') === false) {
            debug("ERROR: attributes.answer not passed returned false" );
            return false;
        }
        
        //- attributes.required
        if(attributes.hasOwnProperty('required') === false) {
            debug("LOG: required not passed, set to false" ); 
            attributes.required = false;
        }
        
        if(typeof attributes.required !== boolean) {
            debug("LOG: required missing, set defualt to false" );
            attributes.required = false;
        }
        
        
        // SET PROPERTIES (PRIVATE)  -----------------------------
        var Question = {},
            answer = answer,
            question = question,
            required = required,
            tag = tagObj,
            correct = false,
            attempts = 0;
            
            
        // SET PROPERTIES (PUBLIC)  -----------------------------
        Question.input = "";
                   
                   
        // Question.validate() : PUBLIC -----------------------------
        //-- PARAMETERS: inputAnswer...   
        //----- inputAnswer = user attempted answer / input (string)
        
        //-- RETURNS: 
        //----- if "tagName" : as string
        //----- if "option" : as object (need to change to string)
        //----- if "attribute" : as string
        //----- if all html elements : as string
        
        Question.validate = function(answerInput) {
            Question.input = answerInput;
            if(answer === answerInput) {
                question.valid = true;
                return true;
            } else {
                question.valid = false;
                return false;
            }
        };
        
        Question.getQuestion = function() {            
            debug('LOG: getQuestion( )'+ ' ------------------------------');
            
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //- INPUTTAG ==============================================================
    //-- NOTES: INPUT TAG OBJECT.  
    //          EXTENDING TO MERGE OPTION WITH THE TAG & ADD VALIDATION
     
    //-- PROPERTIES:
    //---- "tagName": string
    //---- "name" : string
    //---- "type": string
    //---- "options": array
    
    //-- METHODS:
    
    var inputTagMaker = function (tagName, attributes, options) {
        
        debug('LOG: inputTagMaker( ) ==============================================================');
        
        // VALIDATE FUNCTION INPUT  -----------------------------
        
        //- tagName
        if(typeof tagName === 'undefined') {
            debug('ERROR: tagName not passed' +tagName + 'returned false' );
            return false;
        }
        
        //- attributes
        if (typeof(attributes)==='undefined') attributes = {};
        
        //- options
        if (typeof(options)==='undefined') options = {};

        
        // SET PROPERTIES (PRIVATE)  -----------------------------
        var InputTag = {};  
         
        // SET PROPERTIES (PUBLIC)  -----------------------------
        inputTag.tagName = tagName;
        inputTag.attributes = attributes;
        inputTag.options = options;
                        
        
        // getSelect() : PRIVATE -----------------------------
        //-- PARAMETERS:    
        //----- attributes (object) : sets the select html attributes
        //----- options (object) : sets the select tag child options
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html elemnt    
        getSelect = function(attributes, options) {
            
            debug('LOG: getSelect( ) : Private ' + ' ------------------------------');
            
            var tagAttributes,
                optionAttributes;

            var parentTag = $('<select/>', inputTag.attributes);

            if(options.length > 0) {
                $.each( options, function(optionIndex, optionAttributes ) {
                    debug( 'LOG: ADDING OPTION: ' + optionIndex );
                    parentTag.append(getTag('option', optionAttributes));
                });
            } 
            
            debug(parentTag);
            return parentTag;
        };
        
        
         // getInput() : PRIVATE -----------------------------
        //-- PARAMETERS:    
        //----- attributes (object) : sets the input[type=radio || type=checkbox] html attributes
        //----- option specific attributes (object) : merges attributes into the above attributes
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html elemnt    
        getInput = function(attributes, options) {
            
            debug('LOG: getSelect( ) : Private ' + ' ------------------------------');

            var parentTag     = $('<div/>');
            
            if(options.length > 0) {
                
                $.each( options, function(optionIndex, optionAttributes ) {
                    
                    debug( 'LOG: ADDING INPUT OPTION: ' + optionIndex );
                    
                    var labelTag      = $('<label/>'),
                        inputTag      = $('<input/>', inputTag.attributes);
                        
                    if( inputTag.attributes.hasOwnProperty('html') ) {
                        
                        debug( 'LOG: LABEL HTML' );
                        
                        labelTag = $('<label/>', {
                            'html' : inputTag.attributes.html
                        });
                        
                        if( inputTag.attributes.hasOwnProperty('id') ) {
                            labelTag.attr( 'for', inputTag.attributes.id );
                        }
                        
                        debug( labelTag );

                    } 
                    
                    if( inputTag.attributes.hasOwnProperty('text') ) {
                        
                        debug( 'LOG: LABEL TEXT' );
                        
                        labelTag = $('<label/>', {
                            'text' : inputTag.attributes.text
                        });
                        
                        if(inputTag.attributes.hasOwnProperty('id') ) {
                            labelTag.attr('for', inputTag.attributes.id );
                        }
                                                
                        debug( labelTag );
                        
                    }
                    
                    $.each( optionAttributes, function(attributeName, attributeValue ) {
                        if(attributeName !== 'text' || attributeName !== 'html')  {
                            debug( 'LOG: ADDING OPTION ATTRIBUTES '+ attributeName + ': ' + attributeValue );
                            inputTag.attr(attributeName, attributeValue);
                        }
                    });
                                                  
                    debug( 'LOG: BUILDING INPUT DOM' ); 
                    parentTag.append( $('<div/>').append(inputTag).append(labelTag) );
                });
                
                debug(parentTag);
                return parentTag;
            } 
            
            return  $('<input/>', inputTag.attributes);
        };

        
        
              
                
        // InputTag.set() : PUBLIC -----------------------------
        //-- PARAMETERS: name, value...   
        //----- if name = "tagName" : set the html tagName
        //----- if name = "options" : push to the option in array
        //----- if name set attribute set the option in array
        
        //-- RETURNS: 
        //----- true of false    
            
        InputTag.set = function(name, value) {
            if(name.toLowerCase() = 'tagname') {
                inputTag.tagName = value;
                return true;
            }
            if(name.toLowerCase() = 'options') {
                inputTag.options.push(value);
                return true;
            }
            inputTag.attributes[name.replace(/[^a-zA-Z]+/g,"")] = value.replace(/[^0-9a-z-]/g,"");
            return true;
        };
        
    
        
        // InputTag.get() : PUBLIC -----------------------------
        //-- PARAMETERS: name...   
        //----- name (string / int) : 
        //---------- "tagName" (string) : get the html tagName
        //---------- "[optionInt]" (int) : check for int index and get the options property   
        //---------- "[attributeName]" (string) : check and get the attribute property   
        //---------- get() : Defualt : get full html string 
        
        //-- RETURNS: 
        //----- if "tagName" : as string
        //----- if "option" : as object (need to change to string)
        //----- if "attribute" : as string
        //----- if all html elements : as string
    
        InputTag.get = function(name) {       
            
            debug( 'LOG: InputTag.get( ) : Public ' + name  + ' ------------------------------' );
                        
            //- get tagname
            if( name.toLowerCase() === 'tagname' ) {
                debug( 'LOG: getting tagName: '+ inputTag.tagName );
                return inputTag.tagName.toLowerCase().replace(/[^a-zA-Z]+/g,"");
            }
            
            //- get option
            if ( isNaN(name) === true ) {
                if( inputTag.options.length > name ) {
                    debug( 'LOG: getting option['+name+'] : '+ inputTag.options[name] );
                    return inputTag.options[name];
               } else {
                    debug( 'WARNING: option['+name+'] greater then options length : ' + options.length );
                    return inputTag.options[name];
               }
            }
       
            //- get attribute
            if( inputTag.attributes.hasOwnProperty(name) === true ){
                debug( 'LOG: checking and getting attribute: ' + inputTag.attributes[name] );
                return inputTag.attributes[name];
            }
            
            //- get select
            if(inputTag.tagName == 'select') {
                debug( 'LOG: get select');
                return getSelect(inputTag.attributes, inputTag.options);                
            }
            
            //- get input
            if(inputTag.tagName == 'input') {
                debug( 'LOG: get input');
                return getInput(inputTag.attributes, inputTag.options);                
            }
            
            //- get textarea
            if(inputTag.tagName == 'textarea') {
                debug( 'LOG: get textarea');
                //return getTextArea(inputTag.attributes, inputTag.options);                
            }
        };
    };    
}());

