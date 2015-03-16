
// ADD ERROR HANDLING FOR COONSOLE.LOG & IE
if(! window.console) {
  console = { log: function(){} };
}

//Prototypal inheritance pattern:
//newObject = Object.create(oldObject);
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


