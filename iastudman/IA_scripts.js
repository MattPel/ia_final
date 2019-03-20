//error message handling for search name
var nameOk = true;
var yearOk = true;
	
//disables the search button
function disableSearch() {
	$("#submit").attr("disabled", "disabled");
}

//if year and name input conditions are met, enable the search button
function tryToEnableSearch(){
	if (yearOk && nameOk){
		$("#submit").removeAttr("disabled", "disabled");
	} 
}

$("#name").on('input', function (evt) {
	var value = evt.target.value
	
	//checks if input is empty in order to hide error message and try to enable search button
	if (value.length === 0) {
		document.getElementById("error-message-nameID").style.display="none";
		$("#name").removeClass('error');
		nameOk = true;
		tryToEnableSearch();
		return;
	}
	
	//checks if input contains letters and fullstop 
	//in order to hide error message and try to enable search button
	if (/^([A-Za-z .]*)$/.test(value)) {
		document.getElementById("error-message-nameID").style.display="none";
		$("#name").removeClass('error');
		nameOk = true;
		tryToEnableSearch();
	}
	//in any other case show error message and disable search button
	else {
		document.getElementById("error-message-nameID").style.display="block";
		$("#name").addClass('error');
		nameOk = false;
		disableSearch();
	}
});

//error message handling for search year
$('#year').on('input', function (evt) {
  var value = evt.target.value

	//checks if input is empty in order to hide error message and try to enable search button
	if (value.length === 0) {
		document.getElementById("error-message-yearID").style.display="none";
		$("#year").removeClass('error');
		yearOk = true;
		tryToEnableSearch();
		return;
	}
	
	//checks if input is numeric in order to hide error message and try to enable search button
	if ($.isNumeric(value)) {
		document.getElementById("error-message-yearID").style.display="none";
		$("#year").removeClass('error');
		yearOk = true;
		tryToEnableSearch();
	}
	//in any other case show error message and disable search button
	else{
		document.getElementById("error-message-yearID").style.display="block";
		$("#year").addClass('error');
		yearOk = false;
		disableSearch();
	}
})

//makes the input borders green
function makeAroundGreen() {
	$("#name").removeClass('error');
	$("#year").removeClass('error');
}

//the functionality which makes the pictures rotate
var images = new Array ('IA_photos/GermanFlag.jpg', 'IA_photos/ClassroomPicture.jpg', 'IA_photos/Acropolis.jpg');
var index = 1;

function rotateImage()
{
  $('#GermanFlag1').fadeOut('fast', function() 
  {
	$(this).attr('src', images[index]);
	
	$(this).fadeIn('fast', function() 
	{
	  if (index == images.length-1)
	  {
		index = 0;
	  }
	  else
	  {
		index++;
	  }
	});
  });
} 

//set the time for pictures' rotation
$(document).ready(function()
{
  setInterval (rotateImage, 3000);
});

//when clicking on the <div>, open the popup
function openPopup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

//set up the sort alphabetically button
function sortTableAlphabetically() {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("myTable");
	switching = true;
	rows = table.rows;

	while (switching) {
		switching = false;
		rows = table.rows;
		
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[0];
			y = rows[i + 1].getElementsByTagName("TD")[0];
		if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			shouldSwitch = true;
			break;
			}
		}					
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}					
	}
	
}

//AJAX call for the searchForm
$(function() {
	//Get the form.
	var form = $('#searchForm');
	
	//set up a submit event listener for the form
	$(form).on("submit",function(event) {
		//stop the browser from submitting the form
		event.preventDefault();

		//serialize the form data
		var formData = $(form).serialize();
		
		//submit the form via AJAX
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		}).done(function(response) {
				
			$('#results').html(response);
			
			//determine when the "Sort Alphabetically" button will be visible	
			if (response.indexOf('Sorry, no matches found!') < 0) {
				$('#sortAlphabeticallyButton').attr('style', 'display:block;');
			}
			else {
				$('#sortAlphabeticallyButton').attr('style', 'display:none;');
			}
		}).fail(function(response) {

			$('#resultsArea').html(response);
			
		});
	});
});

//AJAX call for the loginForm
$(function() {
	var form = $('#loginForm');
	
	$(form).on("submit",function(event) {
		event.preventDefault();
		
		//serialize the form data
		var formData = $(form).serialize();
		
		//submit the form via AJAX
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		}).done(function(response) {

			//determine when the error message will appear, and when the rest of the application will appear
			if (response.indexOf('Error during login: ') >= 0) {
				$('#errorLoginArea').css('display', 'block');
				$('#errorLoginArea').html(response);				
			}
			else {
				$('#errorLoginArea').css('display', 'none');
				$('#loginForm').css('display', 'none');
				homeClick();
				$('#mySlidebar').css('display', 'block');	
			}
		}).fail(function(response) {
			$('#errorLoginArea').css('display', 'block');
			$('#errorLoginArea').html('Error during login: There was a network problem , please try again later!');
		});
	});
});

