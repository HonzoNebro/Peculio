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
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Alojamiento"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Coche"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Combustible"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Comidas Afuera"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Compras"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Entretenimiento"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Familia"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Hogar"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Impuestos"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Lectura"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Mascotas"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Niños"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Otros"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Regalos"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Ropa"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Salud"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Seguro"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Transporte"]);
    $cordovaSQLite.execute(db, "INSERT INTO categories (name) VALUES (?)", ["Zapatos"]);
    $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS accounts");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
    $cordovaSQLite.execute(db, "INSERT INTO accounts (name) VALUES (?)", ["Efectivo"]);
    $cordovaSQLite.execute(db, "INSERT INTO accounts (name) VALUES (?)", ["Cuenta Corriente"]);
    $cordovaSQLite.execute(db, "INSERT INTO accounts (name) VALUES (?)", ["Ahorros"]);
    $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS records");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, date INTEGER, operation TEXT, amount REAL, account_id INTEGER, category_id INTEGER, description TEXT, FOREIGN KEY (category_id) REFERENCES categories (id), FOREIGN KEY (account_id) REFERENCES accounts (id))");
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1463824800,'income',100,1,1,'test']);
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1463911200,'expense',-100,2,1,'test2']);
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1463997600,'income',100,3,1,'test3']);
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1464084000,'expense',-100,1,1,'test4']);
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1464170400,'income',100,2,1,'test5']);
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1464256800,'income',100,3,1,'test6']);
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1464825600,'income',100,3,1,'test10']);
    $cordovaSQLite.execute(db, "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)", [1464912000,'expense',-100,3,1,'test11']);
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

  .state('app.ingreso', {
    url: '/ingreso',
    views: {
      'menuContent': {
        templateUrl: 'templates/ingreso.html'
      }
    }
  })

  .state('app.gasto', {
    url: '/gasto',
    views: {
      'menuContent': {
        templateUrl: 'templates/gasto.html'
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
