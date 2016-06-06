var servicios = angular.module("starter.services", []);

servicios.service("userService", function() {
  var dato = 0;

  return{
    getDato : function() {
      console.log("getDato: " +dato);
       return dato;
    },
    setDato : function(value) {
      console.log("setdato: "+value);
       dato = value;
    }
  };
});