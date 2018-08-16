$(document).ready(function(){

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

})

database.ref().on("child_added", function(childSnapshot){
    
    var newRow = "<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().role + "</td><td>" + childSnapshot.val().startDate + "</td><td>12</td><td>" + childSnapshot.val().rate + "</td><td>12</td></tr>";

    $("#current").append(newRow);
})




})






