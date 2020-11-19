const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from buyer where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(){

	},
	
	getAll: function(callback){
		var sql = "select * from buyer";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "insert into buyer VALUES (?, ?, ?, ?, ?, ?, ?)";

		db.execute(sql, ['',user.fname, user.username, user.password, user.email, user.phone, user.address], function(status){
			callback(status);
		});
	},
	update: function(user,callback){
        var sql = "UPDATE buyer SET fname = ?, password =?, email= ?, phone= ?, address=? WHERE  username = ? ";

		db.execute(sql, [ user.fname, user.password, user.email, user.phone, user.address, user.username], function(status){
			callback(status);
		});
	},
	delete: function(user,callback){
        var sql = "DELETE FROM buyers WHERE username= ?  "; //and password= ?

		db.execute(sql, [ user.username], function(status){  //, user.password (if you need it )
			callback(status);
        
	    });
    }
}