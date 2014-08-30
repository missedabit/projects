$(document).ready( function (){

	$("#signIn").click( function(e){
		e.preventDefault();
		$("#loginArea").load ( 'load.htm', function() {
			console.log("loaded div snippet and replace signin with welcome message and signout link");
		} )

	} )

} )




