var conn_mysql = require("../db/dbconnect.js")



// End point implementations

//root
module.exports.root = function(req, res){
	res.status(200).json({Message: "Welcome, please use specific endpoints for outputputs"})
	
}
 

// Restaurant Object routes
//view  all Restuarants 
module.exports.fetchRestaurants = (req, res)=>{
	conn_mysql.getConnection(function(err, con) {
    if(err) 
        res.status(500).json({Error: error})
    var sql = 'select rid, rname, address, phone from restaurants'
	con.query(sql, (error, results, fields) => {
		con.release()
		if (error) {
            res.status(500).json({Error: error})
	    } 
		else if (!results.length){
			res.status(200).json({"Message": "No Restaurants found"})
		}
		else{
            var op_results = []
            for (var rec in results) {
                op_results.push({rid: results[rec].rid, 
                                rname: results[rec].rname,
                                address:results[rec].address,
                                phone:results[rec].phone})
                }
           
           
			res.status(200).json(op_results)
			}
		})
    })
}

//Get a single Restaurant details by passing restaurant id.
module.exports.fetchRestaurant = (req, res)=>{
	var rest_id = req.params.ID	
	conn_mysql.getConnection(function(err, con) {
    if(err) 
        res.status(500)
    var sql = 'select rid, rname, address, phone from restaurants where rid=?'
	con.query(sql, [rest_id], (error, results, fields) => {
		con.release()
		if (error) {
            res.status(500).json({Error: error})
        } 
		else if (!results.length){
			res.status(200).json({"Message": "No Restaurants found with "+rest_id+"ID"})
		}
		else{
            var op_results = {  "rid": results[0].rid, 
                                "rname": results[0].rname,
                                "address":results[0].address,
                                "phone":results[0].phone}
              
			res.status(200).json(op_results)
			}
		})
    })
}

//Add Restaurant 
module.exports.addRestaurant = (req, res)=>{
	if(req.body.length == 0) {
		res.status(400).json({Error: "Empty Request body"})
    }
    
	else{
        console.log(req.body)
		conn_mysql.getConnection((err, con)=> {
            if(err) 
                res.status(500)
			var inp = {
				rname: req.body.rname,
				address: req.body.address,
				phone: req.body.phone
                }
            var sql= 'select * from restaurants where rname=? and address=?'
            con.query(sql,[inp.rname,inp.address], (error, results, fields) => {
                if (error) {
                    res.status(500).json({Error: error})
                } 
                else if (results.length!=0){
                    res.status(200).json({Message: "Restaurant already added to the system"})
                }
                else{
                    sql = 'insert into restaurants set ?'
                    con.query(sql, inp, function (error, results, fields) {
                        
                        if (error) {
                        res.status(500).json({Error: error})
                        }
                        else{
                        res.status(200).json({Message:"Restaurant with RID: "+results.insertId+" is added to the system."})
                        }
                    })
                }
        })
	})
    }
}
    
//Deleting a Restaurant
module.exports.deleteRestaurant = (req, res)=>{
	var rest_id = req.params.ID
    conn_mysql.getConnection(function(err, con) {
        if(err) {
            res.status(500)
         
        }
		var sql = 'delete from restaurants where rid=?'
		con.query(sql, [rest_id], function (error, results, fields) {
        con.release()
        
		if (error) {
            res.status(500).json({Error: error})
        }
        
		else if(results.affectedRows == 0){
			res.status(200).json({Message: "No Restaurant with RID:"+rest_id+" found in the system"})
        }
        else{
        res.status(200).json({Message: "Restaurant with RID:"+rest_id+" is successful"})
        }
		})
		
	
	})
	
}


//Get menus in a Restaurant by passing restaurant id.
module.exports.fetchRestaurantmenu = (req, res)=>{
	var rest_id = req.params.ID	
	conn_mysql.getConnection(function(err, con) {
    if(err) 
        res.status(500)
    var sql = 'select  menu, description from menus where rid=?'
	con.query(sql, [rest_id], (error, results, fields) => {
		con.release()
		if (error) {
            res.status(500).json({Error: error})
        } 
		else if (!results.length){
			res.status(200).json({"Message": "No Menus are registered for the Restaurant with ID "+rest_id})
		}
		else{
            var op_results = []
            for (var rec in results) {
                op_results.push({menu: results[rec].menu, 
                                description: results[rec].description,
                })
            }
              
			res.status(200).json(op_results)
			}
		})
    })
}


   
//Deleting a menu catagory from a restaurant
module.exports.deleteMenu = (req, res)=>{
    //console.log(req.params)
    var rest_id = req.params.RID
    var menu = req.params.MENU
    conn_mysql.getConnection(function(err, con) {
        if(err) {
            res.status(500)
        }
		var sql = 'delete from menus where rid=? and menu=?'
		con.query(sql, [rest_id,menu], function (error, results, fields) {
            con.release()
           // console.log(results.changedRows)
            if (error) {
                res.status(500).json({Error: error})
            }
            else if(results.affectedRows == 0){
                res.status(200).json({Message: "No Restaurant with RID:"+rest_id+" and menu:"+menu+" found in the system"})
            }
            else{
            res.status(200).json({Message: "Deleting the menu for Restaurant with restaurantID:"+rest_id+" and menu:"+menu+" is successful"})
            }
		})
	})
}


