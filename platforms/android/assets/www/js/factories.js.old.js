var factories = angular.module("starter.factories", [])

factories.factory("sqliteRecordsFactory", function($cordovaSQLite){
  var db = $cordovaSQLite.openDB({ name: "my.db" });
  var records = {};

  return {
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
    //para recoger balance, hace falta unir records y account para conseguir el nombre
    selectRecordsTwo: function(account, from, to){
      var records = [];
      var select;
      var temp;
      console.log("account: "+account+ ", from: "+from+", to: "+to);
      dateFrom = new Date(from);
      dateTo = new Date(to)
      console.log("dia desde: " + dateFrom.getDate() + "/" + (dateFrom.getMonth()+1) + "/" + dateFrom.getFullYear());
      console.log("dia hasta: " + dateTo.getDate() + "/" + (dateTo.getMonth()+1) + "/" + dateTo.getFullYear());
      //date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear()
      if(account != 0) {
        select = "SELECT * FROM records WHERE date >='"+from+"' AND date <='"+to+"' AND account_id = '"+account+"'";
        temp = "{\"key\": "+account+", \"values\": [";
      }else {
        select = "SELECT * FROM records WHERE date >='"+from+"' AND date <='"+to+"'";
        //temp = "{\"key\": 0, \"values\": [";
        temp = "{\"categories\":[";
      }
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        var total = 0;
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            //rellenar categories
            //results.rows.item(i).date
            tempdate = new Date(results.rows.item(i).date);
            temp = temp.concat("\""+tempdate.getDate() + "/" + (tempdate.getMonth()+1) + "/" + tempdate.getFullYear()+"\"");
            if(i+1 < results.rows.length){
              temp = temp.concat(",")
            }
          }
          //se cierra categories y se abre series
          temp = temp.concat("],\"series\":[");
          //segundo for para rellenar series a partir de aquí
          for(i=0; i<results.rows.length; i++){
            temp = temp.concat()
            if(results.rows.item(i).operation == "income"){
              total += results.rows.item(i).amount;
            }else {
              total -= results.rows.item(i).amount;
            }
            temp = temp.concat("["+results.rows.item(i).date+", "+total+"]");
            if(i+1 < results.rows.length){
              temp = temp.concat(",")
            }

          }
          temp = temp.concat("]}")
          console.log("TEMP QUEDA ASÍ: "+temp);
          records.push(temp);
/*
{"categories":["10/06/2016","15/06/2016"],"series":[{"name":"Download","data":[50,70]},{"name":"Upload","data":[40,70]}]}
{
  "categories": ["10/06/2016", "11/06/2016", "12/06/2016", "13/06/2016", "14/06/2016", "15/06/2016"],
  "series": [{
    "name": "Download",
    "data": [50, 60, 70, 50, 60, 70]
  }, {
    "name": "Upload",
    "data": [40, 30, 60, 50, 60, 70]
  }]
}
*/

            /*console.log("SELECTED -> id: " + results.rows.item(i).id + ", Fecha: " + results.rows.item(i).date + ", operation: " + results.rows.item(i).operation + ", amount: " + results.rows.item(i).amount +
              ", account_id: " + results.rows.item(i).account_id + ", category_id: " + results.rows.item(i).category_id + ", description: " + results.rows.item(i).description);*/
        } else {
          console.log("no results");
        }
      })
      return records;
    },
    selectLastMonthRecords: function(from, to){
      var records = [];
      //console.log("Select last 30 days, from: "+Date.now()-2592000+" to "+Date.now());
      var select = "SELECT * FROM records WHERE date >='"+from+"' AND date <='"+to+"'";
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