// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.factories', 'starter.services', 'ionic-datepicker','highcharts-ng'])

.run(function($ionicPlatform, $cordovaSQLite) { //amMoment
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var db = $cordovaSQLite.openDB({ name: "my.db" });
    //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS test");
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS test (date integer primary key, test text)");

    $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS categories");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, sign TEXT, account TEXT)");
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Autopista", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Bebidas", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Comida", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Gasolina", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Hotel", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Mercancia", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Otros", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Personales", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Propinas", "Gasto", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Sueldo", "Ingreso", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Ventas", "Ingreso", "Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (category, sign, account) VALUES (?,?,?)", ["Prestamo", "Ingreso", "Efectivo"]);

    $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS accounts");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, account TEXT, incomes REAL, expenses REAL, balance REAL)");
    $cordovaSQLite.execute(db, "INSERT INTO accounts (account, incomes, expenses, balance) VALUES (?,?,?,?)", ["Efectivo", 300, 155, 145]);
    $cordovaSQLite.execute(db, "INSERT INTO accounts (account, incomes, expenses, balance) VALUES (?,?,?,?)", ["Cuenta Corriente", 4000, 1200, 2800]);
    $cordovaSQLite.execute(db, "INSERT INTO accounts (account, incomes, expenses, balance) VALUES (?,?,?,?)", ["Ahorros", 2000, 100, 1900]);

    $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS records");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, account_id INTEGER, category_id INTEGER, amount REAL, sign TEXT, description TEXT, timestamp INTEGER, date TEXT, hour TEXT, day TEXT, week TEXT, month TEXT, year TEXT, FOREIGN KEY (account_id) REFERENCES accounts (id), FOREIGN KEY (category_id) REFERENCES categories (id))");
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 1, 5, "Gasto", "foo", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 4, 40, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 7, 50, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 2, 60, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 2, 400, "Gasto", "foo2", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 5, 400, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 8, 400, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 6, 400, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 3, 0, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 6, 0, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 9, 0, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 8, 100, "Gasto", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 10, 20, "Ingreso", "foo4", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 11, 40, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 11, 80, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [1, 11, 160, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 11, 1000, "Ingreso", "foo5", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 12, 1000, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 12, 1000, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [2, 12, 1000, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 12, 500, "Ingreso", "foo6", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 10, 500, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 10, 500, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
    $cordovaSQLite.execute(db, "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [3, 10, 500, "Ingreso", "foo3", 1465398998000, "08/06/2016", "17:16:38", "8", "23", "6", "2016"]);
  }); 
})

.config(function (ionicDatePickerProvider) {
  var datePickerObj = {
    inputDate: new Date(),
    setLabel: 'Establecer',
    todayLabel: 'Hoy',
    closeLabel: 'Cerrar',
    mondayFirst: true,
    weeksList: ["D", "L", "M", "X", "J", "V", "S"],
    monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    templateType: 'modal',
    //from: new Date(2012, 8, 1)
    //to: new Date(2018, 8, 1)
    showTodayButton: true,
    dateFormat: 'dd MMM yyyy',
    closeOnSelect: false,
    //disableWeekdays: [6]
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.movements', {
    url: '/movements',
    views: {
      'menuContent': {
        templateUrl: 'templates/movements.html'
      }
    }
  })

  .state('app.regExpense', {
    url: '/regExpense',
    views: {
      'menuContent': {
        templateUrl: 'templates/regExpense.html'
      }
    }
  })

  .state('app.regIncome', {
    url: '/regIncome',
    views: {
      'menuContent': {
        templateUrl: 'templates/regIncome.html'
      }
    }
  })

  .state('app.transferencia', {
    url: '/transferencia',
    views: {
      'menuContent': {
        templateUrl: 'templates/transferencia.html'
      }
    }
  })

  .state('app.inicio', {
    url: '/inicio',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html',
      }
    }
  })

  .state('app.calculadora', {
    url: '/calculadora',
    views: {
      'menuContent': {
        templateUrl: 'templates/calculadora.html'
      }
    }
  })

  .state('app.addCategory', {
    url: '/addCategory',
    views: {
      'menuContent': {
        templateUrl: 'templates/addCategory.html'
      }
    }
  })

  .state('app.repByDate', {
    url: '/repByDate',
    views: {
      'menuContent': {
        templateUrl: 'templates/repByDate.html'
      }
    }
  })

  .state('app.addAccount', {
    url: '/addAccount',
    views: {
      'menuContent': {
        templateUrl: 'templates/addAccount.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});
