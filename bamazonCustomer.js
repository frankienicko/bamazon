var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "281187**LOSTlt",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

inquirer.prompt([
//do you want to shop
{
    type: "confirm",
    message: "Welcome to BAMAZON!  Would you like to make a purchase today?",
    name: "confirm",
    default: true
},

//store the answer
]).then(function(user) {
   // If the user confirms, we take the order.
    if (user.confirm) {
      var table = new Table ({
        head: ['Item Id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
        , colWidths: [20, 20, 20, 20, 20]
        });

    //read from database
    connection.query("SELECT * FROM products", function(error, response){
        if (error) throw error;
        console.log(response.length);
        //push data to table
        for(var i =0; i<response.length;i++){
            table.push([response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]);
        }
        //print table
        console.log(table.toString());
    
            //next prompt - ask the item number
            inquirer.prompt([
            {
                type: "input",
                message: "Please enter the item number of the product you would like to purchase.",
                name: "item_id"
            },
            //store the answer
            ]).then(function(user) {
            //check if valid item number
            if (user.item_id > 0 && user.item_id<=response.length ) {
                //put the item number in a variable
                var item_id = user.item_id-1
                //console.log("#"+itemNumber)
                //next prompt - ask the quantity
                inquirer.prompt([
                {
                    type: "input",
                    message: "How many item " + user.item_id + ": " + response[user.item_id-1].product_name + " do you want?",
                    name: "quantity"
                },
                //store the answer
                ]).then(function(user) {
                    //check for available quantity
                    if (user.quantity <= response[item_id].stock_quantity){
                        //log the total cost
                        console.log("Your cost will be $" + (user.quantity*response[item_id].price).toFixed(2));

                        //subtract from database
                            var newQty = response[item_id].stock_quantity-user.quantity
                            connection.query("UPDATE products SET ? WHERE ?", [{
                              stock_quantity: newQty
                            }, {
                              item_id: item_id+1
                            }], function(err, res) {});
                             
                                inquirer.prompt([
                                //confirm
                                {
                                type: "confirm",
                                message: "Would you like to purchase anything else?",
                                name: "confirm",
                                default: true
                                },
        
                                    //store the answer
                                    ]).then(function(user) {
                                    // If the user confirms, we take the order.
                                        if (user.confirm) {
                                        var table = new Table ({
                                        head: ['Item Id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
                                        , colWidths: [20, 20, 20, 20, 20]
                                        });

                                    //read from database
                                    connection.query("SELECT * FROM products", function(error, response){
                                        if (error) throw error;
                                        console.log(response.length);
                                        //push data to table
                                        for(var i =0; i<response.length;i++){
                                        table.push([response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]);
                                    }
                                        //print table
                                            console.log(table.toString());

                                        //next prompt - ask the item number
                                        inquirer.prompt([
                                        {
                                        type: "input",
                                        message: "Please enter the item number of the product you would like to purchase.",
                                        name: "item_id"
                                        },
                                            //store the answer
                                            ]).then(function(user) {
                                            //check if valid item number
                                                if (user.item_id > 0 && user.item_id<=response.length ) {
                                                //put the item number in a variable
                                                var item_id = user.item_id-1
                                                //console.log("#"+itemNumber)
                                                //next prompt - ask the quantity
                                                inquirer.prompt([
                                                {
                                                type: "input",
                                                message: "How many item " + user.item_id + ": " + response[user.item_id-1].product_name + " do you want?",
                                                name: "quantity"
                                                },
                                                //store the answer
                                                ]).then(function(user) {
                                                //check for available quantity
                                                    if (user.quantity <= response[item_id].stock_quantity){
                                                        //log the total cost
                                                        console.log("Your cost will be $" + (user.quantity*response[item_id].price).toFixed(2));

                                               
                                                        //subtract from database
                                                        var newQty = response[item_id].stock_quantity-user.quantity
                                                        connection.query("UPDATE products SET ? WHERE ?", [{
                                                        stock_quantity: newQty
                                                        }, {
                                                        item_id: item_id+1
                                                        }], function(err, res) {});
                       
                                                    } else {
                                                        console.log("Thankyou, please come again!!")
                                                        connection.end();
                                                    }
                                                });

                                                } else {
                                                console.log("Thankyou please come again!!")
                                                connection.end();
                                                }
                                            });
        
        });
        } else {
        console.log("Thankyou please come again!!")
        connection.end();
        };                                        

    // If the user does not confirm, then a message is provided and the program quits.
    });
    } else {
    console.log("Goodbye");
    //done!!
    connection.end();
    }
})
}
})
})
}
})