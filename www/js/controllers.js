var controllers = angular.module("starter.controllers", [])

controllers.controller("AppCtrl", function($scope, $ionicNavBarDelegate, $ionicPopup, $ionicHistory, $timeout, userService, $ionicModal) {
  $scope.btnClicked = function(btn) {
    //borar y poner 0
    if (btn == "C") {
      $scope.operation.amo = "0";
    } else if (btn == "=") {
      //igual
      if ($scope.operation.amo == "") {
        $scope.operation.amo = "0";
      }
      if ( //si ultimo caracter es operación
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "+") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "-") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "*") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "/") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == ".")
      ) {
        //borrar ultimo caracter
        $scope.operation.amo = $scope.operation.amo.toString().slice(0, -1);
        //si queda vacio, poner un 0
        if ($scope.operation.amo == "") {
          $scope.operation.amo = "0";
        }
        //si es una división entre 0
      }else if((eval($scope.operation.amo)=="Infinity")||isNaN(eval($scope.operation.amo))){
        $scope.operation.amo = "0";
      }else {
        //todo correcto
        $scope.operation.amo = eval($scope.operation.amo)
      };
    } else if (btn == "b") {
      //borrar último carácter
      $scope.operation.amo = $scope.operation.amo.toString().slice(0, -1);
      if ($scope.operation.amo == "") {
        $scope.operation.amo = "0";
      }
    } 

    //operaciones
    else if ((btn == "+")||(btn == "-")||(btn == "*")||(btn == "/")){ //si se ha pulsado una operacion
      //si había algo que no sea un número o vacio
      if(($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "+") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "-") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "*") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "/") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == ".")){
        //no hacer nada
      } else if (btn == "+"){
        $scope.operation.amo += "+";
      } else if (btn == "-"){
        $scope.operation.amo += "-";
      } else if (btn == "*"){
        $scope.operation.amo += "*";
      } else if (btn == "/"){
        $scope.operation.amo += "/";
      }
    }
    //decimal
    else if (btn == "."){
      if($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "."){
      }else {
        $scope.operation.amo += ".";
      }
    }
    //numeros
    else if (btn == "1") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "1";
    } else if (btn == "2") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "2";
    } else if (btn == "3") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "3";
    } else if (btn == "4") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "4";
    } else if (btn == "5") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "5";
    } else if (btn == "6") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "6";
    } else if (btn == "7") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "7";
    } else if (btn == "8") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "8";
    } else if (btn == "9") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "9";
    } else if (btn == "0") {
      //Si hay un 0 en el input, vaciar antes de introducir el carácter
      if ($scope.operation.amo == "0") {
        $scope.operation.amo = "";
      }
      $scope.operation.amo += "0";
    }

    //boton hecho
    if (btn == "f"){
      if ( //si ultimo caracter es operación
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "+") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "-") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "*") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == "/") ||
        ($scope.operation.amo.toString().substring($scope.operation.amo.length - 1) == ".")
      ) {
        //avisa de un error
        var myPopup = $ionicPopup.alert({
         title: "ERROR",
         template: "Termina la operación"
        });
        $timeout(function() {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
        //borrar ultimo caracter
        $scope.operation.amo = $scope.operation.amo.toString().slice(0, -1);
        //si queda vacio, poner un 0
        if ($scope.operation.amo == "") {
          $scope.operation.amo = "0";
        }
      } else {
        $scope.operation.amo = eval($scope.operation.amo);
        //console.log("calculadora guarda datos");
        //userService.setDato($scope.operation.amo);
        //$ionicHistory.goBack();
        $scope.modal.hide();
      };
    }
  };
});

