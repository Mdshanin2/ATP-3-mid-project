const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from job_list where buyer_uname=? and buyer_email=?";  //
		db.getResults(sql, [user.buyer_uname, user.buyer_email], function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getsearch: function(id,callback){
		var sql= "select * from job_list where buyer_uname like '%?%'";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},

	getById: function(id,callback){
		var sql= "select * from finance where id=? ";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},
	
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
		var sql = "select * from finance";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "insert into job_list VALUES (?, ?, ?, ?, ?, ?, ?)";

		db.execute(sql, ['', user.buyer_uname, user.buyer_email, user.job_desc, user.job_date, user.salary, user.freelancer_uname], function(status){
			callback(status);
		});
	},
	update: function(user,callback){
        var sql = "UPDATE finance SET month = ?, amount =? WHERE  id = ? ";

		db.execute(sql, [user.month, user.amount, user.id], function(status){
			callback(status);
		});
	},
	delete: function(user,callback){ // check if i am sending an object in user or a single value
        var sql = "DELETE FROM job_list WHERE id= ? ";

		db.execute(sql, [ user.id], function(status){
			callback(status);
        
	    });
    }
}