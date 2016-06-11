var factories = angular.module("starter.factories", [])

factories.factory("sqliteRecordsFactory", function($cordovaSQLite, $timeout){
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
            var temp = {"id": results.rows.item(i).id, "date": results.rows.item(i).date, "operation": results.rows.item(i).operation, "amount": results.rows.item(i).amount, "balance": results.rows.item(i).balance, "account_id": results.rows.item(i).account_id,
            "category_id": results.rows.item(i).category_id, "description": results.rows.item(i).description};
            records.push(temp);
            console.log("SELECTED -> id: " + results.rows.item(i).id + ", Fecha: " + results.rows.item(i).date + ", operation: " + results.rows.item(i).operation + ", amount: " + results.rows.item(i).amount +
              ", balance: " + results.rows.item(i).balance + ", account_id: " + results.rows.item(i).account_id + ", category_id: " + results.rows.item(i).category_id + ", description: " + results.rows.item(i).description);
          }
        } else {
          console.log("no results");
        }
      })
      return records;
    },
    //sqliteRecordsFactory.insertRecord(account_id, category_id, amount, description, timestamp, mydate, hour, day, week, month, year);
    insertRecord: function(account_id, category_id, amount, description, timestamp, mydate, hour, day, week, month, year){
      var query = "INSERT INTO records (account_id, category_id, amount, description, timestamp, mydate, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      console.log("query: "+query);
      $cordovaSQLite.execute(db, query, [account_id, category_id, amount, description, timestamp, mydate, hour, day, week, month, year]).then(function(results) {
        console.log("INSERT RECORD DATA: "+account_id+", "+category_id+", "+amount+", "+description+", "+timestamp+", "+mydate+", "+hour+", "+day+", "+week+", "+month+", "+year);
      }, function (err) {
          console.error(err);
      });
    },
    deleteRecord: function(id){
      var query = "DELETE FROM records WHERE id = '"+id+"'";
      console.log("DELETE FROM records ID->: "+id);
      $cordovaSQLite.execute(db, query, []).then(function(results) {
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
            var temp = {"id": results.rows.item(i).id, "name": results.rows.item(i).category}
            categories.push(temp);
            //console.log("Select: " + results.rows.item(i).id + " name: " + results.rows.item(i).name);
          }
        } else {
          console.log("No results found");
        }
      })
      return categories
    },
    //devuelve categorias de ahorro
    selectCategoriesPlus: function(){
      var categories = [];
      // Ingreso = +
      var select = "SELECT * FROM categories WHERE sign = \"Ingreso\"";
      console.log(select);
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"id": results.rows.item(i).id, "name": results.rows.item(i).category, "sign": results.rows.item(i).sign, "account": results.rows.item(i).account}
            categories.push(temp);
          }
          console.log("catPLUS");
        } else {
          console.log("No results found");
        }
      })
      return categories
    },
    //devuelve categorias de gasto
    selectCategoriesMinus: function(){
      var categories = [];
      // Gasto = -
      var select = "SELECT * FROM categories WHERE sign = \"Gasto\"";
      console.log(select);
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"id": results.rows.item(i).id, "name": results.rows.item(i).category, "sign": results.rows.item(i).sign, "account": results.rows.item(i).account}
            categories.push(temp);
          }
        } else {
          console.log("No results found");
        }
      })
      return categories
    },
    insertCategory: function(category, sign){
      var query = "INSERT INTO categories (category, sign) VALUES (?,?)";
      $cordovaSQLite.execute(db,query, [category, sign]).then(function(results) {
        console.log("INSERT RECORDS ID -> " + results.insertId + " CATEGORY: " + category + "SIGN: "+sign);
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
            var temp = {"id": results.rows.item(i).id, "name": results.rows.item(i).account}
            accounts.push(temp);
            //console.log("Select: " + results.rows.item(i).id + " name: " + results.rows.item(i).name);
          }
        } else {
          console.log("No results found");
        }
      })
      return accounts
    },
    insertAccount: function(account, incomes, expenses, balance){
      var query = "INSERT INTO accounts (account, incomes, expenses, balance) VALUES (?,?,?,?)";
      $cordovaSQLite.execute(db,query, [account, incomes, expenses, balance]).then(function(results) {
        console.log("INSERT RECORDS ID -> " + results.insertId + " ACCOUNT: "+ account);
      }, function (err) {
        console.error(err);
      });
    }
  }
  return sqliteAccounts;
});

