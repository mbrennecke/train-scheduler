$(document).ready(function(){

var firstTimeConverted;
 var tRemainder;
 var frequency;
 var trainName;
 var trainDestination;

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCYmOMRPExjjShhR9LEHPn-dmf7DqD66lY",
    authDomain: "train-scheduler-fcbe5.firebaseapp.com",
    databaseURL: "https://train-scheduler-fcbe5.firebaseio.com",
    projectId: "train-scheduler-fcbe5",
    storageBucket: "train-scheduler-fcbe5.appspot.com",
    messagingSenderId: "382363244220"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submitBtn").on("click", function(event) {
    event.preventDefault();

    var name = $("#name").val();
    var destination = $("#destination").val();
    var time = $("#time").val();
    var rate = $("#rate").val();

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });
	$("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#rate").val("");
	

});


function updateTime(){
	var query = database.ref().orderByKey();
	query.once("value").then(function(snapshot){
		$("#current").empty();
		snapshot.forEach(function(childSnapshot) {
	frequency = childSnapshot.val().rate;
	
	trainName = childSnapshot.val().name;
	trainDestination = childSnapshot.val().destination;
    
	displayTable();
	});
	});
}

function displayTable(){
	
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	// Minutes until next train
	var tMinutesTillTrain = frequency - tRemainder;
	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	 var newRow = "<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td class='text-center'>" + frequency + "</td><td class='text-center'>" + moment(nextTrain).format("h:mm a") + "</td><td class='text-center'>" + tMinutesTillTrain + "</td></tr>";
	
	$("#current").append(newRow);
}

    
   

database.ref().on("child_added", function(childSnapshot){
	// First Time (pushed back 1 year to make sure it comes before current time)
    firstTimeConverted = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

	frequency = childSnapshot.val().rate;
	
	trainName = childSnapshot.val().name;
	trainDestination = childSnapshot.val().destination;
    
	displayTable()
    
});

	function run() {
      clearInterval(intervalId);
      var intervalId = setInterval(updateTime, 60*1000);
    }

	run();
	
});






