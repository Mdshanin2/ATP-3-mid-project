const db = require('./db');

module.exports ={

	getById: function(id,callback){
		var sql= "select * from company_plan where id=? ";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},

	getAll: function(callback){
		var sql = "select * from company_plan";
		db.getResults(sql, null, function(results){
			callback(results);
		});
    },
    update: function(user,callback){
        var sql = "UPDATE company_plan SET description = ? WHERE  id = ? ";

		db.execute(sql, [user.description, user.id], function(status){
			callback(status);
		});
	}
}