//controlador operaciones
controllers.controller("OperationCtrl", function($scope, $timeout, $ionicHistory, sqliteRecordsFactory, sqliteAccountsFactory, sqliteCategoriesFactory, ionicDatePicker, userService, $ionicModal) {
  //console.log("entro operationCtrl");
  $scope.operation = {};
  $scope.operation.amo ="";
  /*$scope.operation = {
    amo: "0"
  };
  console.log("amo: "+$scope.operation.amo)*/

  $ionicModal.fromTemplateUrl('templates/calculadora.html',{
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal){
    $scope.modal = modal;
  })

  $scope.openModal = function() {
    $scope.modal.show();
  };

  var date;
//mirar movements, y comprar con este select, este no va bien
  $scope.$on("$ionicView.enter", function () {
    $scope.accounts = {};
    $scope.accounts = sqliteAccountsFactory.selectAccounts();
    $scope.categories = {};
    $scope.categories = sqliteCategoriesFactory.selectCategories();
    $timeout(function () {
      //console.log(angular.toJson($scope.accounts[0]));
      //console.log("impimir " + $scope.accounts[0].name)
        $scope.operation.acc = $scope.accounts[0];
        $scope.operation.cat = $scope.categories[0];
      //console.log("id: " + $scope.operation.acc.id + " name: " + $scope.operation.acc.name)
    }, 50);
  });

  $scope.insertCat = function(name){
    sqliteCategoriesFactory.insertCategory(name);
    $ionicHistory.goBack();
  }

  $scope.insertAcc = function(name){
    sqliteAccountsFactory.insertAccount(name);
    $ionicHistory.goBack();
  }

  $scope.selectCat = function() {
    console.log($scope.categories[1].name);
  }

  $scope.selectRec = function() {
    sqliteRecordsFactory.selectRecords();
  }

  $scope.insertRecInc = function(){
    if($scope.operation.date == null){
      date = Math.floor(Date.now()/1000);
    }
    var operation = "Ingreso";
    var amount = $scope.operation.amo;
    var account_id = $scope.operation.acc;
    var category_id = $scope.operation.cat;
    if ($scope.operation.des == null){
      $scope.operation.des = "";
    }
    var description = $scope.operation.des;
    //console.log($scope.operation.acc)
    //console.log("cat: "+ category_id + "acc: " + account_id)
    sqliteRecordsFactory.insertRecord(date, operation, amount, account_id, category_id, description);
    $timeout(function () {
      $scope.operation.amo = "";
      $scope.operation.des = "";
    }, 50);
  }

  $scope.insertRecExp = function(){
    if($scope.operation.date == null){
      date = Math.floor(Date.now()/1000);
    }
    var operation = "Gasto";
    var amount = "-"+$scope.operation.amo;
    var account_id = $scope.operation.acc;
    var category_id = $scope.operation.cat;
    if ($scope.operation.des == null){
      $scope.operation.des = "";
    }
    var description = $scope.operation.des;
    sqliteRecordsFactory.insertRecord(date, operation, amount, account_id, category_id, description);
    $timeout(function () {
      $scope.operation.amo = "";
      $scope.operation.des = "";
    }, 50);
  }

  var calendarFrom = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + Math.floor(val/1000) +","+new Date(val));
        date = Math.floor(val/1000);
        mydate = new Date(val);
        $scope.operation.date = "" + mydate.getDate() + "/" + (mydate.getMonth()+1) + "/" + mydate.getFullYear();
        //$scope.operation.date = date;
    }
  };

  $scope.chooseDate = function(){
    ionicDatePicker.openDatePicker(calendarFrom);
  };

  //console.log("$scope.operation.amo en ingreso: "+$scope.operation.amo);
 
});

