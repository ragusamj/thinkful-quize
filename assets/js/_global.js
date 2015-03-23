
// ADD ERROR HANDLING FOR COONSOLE.LOG & IE
if(! window.console) {
  console = { log: function(){} };
}

 // debug(message) 
function debug(message) {
    if(isDebug === true) {
        console.log(message);
    }
}  