//Add Menu for a restaurant
module.exports.addMenu = (req, res)=>{
	if(req.body.length == 0) {
		res.status(400).json({Error: "Empty Request body"})
    }
    
	else{
        console.log(req.body)
		conn_mysql.getConnection((err, con)=> {
            if(err) 
                res.status(500)
            var inpjson = req.body.json;
            var inp = {
				menu:req.body.menu,
				description: req.body.description,
				rid: req.body.rid
            }
            var sql = 'insert into menus set ?'
			con.query(sql, inp, function (error, results, fields) {
			con.release()
             
            if (error) {
                if(error.errno === 1062){
                    res.status(200).json({Message:"Menu category is already present for the restaurant"}) 
                }
                res.status(500).json({Error: error})
                throw error
            }
            
            else{
			    res.status(200).json({Message:"Menu is added to the restaurant"})
            }
        })
	    })
	}
}
 
//Adding menu items to the restaurant
module.exports.addMenuItem = (req, res)=>{
	if(req.body.length == 0) {
		res.status(400).json({Error: "Empty Request body"})
    }
    
	else{
        console.log(req.body)
		conn_mysql.getConnection((err, con)=> {
            if(err) 
                return res.status(500)
            var inpjson = req.body.json;
            var inp = {
                rid: req.body.rid,
				menu:req.body.menu,
				item_name: req.body.item_name,
                item_description: req.body.item_description,
                price: req.body.price
            }
            var sql= 'select * from menu_items where item_name=? and item_description=? and rid=?'
            con.query(sql,[inp.item_name,inp.item_description,inp.rid], (error, results, fields) => {
                if (error) {
                    res.status(500).json({Error: error})
                } 
                else if (results.length!=0){
                    res.status(200).json({Message: "Menu Item is already added to the restaurant"})
                }
                else{

                    var sql = 'insert into menu_items set ?'
			        con.query(sql, inp, function (error, results, fields) {
			            con.release()
                     if(error){
                        if(error.errno==1062){
                            res.status(200).json({Message:"Item is already present for the restaurant"}) 
                        }
                        else
                             res.status(500).json({Error: error})
                        }
                     else{
			        res.status(200).json({Message:"Item is added to the specified menu category of the restaurant"})
                        }
            })
        }
        })
    })
}
}
//Getting Menu items for a Restaurant
module.exports.fetchMenuItems = (req, res)=>{
	var rest_id = req.params.RID	
	conn_mysql.getConnection(function(err, con) {
    if(err) 
        res.status(500)
    var sql = 'select item_id, menu,item_name, item_description,price from menu_items where rid=?'
	con.query(sql, [rest_id], (error, results, fields) => {
		con.release()
		if (error) {
            res.status(500).json({Error: error})
        } 
		else if (!results.length){
			res.status(200).json({"Message": "No Menus are registered for the Restaurant with ID "+rest_id})
		}
		else{
            var op_results = []
            for (var rec in results) {
                op_results.push({item_id:results[rec].item_id,
                                menu: results[rec].menu,
                                item_name: results[rec].item_name,
                                item_description: results[rec].item_description,
                                price: results[rec].price
                })
            }
              
			res.status(200).json(op_results)
			}
		})
    })
}

//Deleting a menuitem
module.exports.deleteMenuItem = (req, res)=>{
    var rid = req.body.rid
    var menu = req.body.menu
    var item_name = req.body.item_name
    conn_mysql.getConnection(function(err, con) {
        if(err) {
            res.status(500)
            return
        }
		var sql = 'delete from menu_items where rid=? and menu=? and item_name=?'
		con.query(sql, [rid,menu,item_name], function (error, results, fields) {
            con.release()
           // console.log(results.changedRows)
            if (error) {
                res.status(500).json({Error: error})
            }
            else if(results.affectedRows == 0){
                res.status(200).json({Message: "No item found with the information given in the system"})
            }
            else{
            res.status(200).json({Message: "Deleting of the item is successful"})
            }
		})
	})
}