// CODING NOTES: Still working this out!


(function () {
    
            
    // INPUTTAG ====================================================================================
    //-- DESCRIPTION: BUILDS A INPUT, SELECT, TEXTAREA TAG WITH CHILD OPTIONS
     
    //-- PARAMETERS & PROPERTIES:
    //---- tagName (string) : html tagname
    //---- attributes (object) : main tag attributes
    //---- options (object) : child options for checkbox, radio buttons, or selectbox
    
    //-- PRIVATE METHODS:
    //----- getSelect() : get select tag and return as jquery object
    //----- getInput() : get input or inputs and return as jquery object
    //----- getTextarea() : get textarea and return as jquery object
    
    //-- PUBLIC METHODS:
    //----- set() : set tagName, attributes, and options
    //----- get() : get tagName, options attributes, or full object
    
        
    var inputTagMaker = function (tagName, attributes, options) {
        
        debug('LOG: inputTagMaker( ) ========');
        
        // VALIDATE FUNCTION INPUT ___________________________________
        
        //- tagName
        if(typeof tagName === 'undefined') {
            debug('ERROR: tagName not passed' +tagName + 'returned false' );
            return false;
        }
        
        //- attributes
        if (typeof(attributes)==='undefined') attributes = {};
        
        //- options
        if (typeof(options)==='undefined') options = {};

        
        // SET PROPERTIES (PRIVATE) __________________________________
        var InputTag = {};  
         
        // SET PROPERTIES (PUBLIC) ___________________________________
        inputTag.tagName = tagName;
        inputTag.attributes = attributes;
        inputTag.options = options;
                        
        
        // SET METHODS (PRIVATE) _____________________________________
                        
        // getSelect() : PRIVATE -------------------------------------
        //-- PARAMETERS:    
        //----- attributes (object) : sets the select html attributes
        //----- options (object) : sets the select tag child options
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html select element    
        getSelect = function(attributes, options) {
            
            debug('LOG: getSelect( ) : Private ----');
            
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
        
        
        // getInput() : PRIVATE --------------------------------------
        //-- PARAMETERS:
        //----- attributes (object) : sets the input[type=radio || type=checkbox] html attributes
        //----- options (object) : specific attributes (object) : merges attributes into the above attributes
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html input elements  
        getInput = function(attributes, options) {
            
            debug('LOG: getSelect( ) : Private ----');

            var parentTag     = $('<div/>');
            
            //- check for options
            if(options.length > 0) {
                
                //- loop options
                $.each( options, function(optionIndex, optionAttributes ) {
                    
                    debug( 'LOG: ADDING INPUT OPTION: ' + optionIndex );
                    
                    var labelTag      = $('<label/>'),
                        inputTag      = $('<input/>', attributes);
                    
                    //- handle label for html
                    if( attributes.hasOwnProperty('html') ) {
                        
                        debug( 'LOG: LABEL HTML' );
                        
                        labelTag = $('<label/>', {
                            'html' : attributes.html
                        });
                        
                        if( attributes.hasOwnProperty('id') ) {
                            labelTag.attr( 'for', attributes.id );
                        }
                        
                        debug( labelTag );

                    } 
                    
                    //- handle label for text 
                    if( attributes.hasOwnProperty('text') ) {
                        
                        debug( 'LOG: LABEL TEXT' );
                        
                        labelTag = $('<label/>', {
                            'text' : attributes.text
                        });
                        
                        if(attributes.hasOwnProperty('id') ) {
                            labelTag.attr('for', attributes.id );
                        }
                                                
                        debug( labelTag );
                        
                    }
                    
                    //- loop attributes in options data object
                    $.each( optionAttributes, function(attributeName, attributeValue ) {
                        if(attributeName !== 'text' || attributeName !== 'html')  {
                            debug( 'LOG: ADDING OPTION ATTRIBUTES '+ attributeName + ': ' + attributeValue );
                            inputTag.attr(attributeName, attributeValue);
                        }
                    });
                                                  
                    debug( 'LOG: BUILDING INPUT DOM' );
                    
                    // append to parent tag collection
                    parentTag.append( $('<div/>').append(inputTag).append(labelTag) );
                    
                });
                
                debug(parentTag);
                                    
                //- return parentTag 
                return parentTag;
                
            } 
            
            //- return single input tag 
            return  $('<input/>', inputTag.attributes);
        };
        
        
        
        // getTextarea() : PRIVATE -----------------------------------
        //-- PARAMETERS:
        //----- attributes (object) : sets the html attributes
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html textarea elements  
        getTextarea = function(attributes) {
            
            debug('LOG: getTextarea( ) : Private ----');
            
             //- return single textarea tag 
            return  $('<textarea/>', attributes);
            
        };


        // SET METHODS (PUBLIC) ______________________________________
                
        // InputTag.set() : PUBLIC -----------------------------------
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
        
    
        
        // InputTag.get() : PUBLIC -----------------------------------
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
            
            debug( 'LOG: InputTag.get( ) : Public ' + name  + ' ----' );
                        
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
        
        return InputTag;
    };     
    
    
    
        
    
    //- QUESTION ==============================================================
    //-- NOTES: EACH QUESTION OBJECT
    
    //-- PARAMETERS:
    //---- attributes (object) : must have a "attributes.question" and "attributes.answer"
    
    //-- PRIVATE / PROTECTED PROPERTIES:
    //----- question (string)
    //----- answer (string)
    //----- correct (boolean)
    //----- attempts (int)
    //----- tag (object: inputTag)
    
    //-- PUBLIC PROPERTIES:
    //----- input = string : users attempted answer

    //-- PUBLIC METHODS:
    //----- validate() : validates user input... returns true or false
    //----- getQuestion() : return protected "loaded" property
    
    
    var questionMaker = function (attributes) {
        
        debug('LOG: questionMaker( ) ========');
        
        
        // VALIDATE FUNCTION INPUT ___________________________________
        
        debug(attributes);
        
        //- attributes
        if(typeof attributes === 'undefined') {
            debug( 'ERROR: attributes not passed' + attributes + 'returned false' );
            return false;
        }
        
        //- attributes.question
        if(attributes.hasOwnProperty('question') === false) {
            debug( 'ERROR: attributes.question not passed returned false' );
            return false;
        }
        
        //- attributes.answer
        if(attributes.hasOwnProperty('answer') === false) {
            debug( 'ERROR: attributes.answer not passed returned false' );
            return false;
        }
        
        //- attributes.tag
        if(attributes.hasOwnProperty('tag') === false) {
            debug( 'ERROR: attributes.tag not passed returned false' );
            return false;
        }
        
        //- attributes.tag.tagName
        if(attributes.tag.hasOwnProperty('tagName') === false) {
            debug( 'ERROR: attributes.tag.tagName not passed returned false' );
            return false;
        }
        
        
        //- attributes.tag.tagName
        if(attributes.tag.hasOwnProperty('attributes') === false) {
            debug( 'ERROR: attributes.tag.attributes not passed returned false' );
            return false;
        }
        
        //- attributes.tag.tagName
        if(attributes.tag.hasOwnProperty('options') === false) {
            attributes.tag.options = {};
            return false;
        }
        
        
        // SET PROPERTIES (PRIVATE) __________________________________
        var Question = {},
            question = attributes.question,
            answer = attributes.answer,
            correct = false,
            attempts = 0,
            tag = inputTagMaker(attributes.tag.tagName, attributes.tag.attributes, attributes.tag.options);           

        
        // SET PROPERTIES (PUBLIC) ___________________________________
        Question.input = "";
                       
                           
        // SET METHODS (PUBLIC) ______________________________________
                   
        // Question.validate() : PUBLIC ------------------------------
        //-- PARAMETERS:    
        //----- inputAnswer = user attempted answer / input (string)
        
        //-- RETURNS: 
        //----- true or false
        
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
        
        
        // Question.getQuestion() : PUBLIC ---------------------------
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html input elements  
                
        Question.getQuestion = function(question, tag) {            
            debug('LOG: getQuestion( ) ----');
            
            var questionLabel = $("<label>", {
                    'id' : "question", 
                    "html" : question, 
                });
            
            if( tag.hasOwnProperty('attributes') ) {
                if( tag.attributes.hasOwnProperty('id') ) {
                    questionLabel.attr('for', tag.hasOwnProperty('id') );
                }
                if( tag.attributes.hasOwnProperty('required') ) {
                    if(required === true) {
                        questionLabel.addClass('required');
                    }
                }
            }
            
            return $("<div>", { "class" : "form-group" }).append( questionLabel ).append( tag.get() );
                    
        };

        
        return Question;
        
    };
 
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    
    
    
    
    
    // QUIZE ( OBJECT ) ====================================================================================
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
        debug('LOG: surveyMaker() ============================================================================');
        
        // VALIDATE FUNCTION INPUT ___________________________________

        if (typeof(options)==='undefined') options = {};
        debug(options);

        // SET PRIVATE PROPERTIES (PRIVATE) __________________________
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
            
        
        // SET METHODS (PRIVATE) _____________________________________
        
        // $.AJAX : PRIVATE ------------------------------------------
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
        
        
        // SET METHODS (PUBLIC) ______________________________________
                    
        // Quize.isLoaded() : PUBLIC ---------------------------------
        //-- RETURNS: protected "loaded"
        Quize.isLoaded = function() {
            debug('LOG: isLoaded() : return ' + loaded + ' ----');
            return loaded;
        };  
        
        // Quize.isCompleted() : PUBLIC ------------------------------
        //-- RETURNS: protected "completed" property
        Quize.isCompleted = function() {
            debug('LOG: isCompleted() : return ' + completed+ ' ----');
            return completed;
        };
        
        // Quize.getCurrent() : PUBLIC -------------------------------
        //-- RETURNS: protected "current" property... question
        Quize.getCurrent = function() {
            debug('LOG: getCurrent() : return ' + current+ ' ----');
            return current;
        };
        
        // Quize.setCurrent() : PUBLIC -------------------------------
        //-- PARAMETERS: value is the current question number to be set... default: 0
        //-- RETURNS: true of false
        Quize.setCurrent = function(value) {
            debug('LOG: setCurrent() : passed ' + value+ ' ----');
            
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
                
                
        //- Quize.setCorrect() ---------------------------------------
        //-- PARAMETERS: value = optional : default will be 1
        Quize.setCorrect = function(value) {
            debug('LOG: setCorrect( ' + value + ' )'+ ' ----');
            
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
        
        
        //- Quize.setIncorrect() -------------------------------------
        //-- PARAMETERS: value = optional : default will be 1
        Quize.setIncorrect = function(value) {
            debug('LOG: setIncorrect( ' + value + ' )'+ ' ----');
            
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}());

