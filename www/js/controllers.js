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
    var operation = "income";
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
    var operation = "expense";
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

controllers.controller("MovementsCtrl", function($timeout, $scope, sqliteAccountsFactory, sqliteRecordsFactory, ionicDatePicker){
  $scope.from;
  $scope.to;
  var from;
  var to;

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
    $scope.records = sqliteRecordsFactory.selectRecords($scope.mov.account, from, to);
    var record = $scope.records;
    
    $timeout(function () {
      console.log("dentro Angularfill(): "+angular.toJson(record));
      //console.log("dentro Angularfill2(): "+angular.toJson(record[0]));
      //console.log("dentro Angularfill3(): "+angular.toJson(record.date));
      //console.log("dentro Angularfill4(): "+angular.toJson(record[0].date));
      console.log("dentro fill(): "+record);
      //console.log("dentro fill2(): "+record[0]);
      //console.log("dentro fill3(): "+record[0].name);
      //console.log("dentro fill4(): "+record[1]);
    }, 50);
    
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

controllers.controller("ChartsCtrl", function($scope, sqliteAccountsFactory, sqliteRecordsFactory, $timeout){

  $scope.chartarea = {
    options: {
      chart: {
        type: 'area',
        inverted: false,
        zoomType: 'xy',
        height: 250,
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          column: {
            size: '30%',
          },
        }
      },
      colors: ['#058dc7', '#50b432', '#F4A460', '#FF0000', '#F1FF83']
    },
    xAxis: {
      categories: ["10/06/2016", "11/06/2016", "12/06/2016", "13/06/2016", "14/06/2016", "15/06/2016"],
      title: {
        text: ''
      },
      labels: {
        rotation: -90,
        style: {
          fontSize: '12px',
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Euros (€)',
        align: 'middle'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' '
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      floating: false,
      borderWidth: 1,
      backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
      shadow: true
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Balance',
      style: {
        //color: '#FF00FF',
        fontSize: '12px'
      },
    },
    "series": [{
      "name": "Ahorros",
      "data": [50, 60, 70, 50, 60, 70]
    },{
      "name": "Metalico",
      "data": [40, 30, 60, 50, 60, 60]
    },{
      "name": "Caja B",
      "data": [5, 10.2, 30, 35, 35, 35]
    },{
      "name": "Foo",
      "data": [25.56, 64, 7, 90, 0, 50]
    }],
    loading: false
}
/*
{
  "key": 0,
  "values": [
    [
      1463824800000,
      100
    ],
    [
      1463911200000,
      200
    ],
    [
      1463997600000,
      300
    ],
    [
      1464084000000,
      400
    ],
    [
      1464170400000,
      500
    ],
    [
      1464256800000,
      600
    ]
  ]
}
*/


  //$scope.repDate = {};

  $scope.accounts = [];
  $scope.accounts = sqliteAccountsFactory.selectAccounts();
  $scope.accounts.unshift({id: 0, name: 'Todas'});
  $scope.repDate = {
    account: $scope.accounts[0].id
  };

  $scope.onChangeDates = function(){
    console.log("seleccionada: "+$scope.repDate.account);
    $scope.repDate.record = sqliteRecordsFactory.selectRecordsTwo($scope.repDate.account, (Date.now()-2592000000), Date.now());
    var temp = $scope.repDate.record;

    $timeout(function () {
      console.log("dentro fill(): "+temp);
      $scope.vm.data.push(JSON.parse(temp));
    }, 50);
  }

  /*$scope.$on("$ionicView.enter", function () {
    //console.log("Select last 30 days, from: "+(Date.now()-2592000)+" to "+Date.now());
    //$scope.chart();
  });*/

  /*$scope.chart = function() {
    var db = $cordovaSQLite.openDB({ name: "my.db" });
    var records = [];
    var select = "SELECT * FROM records WHERE date >='"+(Date.now()-2592000)+"' AND date <='"+Date.now()+"'";
    $cordovaSQLite.execute(db, select, []).then(function(results) {
      if(results.rows.length > 0){
        for(i=0; i<results.rows.length; i++){
          var temp = {"operation": results.rows.item(i).operation, "amount": results.rows.item(i).amount, "category_id": results.rows.item(i).category_id};
          records.push(temp);
          console.log("30DAYS -> operation:"+results.rows.item(i).operation+", amount: "+results.rows.item(i).amount+", category_id: "+results.rows.item(i).category_id);
        }
      } else {
        console.log("no results");
      }
    })
    return records;
  }*/

  //SELECT * FROM statistics WHERE date BETWEEN datetime('now', 'start of month') AND datetime('now', 'localtime');
  //http://stackoverflow.com/questions/10504218/query-last-day-last-week-last-month-sqlite
  //sqliteRecordsFactory.selectRecords();

  $scope.test = function(){
    $scope.vm.data = []
  };
});