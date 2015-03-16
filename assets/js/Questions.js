
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







