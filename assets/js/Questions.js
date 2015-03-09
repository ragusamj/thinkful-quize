// ADD ERROR HANDLING FOR COONSOLE.LOG & IE
if(! window.console) {
  console = { log: function(){} };
}

(function () {
  'use strict';
  
  //- OBJECT: Questions() ---- 
  //- DESCRIPTION: Handle questions & answers
  function Questions() {
    var that = this;
    
    
    //- METHOD: isQuestionsLoaded() ---- 
    //- DESCRIPTION: Check to see if Question Data is loaded
    this.isQuestionsLoaded = function(dataJSON) {      
      var data = typeof dataJSON !== 'undefined' ? dataJSON : that.data;
      if(data.length > 0) {
        return true;
      } 
      return false;
    };


    //- METHOD: getQuestionProperty() ---- 
    //- DESCRIPTION: Get property of a question JSON segment
    this.getQuestionProperty(hash, property) {
      var question = that.getQuestionSegment(hash);
      if(data.hasOwnProperty(property)) {
        return question[property];
      }
    }    
    
    //- METHOD: getQuestionArray() ---- 
    //- DESCRIPTION: Check to see if Question Data is loaded
    this.getQuestionArray = function(hash) {

      // IF ARRAY EMPTY RETURN "false"
      if(that.data.length === 0) {
        console.log('!- ERROR -');
        console.log('Array is empty');
        return false;
      }
      
      // CHECK IF HASH IS IN THE LENGTH... IF "true" RETURN ARRAY SEGMENT
      if(array.length > hash) {
        return data.questions[0];
      }
      
      // FALLBACK IF YOU REACH HERE THEN LOG AN ERROR & RETURN THE FIRST ITEM IN ARRAY
      console.log('!- ERROR -');
      console.log('Array hash does not exist return the first item in the array');
      return  data.questions[0];
      
    };
    
  }
  
  
}());











/*



function getQuestionProperty(hash, property) {
  var question = getQuestionSegment(hash);
  
  if(myObj.hasOwnProperty(property)) {
    return question[property];
  }
  
  // DEBUG
  console.log('!- ERROR -');
  console.log('Proprty '+property+' does not exist in the "'+hash+'" json segment');
  console.log(question);
  return false;
  
}

function getAnswer(hash) {
  var question = getQuestionSegment(hash);

  if(myObj.hasOwnProperty('question')) {
    return question.question;
  }
  
}

*/

