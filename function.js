
var FADE_TIME = 50;

function addReceipe(){
	var element = document.querySelector(".mainDiv");
	var id = parseInt(element.querySelector(".receipe-id").value);
	id++;
	element.querySelector(".receipe-id").value = id;	
	var div = document.createElement("div");
	div.className = "receipe meal-div bg-white rounded-lg border mt-4 shadow-sm pb-4 pt-4 mt-4 meal-block";
	div.style.opacity = 0;
	div.style.filter = "alpha(opacity=0)";
	var receipes = element.querySelectorAll(".receipe");
	div.innerHTML = receipes[receipes.length-1].innerHTML;
	div.querySelector(".picture").innerHTML = `
															<div class="meal-picture-img">
																<i class="fa fa-picture-o"></i>
															</div>`;
	element.appendChild(div);
	var steps = 0;
    var timer = setInterval(function() {
        steps++;
        div.style.opacity = 0.05 * steps;
        div.style.filter = "alpha(opacity=" + (5 * steps) + ")";
        if(steps >= 20) {
            clearInterval(timer);
            timer = undefined;
        }
    }, FADE_TIME);
	var ingBtns = element.querySelectorAll('.add-ingrident');
	ingBtns[ingBtns.length-1].addEventListener("click", function(){
		addIngredient(this);
	});
	var instrBtns = element.querySelectorAll('.add-insructions');
	instrBtns[instrBtns.length-1].addEventListener('click', function(){
		addInstruction(this);
	});
}


function addIngredient(element)
{
	var id = element.parentNode.querySelector(".receipeId").value;
	var num = parseInt(element.parentNode.querySelector(".ingredientCount").value);
	num++;
	var div = document.createElement("div");
	var parent = element.parentNode.parentNode.querySelector(".ingredientForm");
	div.className = "row meal-row mt-2";
	div.style.opacity = 0;
	div.style.filter = "alpha(opacity=0)";
	element.parentNode.querySelector(".ingredientCount").value = num;
	div.innerHTML = parent.querySelectorAll('.row')[0].innerHTML
	parent.appendChild(div);
	var steps = 0;
    var timer = setInterval(function() {
        steps++;
        div.style.opacity = 0.05 * steps;
        div.style.filter = "alpha(opacity=" + (5 * steps) + ")";
        if(steps >= 20) {
            clearInterval(timer);
            timer = undefined;
        }
    }, FADE_TIME);
}

function addInstruction(element)
{
	var div = document.createElement("div");
	var parent = element.parentNode.parentNode.querySelector(".instructionsForm");
	div.className = 'instructRow mt-3';
	div.style.opacity = 0;
	div.style.filter = "alpha(opacity=0)";
	div.innerHTML = parent.querySelector('.instructRow').innerHTML;
	parent.appendChild(div);
	var steps = 0;
    var timer = setInterval(function() {
        steps++;
        div.style.opacity = 0.05 * steps;
        div.style.filter = "alpha(opacity=" + (5 * steps) + ")";
        if(steps >= 20) {
            clearInterval(timer);
            timer = undefined;
        }
    }, FADE_TIME);
}

function addImage(element)
{
	element.querySelector('[type=file]').click();
}

function selectAll()
{
	var meal = document.querySelector(".meal");
	var data = {};
	data.planName = meal.querySelector('#planName').value;
	data.planCategory = meal.querySelector('#planCategory').value;
	data.planDescription = meal.querySelector('#planDescription').value;
	data.image = meal.querySelector('.planImage').value;
	data.receipes = [];
	var receipes = meal.querySelector('.mainDiv');
	receipes.querySelectorAll('.receipe').forEach( function(receipe) {
		var receipeData = {};
		receipeData.receipeName = receipe.querySelector(".receipeName").value;
		receipeData.bakeCheck = (receipe.querySelector(".bakeCheck:checked"))? true : false;
		receipeData.broilCheck = (receipe.querySelector(".broilCheck:checked"))? true : false;
		receipeData.microwaveCheck = (receipe.querySelector(".microwaveCheck:checked"))? true : false;
		receipeData.fryCheck = (receipe.querySelector(".fryCheck:checked"))? true : false;
		receipeData.grilCheck = (receipe.querySelector(".grilCheck:checked"))? true : false;
		receipeData.recipeDescription = receipe.querySelector(".recipeDescription").value;
		receipeData.receipeImage = receipe.querySelector(".receipeImage").value;
		receipeData.hours = receipe.querySelector(".hours").value;
		receipeData.minutes = receipe.querySelector(".minutes").value;
		receipeData.videoUrl = receipe.querySelector(".videoUrl").value;
		receipeData.ingredients = [];
		receipe.querySelector('.ingredientForm').querySelectorAll(".row").forEach( function(ingredient) {
			var ingreData = {};
			ingreData.ingredientName = ingredient.querySelector(".ingredientName").value;
			ingreData.quantity = ingredient.querySelector(".quantity").value;
			ingreData.unit = ingredient.querySelector(".unit").value;
			ingreData.average = ingredient.querySelector(".average-price").value;
			receipeData.ingredients.push(ingreData);
		});
		receipeData.instructions = [];
		receipe.querySelector(".instructionsForm").querySelectorAll(".instructRow").forEach( function(instruction) {
			var instrData = {};
			instrData.stepName = instruction.querySelector(".step").value;
			instrData.stepDescription = instruction.querySelector(".step-instructions").value;
			receipeData.instructions.push(instrData);
		});
		data.receipes.push(receipeData);
	});

	return data;
}


function imageBtnEventListener()
{
	var imgbtns = document.querySelectorAll('.addImage');
	imgbtns[imgbtns.length - 1].addEventListener("click", function(){
		addImage(this);
	});
}

function allEventListeners()
{
	imageBtnEventListener();
	fileUploadListener();
	document.querySelector('.addingReceipe').addEventListener("click",function(){
		addReceipe();
		this.parentNode.removeChild(this);
		allEventListeners();
	});
}

function fileUploadListener()
{
	var fileInputs = document.querySelectorAll('[type=file]');
	if(fileInputs[0].getAttribute('listener') !== true){
		fileInputs[0].addEventListener("change", function(){
			var picture = this.parentNode.parentNode.parentNode.querySelector('.picture');
			var img = document.createElement('img');
			img.className = 'img-fluid';
			var fr = new FileReader();
			img.title = this.files[this.files.length-1].name;
			fr.onload = function () {
	         img.src = fr.result;
	         picture.innerHTML = '';
	         picture.appendChild(img);
			}
			fr.readAsDataURL(this.files[this.files.length-1]);
		});
	}
	fileInputs[fileInputs.length-1].addEventListener("change", function(){
		var picture = this.parentNode.parentNode.parentNode.querySelector('.picture');
		var img = document.createElement('img');
		img.className = 'img-fluid';
		var fr = new FileReader();
		img.title = this.files[this.files.length-1].name;
		fr.onload = function () {
         img.src = fr.result;
         picture.innerHTML = '';
         picture.appendChild(img);
         console.log(img);
		}
		fr.readAsDataURL(this.files[this.files.length-1]);
	});
}
