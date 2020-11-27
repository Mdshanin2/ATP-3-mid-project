$(document).ready(function(){

	$('input[type=button]').click(function(){
		let json = {
			"username" : $('#username').val()
		}
		$.ajax({
			url: '/buyer/searchFreelancer',
			type: 'POST',
			dataType:'json',
			data: json,
			success: function(response){
				$("#searchresult").html(response.status);
			},
			error: function(error){

			}
		});

	});			
});