$(document).ready( function() { 

	$("#banana").on("click",function(){
		$(this).css("color","green");
	});

	$("#block1").css("float","left").css("width","200px").css("height","200px").css("background-color","red").text("this is a red");
	$("#block2").css("float","left").css("width","200px").css("height","200px").css("background-color","yellow").text("this is a yellow");

	$("#block1").click( function() {
		$(this).slideToggle("slow", function(){
			$(this).show().css("border","4px solid green");
		});
	} );

	$("button").click( function(){
		var inputItem = $("input").val();
		$("#addStuff").html(inputItem);
	 });

	$(".loader").click( function(){
		$("#loadContent").load("load.htm", function(data){
			var title = "My Title:";
			$(this).html("<p>"+title+data+"</p>")
		});
	});

	$(".trigger").one("click", function(){

		$(".listItems").each( function(){
			$("ul li").append("hellow").css("color","green");
		});
	});

	$("#block3").css("float","left").css("width","200px").css("height","200px").css("background-color","orange").text("this is a block4");
	$("#block4").css("float","left").css("width","200px").css("height","200px").css("background-color","pink").text("this is a block5");


	$("#block3").click( function() {
		$(this).toggle("slow", function(){
			$("#block4").hide();
			$(this).show();
		});
	} );


})