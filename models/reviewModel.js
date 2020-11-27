const db = require('./db');

module.exports ={

	getsearch: function(id,callback){
		var sql= "select * from job_list where buyer_uname like '%?%'";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},

	getById: function(id,callback){
		var sql= "select * from review where id=? ";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},
	
	// getAll: function(callback){
	// 	var sql= "select * from review";
	// 	db.getResults(sql, [id], function(results){
	// 		callback(results);
	// 	});
	// },
	
	getByname: function(name,callback){
		var sql= "select * from job_list where buyer_uname=? ";
		db.getResults(sql, [name], function(results){
			callback(results);
		});
	},

	getcount: function(callback){
		var sql = "SELECT COUNT(*) as t_c FROM job_list";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},

	
	getAll: function(callback){
		var sql = "select * from review";
		db.getResults(sql,null, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "insert into job_list VALUES (?, ?, ?, ?)";

		db.execute(sql, ['', user.fname, user.review, user.date], function(status){
			callback(status);
		});
	},
	update: function(user,callback){
        var sql = "UPDATE review SET review = ?, date= ? WHERE  id = ? ";

		db.execute(sql, [user.review, user.date, user.id], function(status){
			callback(status);
		});
	},
	delete: function(id,callback){ 
        var sql = "DELETE FROM review WHERE id= ? ";

		db.execute(sql, [id], function(status){
			callback(status);
	    });
    }
}