var factories = angular.module("starter.factories", [])

factories.factory("sqliteRecordsFactory", function($cordovaSQLite){
  var db = $cordovaSQLite.openDB({ name: "my.db" });
  var records = {};

  return {
    //select records
    selectRecords: function(){
      var records = [];
      var select = "SELECT * FROM records";
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"id": results.rows.item(i).id, "date": results.rows.item(i).date, "operation": results.rows.item(i).operation, "amount": results.rows.item(i).amount, "account_id": results.rows.item(i).account_id,
            "category_id": results.rows.item(i).category_id, "description": results.rows.item(i).description};
            records.push(temp);
            console.log("SELECTED -> id: " + results.rows.item(i).id + ", Fecha: " + results.rows.item(i).date + ", operation: " + results.rows.item(i).operation + ", amount: " + results.rows.item(i).amount +
              ", account_id: " + results.rows.item(i).account_id + ", category_id: " + results.rows.item(i).category_id + ", description: " + results.rows.item(i).description);
            //date INTEGER PRIMARY KEY, operation TEXT, amount REAL, account_id INTEGER, category_id INTEGER, description TEXT
          }
        } else {
          console.log("No results found");
        }
      })
      return records;
    },
    //select balance de un día concreto
    selectBalance: function(from, to){
      from = Date.parse(from)/1000;
      to = Date.parse(to)/1000;
      console.log("from: "+from+" to: "+to);
      var records = [];
      var select = "SELECT account_id AS 'cuenta', sum(amount) as balance, date FROM records WHERE date <='" + to + "' GROUP BY account_id";
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"cuenta":results.rows.item(i).cuenta, "balance": results.rows.item(i).balance, "date": results.rows.item(i).date};
            records.push(temp);
            console.log("SELECTED -> cuenta: "+ results.rows.item(i).cuenta + " balance: " + results.rows.item(i).balance + ", Fecha: " + results.rows.item(i).date);
          }
        } else {
          console.log("no results");
        }
      })
      return records;
    },
    //select records con filtro de cuenta y fechas
    selectRecords: function(account, from, to){
      var records = [];
      var select;
      console.log("account: "+account+ ", from: "+from+", to: "+to);
      if(account != 0) {
        select = "SELECT * FROM records WHERE date >='"+from+"' AND date <='"+to+"' AND account_id = '"+account+"'";
      }else {
        select = "SELECT * FROM records WHERE date >='"+from+"' AND date <='"+to+"'";
      }
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"id": results.rows.item(i).id, "date": results.rows.item(i).date, "operation": results.rows.item(i).operation, "amount": results.rows.item(i).amount, "account_id": results.rows.item(i).account_id,
            "category_id": results.rows.item(i).category_id, "description": results.rows.item(i).description};
            records.push(temp);
            console.log("SELECTED -> id: " + results.rows.item(i).id + ", Fecha: " + results.rows.item(i).date + ", operation: " + results.rows.item(i).operation + ", amount: " + results.rows.item(i).amount +
              ", account_id: " + results.rows.item(i).account_id + ", category_id: " + results.rows.item(i).category_id + ", description: " + results.rows.item(i).description);
          }
        } else {
          console.log("no results");
        }
      })
      return records;
    },
    insertRecord: function(date, operation, amount, account_id, category_id, description){
      var query = "INSERT INTO records (date, operation, amount, account_id, category_id, description) VALUES (?,?,?,?,?,?)";
      $cordovaSQLite.execute(db, query, [date, operation, amount, account_id, category_id, description]).then(function(results) {
        console.log("INSERT RECORD DATA: "+date+" "+operation+" "+amount+" "+account_id+" "+category_id+" "+description);
      }, function (err) {
          console.error(err);
      });
    }
  }
});

factories.factory("sqliteCategoriesFactory", function($cordovaSQLite) {
  var db = $cordovaSQLite.openDB({ name: "my.db" });
  var sqliteCategories = {
    selectCategories: function(){
      var categories = [];
      var select = "SELECT * FROM categories";
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"id": results.rows.item(i).id, "name": results.rows.item(i).name}
            categories.push(temp);
            //console.log("Select: " + results.rows.item(i).id + " name: " + results.rows.item(i).name);
          }
        } else {
          console.log("No results found");
        }
      })
      return categories
    },
    insertCategory: function(name){
      var query = "INSERT INTO categories (name) VALUES (?)";
      $cordovaSQLite.execute(db,query, [name]).then(function(results) {
        console.log("INSERT RECORDS ID -> " + results.insertId + " NAME: " + results.name);
      }, function (err) {
        console.error(err);
      });
    }
  }
  return sqliteCategories;
});

factories.factory("sqliteAccountsFactory", function($cordovaSQLite) {
  var db = $cordovaSQLite.openDB({ name: "my.db" });
  var sqliteAccounts = {
    selectAccounts: function(){
      var accounts = [];
      var select = "SELECT * FROM accounts";
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"id": results.rows.item(i).id, "name": results.rows.item(i).name}
            accounts.push(temp);
            //console.log("Select: " + results.rows.item(i).id + " name: " + results.rows.item(i).name);
          }
        } else {
          console.log("No results found");
        }
      })
      return accounts
    },
    insertAccount: function(name){
      var query = "INSERT INTO accounts (name) VALUES (?)";
      $cordovaSQLite.execute(db,query, [name]).then(function(results) {
        console.log("INSERT RECORDS ID -> " + results.insertId);
      }, function (err) {
        console.error(err);
      });
    }
  }
  return sqliteAccounts;
});