//hides the error message that appears when something inappropriate is typed into the search inputs
function hideHint(hint) {
	document.getElementById(hint).style.display="none";
}

//determines when "Course Level" will be visible and when not
function showDropdown(schoolSystem, hiddenOption){
	var option = document.getElementById(schoolSystem).value;
	
	if (option == "IB") {
		document.getElementById(hiddenOption).style.display='block';
	}
	
	else {
		document.getElementById(hiddenOption).style.display="none";
		document.getElementById(hiddenOption).getElementsByClassName("form-control")[0].value="";
	}
}

//makes the "Course Level" option invisible
function closeDropdown(z){
	document.getElementById(z).style.display="none";
}

//checks if all inputs are empty, if they are it prevents submission
function checkAllEmpty(){
	var input1 = document.getElementById("name").value;
	var input2 = document.getElementById("year").value;
	var input3 = document.getElementById("schoolSystemSearch").value;
	if ( input1 == "" && input2 == "" && input3 == "" )
	{
		alert("Please complete at least one field!");
		return false;
	}
	return true;
}

//check if at least one input is empty, if it is it prevents submission
function checkAnyEmpty(){
	var input1 = document.getElementById("insertName").value;
	var input2 = document.getElementById("insertYear").value;
	var input3 = document.getElementById("insertSchoolSystem").value;
	if (input3 == "IB") 
		var input4 = document.getElementById("insertCourseLevel").value;
	if ( input1 == "" || input2 == "" || input3 == "" || (input3 == "IB" && input4 == "") )
	{
		alert("Please complete all available fields!");
		return false;
	}
	return true;
}

//hides the resultsArea
function hideResults(){
		document.getElementById("resultsArea").style.display="none";
}

//makes the resultsArea visible
function showResults(){
		document.getElementById("resultsArea").style.display="block";
}

//enables the search button
function enableSearch() {
	$("#submit").removeAttr("disabled", "disabled");
}

//opens the sidebar and changes the background color of the rest
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "#b4bdc4";
}

//closes the sidebar
function closeNav() {
	document.getElementById("mySidenav").style.width = "0px";
	document.getElementById("main").style.marginLeft = "0px";
	document.body.style.backgroundColor = "#dfe3e6";
}

//makes the sortTableAlphabeticallyButton invisible
function closeSort() {
	document.getElementById("sortAlphabeticallyButton").style.display="none";
}


//auto-save functionality
var timeoutId;
$('#resultsArea').on('input', 'textarea' , function() {

	clearTimeout(timeoutId);
	timeoutId = setTimeout(function() {
		//runs 1 second (1000 ms) after the last change    
		saveToDB();
	}, 1000);
});

function autosave(){
	clearTimeout(timeoutId);
	timeoutId = setTimeout(function() {
		//runs 1 second (1000 ms) after the last change    
		saveToDB();
	}, 1000);
}


//message that appears when something has been saved
$("#saving").hide();
function saveToDB(){
	console.log('Saving to the db');
	var form = $('#externalForm');
	
	$.ajax({
		url: "getstudents.php",
		type: "POST",
		data: $(form).serialize(), //serializes the form's elements.
	})
	.done(function(response) {
		
		//used in order to make the response message fade out after 4 seconds
		$("#saving").fadeIn("fast", function(){
			$("#saving").fadeOut(4000);						
		});
	});
}


//the following three are all functions in order for changing the menu screens
function homeClick(){
	document.getElementById("homeSpace").style.display="block";
	document.getElementById("searchEditSpace").style.display="none";
	document.getElementById("addRemoveSpace").style.display="none";
}

function searchClick(){
	document.getElementById("homeSpace").style.display="none";
	document.getElementById("searchEditSpace").style.display="block";
	document.getElementById("addRemoveSpace").style.display="none";
}

function editClick(){
	document.getElementById("homeSpace").style.display="none";
	document.getElementById("searchEditSpace").style.display="none";
	document.getElementById("addRemoveSpace").style.display="block";
}

	
//AJAX call for addForm
$(function() {
	var form = $('#addForm');
	
	$(form).on("submit",function(event) {
		event.preventDefault();

		if (checkAnyEmpty()){
			//serialize the form data
			var formData = $(form).serialize();
			
			//submit the form via AJAX
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			}).done(function(response) {

				//set the message texts
				
				$('#addRemoveArea').html(response);
				$('#addRemoveArea').attr('style', 'display:block;');
				
			}).fail(function(response) {

				$('#addRemoveArea').html(response);
				$('#addRemoveArea').attr('style', 'display:block;');
				
			});
		}
	});
});

