// Dependencies
var Sequelize = require("sequelize");
var fs = require('fs');

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize("welist", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Creates a "Lists" model that matches up with DB
var Lists = sequelize.define("lists", {

  	userid: Sequelize.STRING,
  	list_id: Sequelize.INTEGER,
  	category: Sequelize.STRING,
  	title: Sequelize.STRING,
   	description: Sequelize.STRING(1000),
    source_url: Sequelize.STRING,
  	list_photo: Sequelize.STRING
	}, {
	  timestamps: true
	});

// Syncs with DB
Lists.sync();

function parse(row){
  var insideQuote = false,                                             
      entries = [],                                                    
      entry = [];
  row.split('').forEach(function (character) {                         
    if(character === '"') {
      insideQuote = !insideQuote;                                      
    } else {
      if(character == "," && !insideQuote) {                           
        entries.push(entry.join(''));                                  
        entry = [];                                                    
      } else {
        entry.push(character);                                         
      }                                                                
    }                                                                  
  });
  entries.push(entry.join(''));                                        
  return entries;                                                      
}
// Creates a "Lists" model that matches up with DB
var ListItems = sequelize.define("list_items", {

  	list_id: Sequelize.INTEGER,
  	item: Sequelize.STRING,
	item_number: Sequelize.INTEGER
	}, {
	  timestamps: true
	});

// Syncs with DB
ListItems.sync();

fs.readFile("lists_5_22.csv", "utf8", function(error,data) {
		if (!error) {

			// split the file data into an array of lines of text
			var listsRows = data.split("\r\n");


			for (var i = 1; i < listsRows.length; i++) {

				 var rowFields = parse(listsRows[i]);
				 console.log("\n\n" + Number(rowFields[1]) + "\n\n");

				 if (Number(rowFields[1]) > 100) {

						Lists.create({

							userid: rowFields[0],
  							list_id: Number(rowFields[1]),
  							category: rowFields[2],
  							title: rowFields[3],
   							description: rowFields[4],
    						source_url: rowFields[5],
  							list_photo: rowFields[6]

						}); // end create
				} // end if		

			} // end for loop

		} else {
			 console.log("\nError reading Lists import file");
			 main();
		}
});


fs.readFile("list_items_5_22.csv", "utf8", function(error,data) {
		if (!error) {

			// split the file data into an array of lines of text
			var itemsRows = data.split("\r\n");


			// loop through the array to retrieve the card front info 
			// and corresponding card file name for each index entry
			for (var i = 1; i < itemsRows.length; i++) {

				 var rowFields = itemsRows[i].split(',');

				if (Number(rowFields[0]) > 100) {

						ListItems.create({

  							list_id: Number(rowFields[0]),
  							item: rowFields[1],
  							item_number: Number(rowFields[2])

						}); // end create
				} // end if		

				 
	

			} // end for loop

		} else {
			 console.log("\nError reading List_Items import file");
			 main();
		}
});		

console.log('done');		