factories.factory("sqliteMovementsFactory", function($cordovaSQLite) {
  var db = $cordovaSQLite.openDB({ name: "my.db" });
  var sqliteMovements = {
    //select que muestra registros, cuentas y categorías
    selectMovements: function(account, from, to){
      var movements = [];
      var select;
      console.log("account: "+account+ ", from: "+from+", to: "+to);
      if(account != 0) {

        /*SELECT r.date, a.account, r.amount, c.category, c.sign, a.balance FROM records AS 'r' INNER JOIN accounts AS 'a' ON r.account_id = a.id INNER JOIN categories AS 'c' ON r.category_id = c.id WHERE date >= '"+from+"' AND date <= '"+to+"' AND r.account_id = '"+account+"'";*/
        select = "SELECT r.date AS 'date', a.account AS 'account', r.amount AS 'amount', c.category AS 'category', c.sign AS 'sign', a.balance AS 'balance' FROM records AS 'r' INNER JOIN accounts AS 'a' ON r.account_id = a.id INNER JOIN categories AS 'c' ON r.category_id = c.id WHERE r.timestamp >= '"+from+"' AND r.timestamp <= '"+to+"' AND r.account_id = '"+account+"'";
        //select = "SELECT r.id AS 'id', r.date AS 'date', a.account AS 'account', c.category AS 'category', r.amount AS 'amount', a.balance AS 'balance', r.sign AS 'sign' FROM records AS 'r' INNER JOIN accounts AS 'a' ON r.account_id = a.id INNER JOIN categories AS 'c' ON r.category_id = c.id WHERE date >= '"+from+"' AND date <= '"+to+"' AND r.account_id = '"+account+"'";
      }else {
        //select = "SELECT r.id AS 'id', r.date AS 'date', a.account AS 'account', c.category AS 'category', r.amount AS 'amount', a.balance AS 'balance', r.sign AS 'sign' FROM records AS 'r' INNER JOIN accounts AS 'a' ON r.account_id = a.id INNER JOIN categories AS 'c' ON r.category_id = c.id WHERE date >= '"+from+"' AND date <= '"+to+"'";
        select = "SELECT r.date AS 'date', a.account AS 'account', r.amount AS 'amount', c.category AS 'category', c.sign AS 'sign', a.balance AS 'balance' FROM records AS 'r' INNER JOIN accounts AS 'a' ON r.account_id = a.id INNER JOIN categories AS 'c' ON r.category_id = c.id WHERE r.timestamp >= '"+from+"' AND r.timestamp <= '"+to+"'";
      }
      console.log("SELECT: "+select);
      //SELECT operation, a.name AS 'Cuenta', c.name AS 'Categoria', amount 
      //FROM records AS 'r' INNER JOIN accounts AS 'a' ON r.account_id = a.id INNER JOIN categories AS 'c' ON r.category_id = c.id;
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"date": results.rows.item(i).date, "operation": results.rows.item(i).sign, "account": results.rows.item(i).account, "category": results.rows.item(i).category, "amount": results.rows.item(i).amount, "balance": results.rows.item(i).balance}
            console.log("temp: "+angular.toJson(temp));
            movements.push(temp);
            //console.log("SELECTED -> Operación: " + results.rows.item(i).operation + " Cuenta: " + results.rows.item(i).name + " Cantidad: " results.rows.item(i).amount + "€");
          }
        } else {
          console.log("No results found");
        }
      })
      return movements
    },
    selectBalanceAcc: function(from, to){
      var records = [];
      //var select = "SELECT a.name AS 'cuenta', balance FROM records AS 'r' INNER JOIN accounts AS 'a' ON r.account_id = a.id WHERE date >='" + from + "' GROUP BY account_id, date";
      /*SELECT account_id, sum(cantidubi), date from (
          SELECT account_id, sum(amount) AS cantidubi, date, timestamp FROM records WHERE sign LIKE 'Ingreso' GROUP BY account_id, date UNION
          SELECT account_id, sum(amount*(-1)
        ) AS cantidubi, date, timestamp FROM records WHERE sign LIKE 'Gasto' GROUP BY account_id, date) GROUP BY account_id, date ORDER BY account_id, timestamp;
      */
      var select = "SELECT account_id, sum(cantidubi) AS balance, date FROM (SELECT account_id, sum(amount) AS cantidubi, date, timestamp FROM records WHERE sign LIKE 'Ingreso' GROUP BY account_id, date UNION SELECT account_id, sum(amount*(-1)) AS cantidubi, date, timestamp FROM records WHERE sign LIKE 'Gasto' GROUP BY account_id, date) GROUP BY account_id, date ORDER BY account_id, timestamp"
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"name":results.rows.item(i).account_id, "data": results.rows.item(i).balance};
            //console.log(angular.toJson(temp));
            records.push(temp);
            //console.log("SELECTED -> cuenta: "+ results.rows.item(i).cuenta + " balance: " + results.rows.item(i).balance + ", Fecha: " + results.rows.item(i).date);
          }
            console.log("balances: "+angular.toJson(records));
        } else {
          console.log("no results");
        }
      })
      return records;
    },
    selectBalanceCat: function(sign){
      /*SELECT mo.categoria, mo.signo, sum(cantidad) AS 'total' FROM movimientos AS 'mo'
        INNER JOIN cuentas AS 'cu' ON mo.cuenta = cu.cuenta
        INNER JOIN categorias AS 'ca' ON mo.categoria = ca.categoria
        WHERE mo.signo = '-'
        GROUP BY mo.categoria;
      */
      var records = [];
      //SELECT c.name, sum(amount) FROM categories AS 'c' INNER JOIN records AS 'r' ON c.id = r.category_id GROUP BY c.name;
      var select = "SELECT c.category as 'category', r.sign AS 'sign', sum(amount) AS 'total', r.account_id AS 'cuenta' FROM records AS 'r' INNER JOIN categories AS 'c' ON r.category_id = c.id WHERE r.sign = '"+sign+"' GROUP BY r.category_id  HAVING sum(amount) > 0";
      $cordovaSQLite.execute(db, select, []).then(function(results) {
        if(results.rows.length > 0) {
          for(var i=0; i<results.rows.length; i++){
            var temp = {"name":results.rows.item(i).category, "y": Math.abs(results.rows.item(i).total)};
            //console.log(angular.toJson(temp));
            records.push(temp);
            console.log("SELECTED -> categoría: "+ results.rows.item(i).category + " cuenta: "+ results.rows.item(i).cuenta + " signo: " + results.rows.item(i).sign + ", total: " + results.rows.item(i).total);
          }
            console.log("categories: "+angular.toJson(records));
        } else {
          console.log("no results");
        }
      })
      return records;
    },
    insertMovements: function(name){
      var query = "INSERT INTO movements (name) VALUES (?)";
      $cordovaSQLite.execute(db,query, [name]).then(function(results) {
        console.log("INSERT RECORDS ID -> " + results.insertId);
      }, function (err) {
        console.error(err);
      });
    },
    addBalance: function(account_id, category_id, amount, sign, description, timestamp, mydate, hour, day, week, month, year){
      //agrega el saldo a la cuenta en cuestión
      var query = "UPDATE accounts SET incomes = (SELECT incomes FROM accounts WHERE id = ?)+?, balance = (SELECT balance FROM accounts WHERE id = ?)+ ? WHERE id = ?";
      console.log("query: "+query);
      $cordovaSQLite.execute(db,query, [account_id, amount, account_id, amount, account_id]).then(function(results) {
        console.log("AGREGADO SALDO: "+amount+" a la cuenta: "+account_id);
      }, function (err) {
        console.error(err);
      });
      //account_id, category_id, amount, description, timestamp, date, hour, day, week, month, year
      var query = "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      $cordovaSQLite.execute(db,query, [account_id, category_id, amount, sign, description, timestamp, mydate, hour, day, week, month, year]).then(function(results) {
        console.log("INSERT INTO RECORDS-> id: " +results.insertId+" acc: "+account_id+ " cat: "+category_id+" amount: "+amount+" sign: "+sign+" desc: "+description+" tstamp: "+timestamp+" date: "+mydate+" hour: "+hour+" day: "+day+" week: "+week+" month: "+month+" year: "+year);
      }, function (err) {
        console.error(err);
      });
    },
    addExpense: function(account_id, category_id, amount, sign, description, timestamp, mydate, hour, day, week, month, year){
      //agrega gastos y reduce el balance de la cuenta
      var query = "UPDATE accounts SET expenses = (SELECT expenses FROM accounts WHERE id = ?)+?, balance = (SELECT balance FROM accounts WHERE id = ?)- ? WHERE id = ?";
      console.log("query: "+query);
      $cordovaSQLite.execute(db,query, [account_id, amount, account_id, amount, account_id]).then(function(results) {
        console.log("GASTOS AGREGADOS: "+amount+" a la cuenta: "+account_id);
      }, function (err) {
        console.error(err);
      });
      //account_id, category_id, amount, description, timestamp, date, hour, day, week, month, year
      var query = "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      $cordovaSQLite.execute(db,query, [account_id, category_id, amount, sign, description, timestamp, mydate, hour, day, week, month, year]).then(function(results) {
        console.log("INSERT INTO RECORDS-> id: " +results.insertId+" acc: "+account_id+ " cat: "+category_id+" amount: "+amount+" sign: "+sign+" desc: "+description+" tstamp: "+timestamp+" date: "+mydate+" hour: "+hour+" day: "+day+" week: "+week+" month: "+month+" year: "+year);
      }, function (err) {
        console.error(err);
      });
    },
    addTransfer: function(originAccount, targetAccount, category_id, amount, originSign, targetSign, description, timestamp, mydate, hour, day, week, month, year){
      //agrega gastos a origen
      var query = "UPDATE accounts SET expenses = (SELECT expenses FROM accounts WHERE id = ?)+?, balance = (SELECT balance FROM accounts WHERE id = ?)- ? WHERE id = ?";
      console.log("query: "+query);
      $cordovaSQLite.execute(db,query, [originAccount, amount, originAccount, amount, originAccount]).then(function(results) {
        console.log("GASTOS AGREGADOS: "+amount+" a la cuenta: "+originAccount);
      }, function (err) {
        console.error(err);
      });
      //registrar movimiento transferencia origen
      var query = "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      $cordovaSQLite.execute(db,query, [originAccount, category_id, amount, originSign, description, timestamp, mydate, hour, day, week, month, year]).then(function(results) {
        console.log("INSERT INTO RECORDS-> id: " +results.insertId+" acc: "+originAccount+ " cat: "+category_id+" amount: "+amount+" sign: "+originSign+" desc: "+description+" tstamp: "+timestamp+" date: "+mydate+" hour: "+hour+" day: "+day+" week: "+week+" month: "+month+" year: "+year);
      }, function (err) {
        console.error(err);
      });
      //agrega ingresos a destino
      var query = "UPDATE accounts SET incomes = (SELECT incomes FROM accounts WHERE id = ?)+?, balance = (SELECT balance FROM accounts WHERE id = ?)- ? WHERE id = ?";
      console.log("query: "+query);
      $cordovaSQLite.execute(db,query, [targetAccount, amount, targetAccount, amount, targetAccount]).then(function(results) {
        console.log("INGRESOS AGREGADOS: "+amount+" a la cuenta: "+targetAccount);
      }, function (err) {
        console.error(err);
      });
      //registrar movimiento transferencia destino
      var query = "INSERT INTO records (account_id, category_id, amount, sign, description, timestamp, date, hour, day, week, month, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      $cordovaSQLite.execute(db,query, [targetAccount, category_id, amount, targetSign, description, timestamp, mydate, hour, day, week, month, year]).then(function(results) {
        console.log("INSERT INTO RECORDS-> id: " +results.insertId+" acc: "+targetAccount+ " cat: "+category_id+" amount: "+amount+" sign: "+targetSign+" desc: "+description+" tstamp: "+timestamp+" date: "+mydate+" hour: "+hour+" day: "+day+" week: "+week+" month: "+month+" year: "+year);
      }, function (err) {
        console.error(err);
      });
      console.log("transferencia completada");
    }
  }
  return sqliteMovements;
});