//error message handling for insert name
var insertNameOk = true;
var insertYearOk = true;
	
$("#insertName").on('input', function (evt) {
	var value = evt.target.value
	
	if (value.length === 0) {
		document.getElementById("error-message-nameID2").style.display="none";
		$("#insertName").removeClass('error');
		insertNameOk = true;
		tryToEnableAdd();
		return;
	}
	
	if (/^([A-Za-z .]*)$/.test(value)) {
		document.getElementById("error-message-nameID2").style.display="none";
		$("#insertName").removeClass('error');
		insertNameOk = true;
		tryToEnableAdd();
	}
	else {
		document.getElementById("error-message-nameID2").style.display="block";
		$("#insertName").addClass('error');
		insertNameOk = false;
		disableAdd();
	}
});

//error message handling for insert year
$('#insertYear').on('input', function (evt) {
  var value = evt.target.value

	if (value.length === 0) {
		document.getElementById("error-message-yearID2").style.display="none";
		$("#insertYear").removeClass('error');
		insertYearOk = true;
		tryToEnableAdd();
		return;
	}
	
	if ($.isNumeric(value)) {
		document.getElementById("error-message-yearID2").style.display="none";
		$("#insertYear").removeClass('error');
		insertYearOk = true;
		tryToEnableAdd();
	}
	
	else{
		document.getElementById("error-message-yearID2").style.display="block";
		$("#insertYear").addClass('error');
		insertYearOk = false;
		disableAdd();
	}
})

//disables the add button
function disableAdd() {
	$("#addButton").attr("disabled", "disabled");
}

//tries to enable the add button
function tryToEnableAdd(){
	if (insertYearOk && insertNameOk){
		$("#addButton").removeAttr("disabled", "disabled");
	}
}

//AJAX call for removeForm
$(function() {
	//get the form
	var form = $('#removeForm');
	
	//set up a submit event listener for the form
	$(form).on("submit",function(event) {
		//stop the browser from submitting the form
		event.preventDefault();

		if ($('#removeName').val()!=""){
			//serialize the form data
			var formData = $(form).serialize();
			
			//submit the form via AJAX
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			}).done(function(response) {

				//set the message texts
				
				$('#addRemoveArea').html(response);
				$('#addRemoveArea').attr('style', 'display:block;');
				
			}).fail(function(response) {

				$('#addRemoveArea').html(response);
				$('#addRemoveArea').attr('style', 'display:block;');
				
			});
		}
		else {
			alert("Please insert the name of the student to remove!");
		}
	});
});

//makes the respective inputs visible or invisible
function showAddRemoveInputs(addRemoveInputs, removeAddInputs){
	document.getElementById(addRemoveInputs).style.display="block";
	document.getElementById(removeAddInputs).style.display="none";
}

//error message handling for remove name
var removeNameOk = true;
	
$("#removeName").on('input', function (evt) {
	var value = evt.target.value
	
	if (value.length === 0) {
		document.getElementById("error-message-nameID3").style.display="none";
		$("#removeName").removeClass('error');
		removeNameOk = true;
		tryToEnableRemove();
		return;
	}
	
	if (/^([A-Za-z .]*)$/.test(value)) {
		document.getElementById("error-message-nameID3").style.display="none";
		$("#removeName").removeClass('error');
		removeNameOk = true;
		tryToEnableRemove();
	}
	else {
		document.getElementById("error-message-nameID3").style.display="block";
		$("#removeName").addClass('error');
		removeNameOk = false;
		disableRemove();
	}
});

//disables the remove button
function disableRemove() {
	$("#removeButton").attr("disabled", "disabled");
}

//tries to enable the remove button
function tryToEnableRemove(){
	if (removeNameOk){
		$("#removeButton").removeAttr("disabled", "disabled");
	}
}

//resets the add inputs
function resetAdd(){
	document.getElementById("insertName").value="";
	document.getElementById("insertYear").value="";
	document.getElementById("insertSchoolSystem").value="";
	document.getElementById("insertCourseLevel").value="";
	document.getElementById("hiddenOptionInsert").style.display="none";
	document.getElementById("addRemoveArea").style.display="none";
	document.getElementById("error-message-nameID2").style.display="none";
	document.getElementById("error-message-yearID2").style.display="none";
	$("#addButton").removeAttr("disabled", "disabled");

}

//resets the remove input
function resetRemove(){
	document.getElementById("removeName").value="";
	document.getElementById("addRemoveArea").style.display="none";
	document.getElementById("error-message-nameID3").style.display="none";
	$("#removeButton").removeAttr("disabled", "disabled");	
}