controllers.controller("MovementsCtrl", function($timeout, $scope, sqliteAccountsFactory, sqliteRecordsFactory, ionicDatePicker, sqliteMovementsFactory, $ionicListDelegate){
  $scope.from;
  $scope.to;
  var from;
  var to;
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  //$scope.listCanSwipe = true no usado, está ya en true
  var calendarFrom = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + Math.floor(val/1000) + " " + new Date(val));
        //$scope.from = new Date(val).toDateString();
        var date = new Date(val);
        $scope.from = "" + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        from = Math.floor(val/1000);
        //fill(date, Date.now());
    }
  };

  var calendarTo = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + Math.floor(val/1000) + " " + new Date(val));
        //$scope.from = new Date(val).toDateString();
        var date = new Date(val);
        $scope.to = "" + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        //fill($scope.from, $scope.to);
        to = Math.floor(val/1000);
    }
  };

  $scope.fromBtn = function(){
    ionicDatePicker.openDatePicker(calendarFrom);
  };

  $scope.toBtn = function(){
    ionicDatePicker.openDatePicker(calendarTo);
  };

  $scope.fill = function(){
    $scope.records = sqliteMovementsFactory.selectMovements($scope.mov.account, from, to);
    var record = $scope.records;
    
    /*$timeout(function () {
      console.log("dentro Angularfill(): "+angular.toJson(record));
      //console.log("dentro Angularfill2(): "+angular.toJson(record[0]));
      //console.log("dentro Angularfill3(): "+angular.toJson(record.date));
      //console.log("dentro Angularfill4(): "+angular.toJson(record[0].date));
      console.log("dentro fill(): "+record);
      //console.log("dentro fill2(): "+record[0]);
      //console.log("dentro fill3(): "+record[0].name);
      //console.log("dentro fill4(): "+record[1]);
    }, 50);*/
    
  }

  $scope.erase = function($index){
    console.log("borrando: "+$scope.records[$index].id);
    sqliteRecordsFactory.deleteRecord($scope.records[$index].id);
    $scope.records.splice($index, 1);
    $ionicListDelegate.closeOptionButtons();
    /*
    borrar de registro de BBDD */
  }

  $scope.$on("$ionicView.enter", function () {
    $scope.accounts = [];
    $scope.accounts = sqliteAccountsFactory.selectAccounts();
    $timeout(function () {
      $scope.accounts.unshift({id: 0, name: 'Todas'});
      $scope.mov = {
        account: $scope.accounts[0].id,
      };
      console.log("mov.account:" + $scope.mov.account);
    }, 50);
    /*
    coger registros y sacar mes y año usando esto:
    var date = new Date(1313564400000);
    var month = date.getMonth();
    */
  });

  $scope.onChangeDates = function(){
    console.log("mov.account:" + $scope.mov.account);
  };

});

controllers.controller("ChartsCtrl", function($scope, sqliteRecordsFactory, $timeout){
  // hace dos semanas -> new Date(+new Date - 12096e5);
  var start = new Date(+new Date - 12096e5);
  start.setHours(0, 0, 0, 0);
  year = start.getFullYear();
  month = start.getMonth() + 1;
  day = start.getDate();
  //console.log("año: " + year + " mes: " + month + " dia: " + day);
  var end = new Date(+new Date);
  end.setHours(0, 0, 0, 0);

/*console.log("start: "+start+ " i= "+i);
    start.setDate(start.getDate() + 1);
    console.log("start: "+start+ " i= "+i);*/

  var temp = {};
  for(i=0; i<14; i++){
    temp = sqliteRecordsFactory.selectBalance(start, end);
    start.setDate(start.getDate() + 1);
    $timeout(function () {
      console.log("temp: "+temp);
      console.log("temp: "+angular.toJson(temp));
    }, 5000);
  }

  $scope.chartarea = {
    options: {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Balance',
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        }
      },
      plotOptions: {
        area: {
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
        series: {
          pointStart: Date.UTC(year, month, day),
          pointInterval: 24 * 3600 * 1000 // one day
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}€</b><br/>'
      },
    },
    yAxis: {
      title: {
        text: 'Euros (€)'
      },
      labels: {
        formatter: function() {
          return this.value + '€';
        }
      }
    },
    credits: {
      enabled: false
    },
    "series": [{
      "name": "Ahorros",
      "data": [50, 60, 70, 50, 60, 70, 50, 60, 70, 50, 60, 70, 50, 60]
    }, {
      "name": "Metalico",
      "data": [40, 30, 60, 50, 60, 40, 30, 60, 50, 60, 40, 30, 60, 50]
    }, {
      "name": "Caja B",
      "data": [5, 10.2, 30, 35, 35, 35, 5, 10.2, 30, 35, 35, 35, 5, 10.2]
    }, {
      "name": "Foo",
      "data": [25.56, 64, 27, 70, 10, 50, 25.56, 64, 27, 70, 10, 50, 25.56, 64]
    }],
  }
});