const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from chat where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id,callback){
		var sql= "select * from chat where id=? ";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},
	
	getByname: function(name,callback){
		var sql= "select * from chat where username=? ";
		db.getResults(sql, [name], function(results){
			callback(results);
		});
	},

	
	
	getAll: function(callback){
		var sql = "select * from chat";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "insert into chat VALUES (?, ?, ?, ?)";

		db.execute(sql, ['', user.username, user.password, user.type], function(status){
			callback(status);
		});
	},
	update: function(user,callback){
        var sql = "UPDATE chat SET fname = ?, password =?, email= ?, phone= ?, address=? WHERE  username = ? ";

		db.execute(sql, [ user.fname, user.password, user.email, user.phone, user.address, user.username], function(status){
			callback(status);
		});
	},
	delete: function(user,callback){
        var sql = "DELETE FROM chat WHERE username= ? and password= ? ";

		db.execute(sql, [ user.username, user.password], function(status){
			callback(status);
        
	    });
    }
}