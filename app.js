$(document).ready(function(){
	$(document).click(function(e){
		if($(e.target).hasClass('add-ingrident')){
			addIngredient(e.target);
		}else if($(e.target).hasClass('add-insructions')){
			addInstruction(e.target);
		}
	});

	$(".addPlanImage").click(function(){
		addImage(this);
	});

	$(".exit").click(function(e){
		// window.location.href = "#";

		e.preventDefault();
	});

	$(".save").click(function(e){
		var data = selectAll();
		console.log(data);
	});
	allEventListeners();
});


