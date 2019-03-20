<!DOCTYPE html>

<html>

	<head>
	
		<!-- Bootstrap library in order to make the application responsive for all devices -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"> 

		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> <!-- jQuery library -->

		<link href="IA.css?v21" rel="stylesheet" type="text/css"/> <!-- Links to the CSS document -->
		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<title> German students manager </title>

	</head>

	<body>	
	
		<div id="saving">
			All your changes have been saved! <!-- Fading message for when the user makes a change in the database -->
		</div>
	
		<div id="mySidenav" class="sidenav" style="width: 0px;"> <!-- Navigation Sidebar -->
		  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
		  <a href="#home" onclick="homeClick(); closeNav(); resetAdd(); resetRemove();"> Home </a> <br>
		  <a href="#search" onclick="searchClick(); closeNav(); resetAdd(); resetRemove();"> Search/Edit Students </a> <br> 
		  <a href="#edit" onclick="editClick(); closeNav();"> Add/Remove Students </a> <br>
		</div>
		
		<span style="font-size:32px;cursor:pointer; display:none;" onclick="openNav()" id="mySlidebar"> &#9776; Menu </span>
		
		<div class="container-fluid" id="main">
			
			<h1 id="mytitle"> German students manager </h1> <!-- Present everywhere -->
			
			<form action="login.php" id="loginForm" method="post"> <br> <!-- Form used for login -->
			  <div class="imgcontainer" style="text-align:center;">
				<img src="IA_photos/Welcome_pic.jpg" alt="welcome" class="img-fluid">
			  </div> 
			  
				<br>

			  <div class="container">
				<label for="uname"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="uname" autocomplete="off" class="form-control" required>
				
				<br>
				
				<label for="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" autocomplete="off" class="form-control" required>
				<br>
				<button type="submit" class="btn btn-primary mb-2" id="myLogin">Login</button>
				<button type="button" class="btn btn-primary mb-2" id="myCancel">Cancel</button>
			  </div> 
			  
				<br>

			  <div class="container">
				<p style="font-style:italic; text-align:right;">If you forgot your password, please contact the author</p>
			  </div>
			  
			</form>
			
			<!-- In this div will appear the possible error message of login -->
			<div id="errorLoginArea" style="display:none; text-align: center; font-size: 130%; color: #980101; font-weight: bold;">
				hello
			</div>
			
			<br>
			
			<div id="homeSpace" style="display:none;"> <!-- Home screen -->
				
				<p class="mybase"> Welcome to the "Home" section! </p>
					
				<br>
				
				<div class="container" style="text-align:center;">
				  <img id="GermanFlag1" class="img-fluid" src="IA_photos/GermanFlag.jpg" alt="image test" style="border-radius: 10%;"/>
				  
				  <br><br><br>
				  
					<div class="popup" onclick="openPopup();"> <!-- Opens the popup which explains the application's functionalities -->
						<p style="color:#0d3800; font-size:130%;"> Click here for further information! </p>
							<span class="popuptext" id="myPopup">
								<p class="mybase" style="font-size:120%; color:#1e058b;"> Here, you will be able to:
									<ul>
										<li style="color:#0d3800;"> Search for any student you currently teach </li>
										<li style="color:#0d3800;"> Make notes on their progress </li>
										<li style="color:#0d3800;"> Give them predicted or recorded grades </li>
										<li style="color:#0d3800;"> Add new or remove graduate students </li>
									</ul>
								</p>
							</span>
					</div>	
					
					<br>
					
					<p class="mybase" style="color:#1e058b"> Click on the "Menu" on the top left to navigate!</p>
					
				</div>
				
			</div>
			
			<div id="searchEditSpace" style="display:none;"> <!-- Screen where you can search for students and edit their credentials -->
			
				<p class="mybase"> Welcome to the "Search/Edit students" section! Please input any information to find the students that match it! </p>				
				
				<form id="searchForm" method="post" action="getstudents.php">	<!-- Form used for searching students -->
				
					<div class="form-group col-sm-4"> <!-- Div where the inputs appear -->
							<label for="name" class="descInput">Search by name:</label>
							<input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter student name" name="name">
							<span class="error-message-name" id="error-message-nameID" style="color: red; font-style: italic; display:none; margin-left: 1.7%;">
							Only letters, full stops and spaces are allowed! </span>
							<small class="form-text" style="margin-left: 1.7%; color: #0d3800;"> Insert first name or first letter of last name </small>
							
							<br>
							
							<label for="year" class="descInput"> Search by year: </label>
							<select class="form-control" id="year" style="cursor: pointer" name="year">
								<option value="" disabled selected> Select year </option>
								<option> 9 </option>
								<option> 10 </option>
								<option> 11 </option>
								<option> 12 </option>
							</select>
							
							<br>
							
							<label for="SchoolSystem" class="descInput"> Search by school system: </label>
							<select class="form-control" id="schoolSystemSearch" onchange="showDropdown('schoolSystemSearch', 'hiddenOptionSearch')" style="cursor: pointer" name="SchoolSystem">
								<option value="" disabled selected> Select school system </option>
								<option> Hungarian System </option>
								<option> IB </option>
								<option> Both </option>
							</select>
							
							<br>
							
							<div id="hiddenOptionSearch" style="display:none"> <!-- Option that appears only when SchoolSystem is IB -->
								<label for="CourseLevel" class="descInput"> Select IB course level: </label>
								<select class="form-control" style="cursor: pointer; margin-bottom: 5%;" name="CourseLevel">
									<option value="" disabled selected> Select German course level </option>
									<option> HL </option>
									<option> SL </option>
									<option> Both </option>
								</select>
							</div>
							
							<input name="identifier" value="searchForm" style="display:none"> <!-- Used so that getstudents.php understands which form has been submitted -->
							<input id="submit" type="submit" name="search" value="Search" class="btn btn-primary mb-2" onclick="showResults(); if (checkAllEmpty()){return true;} else return false;">
							<button type="reset" id="reset" class="btn btn-primary mb-2" onclick="enableSearch(); hideHint('error-message-nameID'); hideHint('error-message-yearID'); makeAroundGreen();
								closeDropdown('hiddenOptionSearch'); hideResults(); closeSort();"> Reset </button>	
					</div>			
					
				</form>
				
				<br> <br>
				
				<!-- Button that sorts the table records alphabetically -->
				<button class="btn btn-primary mb-2" id="sortAlphabeticallyButton" onclick="sortTableAlphabetically()" style="display:none;"> Sort alphabetically </button>	
				
				<div id="resultsArea" style="display: none;"> <!-- Div where the results of search will appear -->
					
					<form id="externalForm"> <!-- getstudents.php will return among results a form that will be used to edit the students -->
						
						<div class="table-responsive" id="results">	
						
						</div>
						
					</form>
				
				</div>	
				
			</div>
			
			<div id="addRemoveSpace" style="display: none;"> <!-- Screen where you can add new students or remove old ones -->
			
				<p class="mybase"> Welcome to the "Add/Remove students" section! Here you can add or remove students! </p>
				
				<br> <br> <br>
				
				<div style="text-align:center;"> <!-- Div where the add and remove button will appear -->
					<button class="btn btn-primary mb-2 addButton" style="margin-right:2.5%; font-size:125%;" onclick="showAddRemoveInputs('addInputs', 'removeInputs'); resetRemove();"> Add Student </button>
					<button class="btn btn-primary mb-2 removeButton" style="margin-left:2.5%; font-size:125%;" onclick="showAddRemoveInputs('removeInputs', 'addInputs'); resetAdd();"> Remove Student </button>
				</div>
				
				<br> <br>
				
				<div class="form-group">
				
					<div class="col-sm-5" id="addInputs" style="display:none;">
					
						<form id="addForm" method="post" action="addRemoveRecord.php"> <!-- Form used to add a new student -->
							<label for="name" class="descInput">Insert name:</label>
							<input id="insertName" type="text" class="form-control" autocomplete="off" placeholder="Enter student name" name="name">
							<span class="error-message-name" id="error-message-nameID2" style="color: red; font-style: italic; display:none; margin-left: 1.7%;"> Only letters, full stops and spaces are allowed! </span>
							
							<br>
							
							<label for="year" class="descInput"> Insert year: </label>
							<select class="form-control" id="insertYear" style="cursor: pointer" name="year">
								<option value="" disabled selected> Insert year </option>
								<option> 9 </option>
								<option> 10 </option>
								<option> 11 </option>
								<option> 12 </option>
							</select>					
							
							<br>
							
							<label for="SchoolSystem" class="descInput"> Insert school system: </label>
							<select class="form-control" id="insertSchoolSystem" onchange="showDropdown('insertSchoolSystem', 'hiddenOptionInsert')" style="cursor: pointer" name="SchoolSystem">
								<option value="" disabled selected> Select school system </option>
								<option value="Hungarian"> Hungarian System </option>
								<option> IB </option>
							</select>
							
							<br>
							
							<div id="hiddenOptionInsert" style="display:none"> <!-- Option that appears only when SchoolSystem is IB -->
								<label for="CourseLevel" class="descInput"> Insert course level: </label>
								<select id="insertCourseLevel" class="form-control" style="cursor: pointer; margin-bottom: 5%;" name="CourseLevel">
									<option value="" disabled selected> Select German course level </option>
									<option> HL </option>
									<option> SL </option>
								</select>
							</div>
							
							<input type="submit" value="Add" id="addButton" class="btn btn-primary mb-2 addButton" style="font-size:125%; position:relative; left:1%;">
						</form>
						
					</div>
					
					<div class="col-sm-5" id="removeInputs" style="display:none">
					
						<form id="removeForm" method="post" action="addRemoveRecord.php"> <!-- Form used to delete a student based on their name -->
							<label for="name" class="descInput">Insert name of student to remove:</label>
							<input id="removeName" type="text" class="form-control" autocomplete="off" placeholder="Enter student name" name="removeName">
							<span class="error-message-name" id="error-message-nameID3" style="color: red; font-style: italic; display:none; margin-left: 1.7%;"> Only letters, full stops and spaces are allowed! </span>
							
							<br>
							
							<input type="submit" value="Remove" id="removeButton" class="btn btn-primary mb-2 removeButton" style="font-size:125%; position:relative; left:1%;">
						</form>
						
					</div>
				
					<div id="addRemoveArea" style="display:none;"> <!-- Div where the message for either successful/failed add or remove -->
						
					</div>
				
				</div>
				
			</div>
			
		</div>
		
	</body>
		
	<script src="IA_scripts.js"> </script>
	
</html>