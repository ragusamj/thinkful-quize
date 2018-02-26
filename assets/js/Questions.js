// CODING NOTES: Still working this out!
var isDebug = true;


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
                
        // VALIDATE FUNCTION INPUT ___________________________________
        if(typeof tagName === 'undefined') {
            debug('ERROR: tagName not passed' +tagName + 'returned false' );
            return false;
        }
        
        if (typeof(attributes)==='undefined') {
            attributes = {};
        }
        
        if (typeof(options)==='undefined') {
            options = {};
        }
        
        
        // SET PROPERTIES (PRIVATE) __________________________________
        var InputTag = {};  
         
        // SET PROPERTIES (PUBLIC) ___________________________________
        InputTag.tagName = tagName;
        InputTag.attributes = attributes;
        InputTag.options = options;
                
        
        // SET METHODS (PRIVATE) _____________________________________

        // getSelect() : PRIVATE -------------------------------------
        //-- PARAMETERS:    
        //----- attributes (object) : sets the select html attributes
        //----- options (object) : sets the select tag child options
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html select element    
        getSelect = function(attributes, options) {
                        
            var tagAttributes,
                optionAttributes;

            var parentTag = $('<select/>', InputTag.attributes);
            parentTag.addClass("form-control");

            if(options.length > 0) {
                
                parentTag.append( $('<option/>', { "value" : "", "text" :"Please Select a Option" } ) );
                
                $.each( options, function(optionIndex, optionAttributes ) {
                    debug( 'LOG: ADDING OPTION: ' + optionIndex );
                    debug( optionAttributes );
                    parentTag.append( $('<option/>', { "value" : optionAttributes.value, "text" : optionAttributes.html } ) );
                });
            } 
            
            return parentTag;
        };
        
        
        // getInput() : PRIVATE --------------------------------------
        //-- PARAMETERS:
        //----- attributes (object) : sets the input[type=radio || type=checkbox] html attributes
        //----- options (object) : specific attributes (object) : merges attributes into the above attributes
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html input elements  
        getInput = function(attributes, options) {
            
            if (typeof(options)==='undefined') {
                options = [];
            }

            if(options.hasOwnProperty('length') === false) {
                options.length = 0;                
            }

            var parentTag     = $('<div/>', { "class" : "input-list" });
            
            if(options.length > 0) {
                                
                $.each( options, function(optionIndex, optionAttributes ) {
                                                            
                    var labelTag      = $('<label/>'),
                        inputTag      = $('<input/>', attributes);
                    
                    //- handle label for html
                    if( optionAttributes.hasOwnProperty('html') ) {
                        
                        labelTag = $('<label/>', {
                            'text' : optionAttributes.html
                        });
                        
                        if( optionAttributes.hasOwnProperty('id') ) {
                            labelTag.attr( 'for', optionAttributes.id );
                        }
                    } 
                    
                    //- handle label for text 
                    if( attributes.hasOwnProperty('text') ) {                        
                        
                        labelTag = $('<label/>', {
                            'text' : attributes.text
                        });
                        
                        if(attributes.hasOwnProperty('id') ) {
                            labelTag.attr('for', attributes.id );
                        }                        
                    }
                    
                    //- loop attributes in options data object
                    $.each( optionAttributes, function(attributeName, attributeValue ) {
                        if(attributeName !== 'text' || attributeName !== 'html')  {
                            inputTag.attr(attributeName, attributeValue);
                        }
                    });
                    
                    inputTag.addClass('answer');
                    parentTag.append( $('<div/>', { "class" : "input-list-item" }).append(inputTag).append(labelTag) );
                    
                });
                
                return parentTag;
                
            } 
            
            return  $('<input/>', attributes).addClass('answer form-control');
        };
        
        
        
        // getTextarea() : PRIVATE -----------------------------------
        //-- PARAMETERS:
        //----- attributes (object) : sets the html attributes
        
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html textarea elements  
        getTextarea = function(attributes) {
             //- return single textarea tag 
            return  $('<textarea/>', attributes).addClass("form-control");
            
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
                InputTag.tagName = value;
                return true;
            }
            if(name.toLowerCase() = 'options') {
                InputTag.options.push(value);
                return true;
            }
            InputTag.attributes[name.replace(/[^a-zA-Z]+/g,"")] = value.replace(/[^0-9a-z-]/g,"");
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
                        
            if( typeof(name)==='undefined' ) {
                name = '';
            }
            
            //- get tagname
            if( name.toLowerCase() === 'tagname' ) {
                return InputTag.tagName.toLowerCase().replace(/[^a-zA-Z]+/g,"");
            }
            
            //- get option
            if( isNaN(name) === true ) {
                if( InputTag.options.length > name ) {
                    return InputTag.options[name];
               } else {
                    return InputTag.options[name];
               }
            }
       
            //- get attribute
            if( InputTag.attributes.hasOwnProperty(name) === true ){
                return InputTag.attributes[name];
            }
            
            //- get select
            if(InputTag.tagName.toLowerCase() === 'select') {
                return getSelect(InputTag.attributes, InputTag.options);                
            }
            
            //- get input
            if(InputTag.tagName.toLowerCase() === 'input') {
                return getInput(InputTag.attributes, InputTag.options);                
            }
            
            //- get textarea
            if(InputTag.tagName.toLowerCase() === 'textarea') {
                return getTextarea(InputTag.attributes, InputTag.options);                
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
        
                
        // VALIDATE FUNCTION INPUT ___________________________________
                
        //- attributes
        if(typeof attributes === 'undefined') {
            return false;
        }
        
        //- attributes.question
        if(attributes.hasOwnProperty('question') === false) {
            return false;
        }
        
        //- attributes.answer
        if(attributes.hasOwnProperty('answer') === false) {
            return false;
        }
        
        //- attributes.tag
        if(attributes.hasOwnProperty('tag') === false) {
            return false;
        }
        
        //- attributes.tag.tagName
        if(attributes.tag.hasOwnProperty('tagName') === false) {
            return false;
        }
        
        
        //- attributes.tag.tagName
        if(attributes.tag.hasOwnProperty('attributes') === false) {
            return false;
        }
        
        //- attributes.tag.tagName
        if(attributes.tag.hasOwnProperty('options') === false) {
            attributes.tag.options = {};
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
            attempts = attempts + 1;
            
            $('#attempts-text').text(attempts);
            
            if(attempts > 1) {
                $('#attempts-text').addClass("text-danger");
            } 
                                    
            if( tag.hasOwnProperty('tagName') ) {
                if( tag.tagName.toLowerCase() === "textarea" ) {
                    if(typeof answer === "object") {
                        if(answer instanceof Array) {
                            for (var i=0, l=answer.length; i<l; i++) {                                
                                if(answerInput.toLowerCase().indexOf(answer[i].toLowerCase()) === -1) {
                                    question.valid = false;
                                    return false;
                                }
                            }
                            question.valid = true;
                            return true;
                        } 
                    }
                }
            }
            
            if(answer === answerInput) {
                question.valid = true;
                return true;
            } else {
                question.valid = false;
                return false;
            }
            
        };
        
        
        // Question.get() : PUBLIC ---------------------------
        //-- RETURNS: 
        //----- JQUERY Object / JQUERY html input elements  
                
        Question.get = function(name) {  
            
            if(name === 'tagName') {
                if( tag.hasOwnProperty('tagName') ) {
                    return tag.tagName;
                }
                return '';
            }
            
            if(name === 'tagType') {
                if( tag.hasOwnProperty('attributes') ) {
                    if( tag.attributes.hasOwnProperty('type') ) {
                        return tag.attributes.type;
                    }
                }
                return '';
            }
            
            if(name === 'attempts') {
                return attempts;
            }
                                               
            var legend = $("<legend>"),
                questionLabel = $("<label>", {
                    'id' : "question", 
                    "html" : question, 
                });
            
            if( tag.hasOwnProperty('attributes') ) {
                
                if( tag.attributes.hasOwnProperty('id') ) {
                    questionLabel.attr('for',  tag.attributes.id );
                }
                
                if( tag.attributes.hasOwnProperty('required') === true ) {
                    if(tag.attributes.required === true) {
                        questionLabel.addClass('required');
                    }
                }
            }
            
            legend.append( questionLabel );
            return $("<fieldset>", { "class" : "form-group" }).append( legend ).append( tag.get() );
                    
        };

        
        return Question;
        
    };
 

    
    
    // Quiz ( OBJECT ) ====================================================================================
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
    
    var QuizMaker = function (options) {
                
        // VALIDATE FUNCTION INPUT ___________________________________
        if (typeof(options)==='undefined') {
            options = {};
        }
        

        // SET PRIVATE PROPERTIES (PRIVATE) __________________________
        var Quiz = {},
            //src = '/json/data.json',
            src = 'https://quizeapp-96831.firebaseio.com/questions.json',
            current = 0,
            loaded = false,
            questions = [],
            completed = false,
            messages = {      
            },
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
            beforeSend: function( xhr ) { }
        }).done(function( jsonData ) {
                        
            if( Object.prototype.toString.call( jsonData ) !== '[object Array]' ) {
                return false;
            }   
            
            console.log(jsonData);
            
            $.each( jsonData, function( key, attributes ) {
                                
                if(attributes.hasOwnProperty('question') === false) {
                    return false;
                }
                
                if(attributes.hasOwnProperty('answer') === false) {
                    return false;
                }
                                
                if(attributes.hasOwnProperty('tag') === false) {
                    return false;
                }
                
                questions.push( questionMaker(attributes) );
                              
            });  
            
            loaded = true; 
                                
            $(document).ready(function(){ 
                     
                var index = 0;
                                
                $("#questions").html(questions[index].get());
                
                $("#btn-submit").html('Submit Answer <span class="glyphicon glyphicon-chevron-right"></span>');
                
                $("#btn-submit").click( function() {
                
                    var selectorString = '.answer',
                        errorSelectorString = 'fieldset.form-group > legend',
                        tagName  = questions[index].get("tagName"),
                        tagType  = questions[index].get("tagType"),
                        attempts = questions[index].get("attempts");
                    
                                        
                    if(tagName === "select") {
                        selectorString = '#questions select';
                        errorSelectorString = 'fieldset.form-group > select';
                    }
                    
                    if(tagName === "textarea") {
                        selectorString = '#questions textarea';
                        errorSelectorString = 'fieldset.form-group > textarea';
                    }
                    
                    if(tagName === "input") {
                        if(tagType === "radio" || tagType === "checkbox" ) {                            
                            selectorString = '#questions input:checked';
                            errorSelectorString = 'fieldset.form-group > div.input-list';
                        } else {
                            selectorString = '#questions input';
                            errorSelectorString = 'fieldset.form-group > input';
                        }       
                    }
                                        
                                        
                    if(questions[index].validate( $(selectorString).val() ) === true) {
                                                
                        index = index + 1;
                        
                        $("fieldset.form-group").addClass("success"); 
                             
                        $("#correct-text").text( ( parseInt($("#correct-text").text()) + 1 ) );
                        $("#precent-text").text( (Math.round(( parseInt($("#correct-text").text()) / questions.length )*100 )) + '%');
                        $(errorSelectorString).after('<div class="bg-success"><p class="text-success">CORRECT! Good Job!</p></div>');
                        
                        if(index <  questions.length) {
                            fadeQuestion("success", index, 400, 800);
                        } else {
                            completed();
                        }    
                                        
                        return true;
                    }       
                    
                    $("fieldset.form-group").addClass("danger"); 
                     
                    if(questions[index].get('attempts') > 2) {
                        
                        index = index + 1;
                        
                        $("#incorrect-text").text( ( parseInt($("#incorrect-text").text()) + 1 ) );
                        $(errorSelectorString).after('<div class="bg-danger"><p class="text-danger">Sorry you have exceeded 3 trys</p></div>');
                        
                        fadeQuestion("danger", index, 400, 800);
                                                
                        return false;
                    }
                    
                    
                    $(errorSelectorString).after('<div class="bg-danger"><p class="text-danger">Please Try Agian</p></div>');
                   
                    $('.bg-danger').delay(800).fadeOut(800, function() {
                        $(this).remove();
                        $("fieldset.form-group").removeClass("danger");
                    });
                    
                    return false; 
                    
                });
                
            });
            
        });
        
        
        fadeQuestion = function(type, index, delay, fade) {
            
            $("#questions").delay(delay).fadeOut(fade,  function() {
                
                $(".bg-" + type ).remove();
                $("fieldset.form-group").removeClass( type );
                $("#questions").html( questions[index].get() );

                $('#attempts-text').removeClass( "text-" + type )
                $('#attempts-text').text(0);
                                
                $(this).fadeIn();
                return;
            }); 
            
            return
            
        };
        
        
        completed = function() {
            $("#questions").remove();
            $("#actions").remove();
            
            if( parseInt($("#precent-text").text()) > 90) {
                $("#container").prepend('<section class="col-xs-12"><h1>Congratulations: <span class="lead">You got an A!</span></h1></section>');
                return;
            }
            
            if( parseInt($("#precent-text").text()) > 80) {
                $("#container").prepend('<section class="col-xs-12"><h1>Congratulations: <span class="lead">You got an B!</span></h1></section>');
                return;
            }
            
            if( parseInt($("#precent-text").text()) > 70) {
                $("#container").prepend('<section class="col-xs-12"><h1>Congratulations: <span class="lead">You got an C!</span></h1></section>');
                return;
            }
            
            
            $("#container").prepend('<section class="col-xs-12"><h1>Sorry: <span class="lead">You got under 70%, please try agian.</span></h1></section>');
            return;  
            
        };
        
        
        
        
        // SET METHODS (PUBLIC) ______________________________________
                    
        // Quiz.isLoaded() : PUBLIC ---------------------------------
        //-- RETURNS: protected "loaded"
        Quiz.isLoaded = function() {
            return loaded;
        };  
        
        // Quiz.isCompleted() : PUBLIC ------------------------------
        //-- RETURNS: protected "completed" property
        Quiz.isCompleted = function() {
            return completed;
        };
        
    
        return Quiz;
        
    }; 
    
    var quiz = QuizMaker();
    
}());
