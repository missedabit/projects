$(document).ready( function (){

	$("#submitLogin").click( function( ){

			$.load("load.htm", function (data){
				$("#itemList ul").append(data);
			});

	} );

} );