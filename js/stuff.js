$(document).ready( function() {

	$("#banana").on("click",function(){
		$(this).css("color","green");
});

	$("#block1").css("float","left").css("width","200px").css("height","200px").css("background-color","red").text("this is a red");
	$("#block2").css("float","left").css("width","200px").css("height","200px").css("background-color","yellow").text("this is a yellow");

	$("#block1").click( function() {

		$(this).slideToggle('slow');

	} );

	$("button").click( function(){

		var inputItem = $("input").val();

		$("#addStuff").html(inputItem);



	 });

})