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

// Creates a "List" model that matches up with DB
var List = sequelize.define("Lists", {

  	userid: Sequelize.STRING,
  	list_id: Sequelize.INTEGER,
  	category: Sequelize.STRING,
  	list_type: Sequelize.STRING,
  	title: Sequelize.STRING,
   	description: Sequelize.STRING(1000),
    source_url: Sequelize.STRING,
  	list_photo: Sequelize.STRING,
  	ispublic: Sequelize.BOOLEAN
	}, {
	  timestamps: true
	});

// Syncs with DB
List.sync();

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
// Creates a "List_Item" model that matches up with DB
var List_Item = sequelize.define("List_Items", {

  list_id: Sequelize.INTEGER,
  item: Sequelize.STRING,
	item_number: Sequelize.INTEGER
	}, {
	  timestamps: true
	});

// Syncs with DB
List_Item.sync();

fs.readFile("lists_5_22.csv", "utf8", function(error,data) {
		if (!error) {

			// split the file data into an array of lines of text
			var listsRows = data.split("\r\n");


			for (var i = 1; i < listsRows.length; i++) {

				 var rowFields = parse(listsRows[i]);
				// console.log("\n\n" + Number(rowFields[1]) + "\n\n");

				 if (Number(rowFields[1]) > 100) {

						List.create({

							  userid: rowFields[0],
  							list_id: Number(rowFields[1]),
  							category: rowFields[2],
  							list_type: rowFields[3],
  							title: rowFields[4],
   							description: rowFields[5],
    						source_url: rowFields[6],
  							list_photo: rowFields[7]

						}); // end create
				} // end if		

			} // end for loop

		} else {
			 console.log("\nError reading List import file");
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

				 var rowFields = parse(itemsRows[i]);

				if (Number(rowFields[0]) > 100) {

						List_Item.create({

                list_id: Number(rowFields[0]),
  							item: rowFields[1],
  							item_number: Number(rowFields[2])

						}); // end create
				} // end if		
	

			} // end for loop

		} else {
			 console.log("\nError reading List_Item import file");
			 main();
		}
});		

console.log('done');		
