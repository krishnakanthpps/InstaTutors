$(window).on('load', function () {
	$("#navbar").show();
	typeWriter();
});


$(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideup");
        }
    });
  });

 $(window).scroll(function() {
    $(".slideanim2").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideleft");
        }
    });
  });

 $(window).scroll(function() {
    $(".slideanim3").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideright");
        }
    });
  });

  $(window).scroll(function() {
    $(".length").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("lengthen");
        }
    });
  });

 $(window).scroll(function() {
    var winTop = $(window).scrollTop();

    $("#teamheadimg").css({
    'margin-top' : winTop/1.13
    });
});

 function rotate(x) {
    x.classList.toggle("change");
    $("#phonenavlinks").slideToggle("fast");
}

$(document).ready(function() {
    $("#contactnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#contact").offset().top - 50
                }, 800);
    });
    $("#contactnav2").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#contact").offset().top - 50
                }, 800);
        $("#phonenavlinks").slideToggle("fast");
        $("#container1").toggleClass("change");
    });
    $("#faqnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#faq").offset().top + 40
                }, 800);
    });
    $("#faqnav2").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#faq").offset().top + 40
                }, 800);
        $("#phonenavlinks").slideToggle("fast");
        $("#container1").toggleClass("change");
    });
    $("#softwarenav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#software").offset().top
                }, 800);
    });
    $("#marketingnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#marketing").offset().top - 40
                }, 800);
    });
    $("#tutorsnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#tutors").offset().top - 40
                }, 800);
    });
});


//split functions for syntax
function splitEmail(email) {
	str = email.split("@");
	var res1 = str[0].replace(/\./g, "");
	var res2 = str[1].split(".");

	res = (res1 + res2[0]).toLowerCase();
	return(res);
}

function splitDate(date) {
	var newdate = date.split("-");
	return(newdate[1] + "-" + newdate[2] + "-" + newdate[0]); 
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;

    $("#verifyemail").html("Please Verify Your Email Address: <i>" + user.email + "</i>");

   	var split = splitEmail(user.email);

   	var email_verified = user.emailVerified;
   	console.log(email_verified);


   	if(email_verified == false) {

   		$("#email_div").fadeIn();
   		$(".main-div").css("display", "none");
   		$("#logout").css("display", "block");

   	} else {
   		$("#email_div").css("display", "none");

	   	var isTutor = firebase.database().ref('users/' + split).child('stat');

		isTutor.on('value', snap => {
			if(snap.val() == "tutor") {
				$(".main-div").css("display", "none");
			    $("#logout").css("display", "block");
			    $(".create-div").css("display", "none");
			    $("#indexlogout").fadeIn();
			    $("#bookasession a").html("See All Requests");
			    $("#login2").html("See All Requests");
			    $("#tutorsessions").fadeIn();

			    var mySession = firebase.database().ref('users/' + split);

				mySession.on("child_added", snap => {
				var date = snap.child("date").val();
				var email = snap.child("email").val();
				var location = snap.child("location").val();
				var subject = snap.child("subject").val();
				var time = snap.child("time").val();

				if(date != null) {
					$("#tutormysessionsbody").append("<div class=\"tutorreq\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4>" + "<h4>location: " + location + "</h4>" + "<h4>Subject: " + subject + "</h4>" + "<h4>email: " + email + "</h4>");
				}
			});		    

			} else {
				$("#mainbody").fadeIn();
			    $(".main-div").css("display", "none");
			    $("#logout").css("display", "block");
			    $(".create-div").css("display", "none");
			    $("#bookasession a").html("Book A Session");
			    $("#login2").html("Book A Session");
			    $("#indexlogout").fadeIn();

			    var reqRef = firebase.database().ref('users/' + split);

		//date, time, location, tutor, done, subject
				reqRef.on("child_added", snap => {
					var date = snap.child("date").val();
					var done = snap.child("done").val();
					var email = snap.child("email").val();
					var location = snap.child("location").val();
					var subject = snap.child("subject").val();
					var time = snap.child("time").val();
					var tutor = snap.child("tutor").val();

					var color;
					if(done == "yes") {
						color = " green";
					} else {
						color = "";
					}

					if(date != null) {
						$("#sessionsbody").append("<div class=\"req" + color + "\"> <div class=\"cancel\" onclick=\"cancel()\"><i class=\"fas fa-times\"></i></div> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4>" + "<h4>location: " + location + "</h4>" + "<h4>Subject: " + subject + "</h4>" + "<h4>tutor: " + tutor + "</h4>");
					}
				});
			}
		});
	}


    var userName = firebase.database().ref('users/' + split).child('name');

	userName.on('value', snap => {
		$("#welcome").html("Welcome " + snap.val()+ "!");
		$("#tutorwelcome").html("Welcome " + snap.val()+ "!");
	});


    if(user != null){
      $("#user").html("User: " + user.email + "");
    }

    var tutorReq = firebase.database().ref('requests');

    tutorReq.on("child_added", snap => {
		var date = snap.child("date").val();
		var done = snap.child("done").val();
		var email = snap.child("email").val();
		var location = snap.child("location").val();
		var subject = snap.child("subject").val();
		var time = snap.child("time").val();
		var tutor = snap.child("tutor").val();

		var display;
		if(done == "yes") {
			display = "none";
		} else {
			display = "block";
		}

		var newDate = date;
		if(newDate != null) {
			$("#tutorsessionsbody").append("<div class=\"tutorreq\" style=\"display: " + display + "\" onclick=\"takeSession()\"> <h2>Email: " + email + "</h2> " + "<h4>Date: " + newDate + "</h4> " + "<h4>time: " + time + "</h4>" + "<h4>location: " + location + "</h4>" + "<h4>Subject: " + subject + "</h4>" + "<h4>tutor: " + tutor + "</h4>");
		}
	});

  } else {
    // No user is signed in.
    $("#mainbody").css("display", "none");
    $(".main-div").fadeIn();
    $("#email_div").css("display", "none");
    $("#logout").css("display", "none");
    $("#bookasession a").html("Login or Sign Up");
    $("#indexlogout").fadeOut();
    $("#tutorsessions").css("display", "none");
    
  }
});

function sendVerification() {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  alert("Email verification sent!  Check your inbox in 2-3 minutes, and follow the instructions in the email.")
	}).catch(function(error) {
	  alert("Error: " + error.message);
	});
}

function openResetPass() {
	$(".main-div").css("display", "none");
	$("#reset_div").fadeIn();
}

function resetPass() {
	var emailAddress = $("#reset_email_field").val();

	firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
	  alert("Reset email sent!  Please check your inbox and follow the instructions in the email.")
	}).catch(function(error) {
	  alert(error.message);
	  console.log(error);
	});
}

function takeSession() {
	var date = event.currentTarget.childNodes[3].innerHTML;
	var newdate = date.slice(6);
	var email = event.currentTarget.childNodes[1].innerHTML;
	var time = event.currentTarget.childNodes[5].innerHTML.slice(6);
	var location = event.currentTarget.childNodes[6].innerHTML.slice(10);
	var subject = event.currentTarget.childNodes[7].innerHTML.slice(9);
	var newemail = splitEmail(email.slice(7));
	var r = confirm("Confirm that you can commit to tutoring this session?");
	var yes = "yes";

	var split = splitEmail(firebase.auth().currentUser.email);

	var userName = firebase.database().ref('users/' + split).child('name');

	if(r == true) {
		userName.on('value', snap => {
			firebase.database().ref('requests/' + newdate + newemail).child("tutor").set(snap.val());
			firebase.database().ref('users/' + newemail + "/" + newdate).child("tutor").set(snap.val());
		});
		firebase.database().ref('requests/' + newdate + newemail).child("done").set(yes);
		firebase.database().ref('users/' + newemail + "/" + newdate).child("done").set(yes);
		alert("confirmed. ");
		firebase.database().ref('users/' + split + "/" + newdate).set({
		    email: email.slice(7),
		    date: newdate,
		    time: time,
			location: location,
			subject: subject,	
		 });

		var content = "<h3 style=\"color: #ae3dc6\">Tutor Contact: " + firebase.auth().currentUser.email + "</h3> <p><strong>Date:</strong> " + splitDate(date) + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Location:</strong> " + location + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p>Your tutor will email you within 24 hours!</p>";

		Email.send("instatutorsteam@gmail.com",
			email,
			"Confirmed: Tutoring Session on " + date,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
		}	
}

function cancel() {
	var input = prompt("To cancel a session, please input your email.");
	var date = event.currentTarget.parentNode.childNodes[3].innerHTML;
	var newdate = date.slice(6);
	var email = firebase.auth().currentUser.email;
	var newemail = splitEmail(email);
	if(input == email) {
		firebase.database().ref('requests/' + newdate + newemail).remove();
		firebase.database().ref('users/' + newemail + "/" + newdate).remove();
		firebase.database().ref('requests/' + newdate + newemail).remove();
		firebase.database().ref('users/' + newemail + "/" + newdate).remove();
		alert("Tutoring session for " + newdate + " canceled.  page will refresh now.");
		window.location.reload(true);
	} else {
		alert("wrong email. aborting.")
	}
}

function sessionstab() {
	$("#sessionstab").fadeIn();
	 $("#booktab").css("display", "none");
}

function booktab() {
	$("#booktab").fadeIn();
	 $("#sessionstab").css("display", "none");
}

function allsessionstab() {
	$("#allsessions").fadeIn();
	 $("#tutormysessions").css("display", "none");
}

function tutorsessionstab() {
	$("#tutormysessions").fadeIn();
	 $("#allsessions").css("display", "none");
}

function openCreate() {
	$(".main-div").css("display", "none");
	$(".create-div").fadeIn();
}

//initialize database
var database = firebase.database();

//send account data to firebase
function writeAccount(name, email, phone, stat) {
	var split = splitEmail(email);

		firebase.database().ref('users/' + split).set({
			name: name,
			phone: phone,
		    email: email,
		    stat: stat
		 });
}


//create new account
function createAccount() {
	var newName = $("#createname").val();
	var newEmail = $("#createemail").val();
	var newPhone = $("#createphone").val();
	var newPass = $("#createpassword").val();
	var confirmPass = $("#confirmpassword").val();
	var stat = "tutee";

	if(newPass == confirmPass && newEmail != null) {
		if($("#termscheck").checked == false) {
			$("#errormessage2").html("Please agree to the terms and conditions.");
		} else {
			firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).catch(function(error) {
			event.preventDefault();
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  $("#errormessage2").html("Error : " + errorMessage);
			});

			firebase.auth().signInWithEmailAndPassword(newEmail, newPass);

			writeAccount(newName, newEmail, newPhone, stat);

			$(".create-div").css("display", "none");
			$("#email_div").fadeIn();
		}

	} else {
		$("#errormessage2").html("Please make sure your passwords match.");
	}
}

//login + logout
function login() {
	var userEmail = $("#email_field").val();
	var userPass = $("#password_field").val();
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
	    // Handle Errors here.
	    event.preventDefault();
	    var errorCode = error.code;
	    var errorMessage = error.message;

	    $("#errormessage").html("Error : " + errorMessage);

	    // ...
	  });

	if(firebase.auth().currentUser.emailVerified == false) {
		$("#email_div").fadeIn();
	}
}

function logout(){
  firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	  event.preventDefault();
	});
	$("#errormessage").html("");
	$("#errormessage2").html("");
}


//save requests to firebase
function writeRequest(email, location, date, time, subject, done, tutor) {
	var newEmail = splitEmail(email);
	var newDate = splitDate(date);

	firebase.database().ref('users/' + newEmail + "/" + newDate).set({
			email: email,
			location: location,
			date: newDate,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject
		  });

	firebase.database().ref('requests/' + newDate + newEmail).set({
			email: email,
			location: location,
			date: newDate,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject
		  });
}


//on tutoring request submit -> pushes form data to firebase
function validate() {
	var email = firebase.auth().currentUser.email;
	var location = $("#location").val();
	var date = $("#date").val();
	var time = $("#time").val();
	var tutor = $("#tutor").val();
	var subject = $("#subject").val();
	var missing = [];

	if(location == "") {
		missing.push(" location");
	}

	var selectedDate = new Date(date);
   	var now = new Date();

	if(date == "" || selectedDate < now) {
		missing.push(" valid date, date cannot be in the past");
	}
	if(time == "") {
		missing.push(" time");
	}
	if(subject == "") {
		missing.push(" subject");
	}

	if(missing != "") {
		$("#formerrors").html("Please enter the following: " + missing);
		event.preventDefault();
	} else {
		writeRequest(email, location, date, time, subject, "no", tutor);

		var content = "<h3 style=\"color: #ae3dc6\">New Tutoring Session -</h3>  <p><strong>Date:</strong> " + splitDate(date) + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Location:</strong> " + location + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";

		$("#bookedheader").html("Your tutoring request for " + date + " is logged.");
		$("#tutor2").html("Tutor: " + tutor);
		$("#time2").html("Time: " + time);
		$("#location2").html("Location: " + location);
		$("#subject2").html("Subject: " + subject);

		$("#mainbody").css("display", "none");
		$("#confirmedbody").fadeIn();

		Email.send("support@instatutors.org",
			"tutors@instatutors.org",
			"New Tutoring Request for " + date,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});

		Email.send("support@instatutors.org",
			email,
			"Tutoring Session Requested for " + date,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
			//527d49d6-dba7-4334-8775-1b8ccd9b3eeb 

		return true;
	}
}


function validatemsg() {
	var name = $("#msgname").val();
	var email = $("#msgemail").val();
	var message = $("#msg").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var missing = [];
	if(name == "") {
		missing.push("name");
	}
	if(email.search(validemail) == -1) {
		missing.push(" valid email");
	}
	if(message == "") {
		missing.push(" your message");
	}
	if(missing != "") {
		$("#formStatus").css("color", "red");
		$("#formStatus").html("Please enter the following: " + missing + ".");
	} else {
		$("#formStatus").css("color", "green");
		$("#formStatus").html("Message Sent!  We will try to get back to you within 24 hours.");
		var content = "<h3>New Message</h3> <p><strong>Name:</strong> " + name + "</p> <p><strong>email:</strong> " + email + "</p> <p><strong>Message:</strong> " + message + "</p>"; 
		document.getElementById("contactForm").reset();

		Email.send("inquiries@instatutors.org",
			"tutors@instatutors.org",
			"New Message from " + name,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
	}
}

$(document).ready(function() {
    $("#all").click(function(event) {
    	$("#filtertext").html("All");
        $("#matthewcho").show();
		$("#varsha").show();
		$("#reedit").show();
		$("#matthewsheh").show();
		$("#sangita").show();
		$("#conner").show();
		$("#kyle").show();
		$("#stuti").show();
		$("#dan").show();
		$("#nitin").show();
		$("#sahana").show();
		$("#keshav").show();
		$("#chirag").show();
		$("#sophie").show();
		$("#rohit").show();
		$("#samyang").show();
		$("#rukmini").show();
		$("#rohun").show();
    });

    $("#math").click(function(event) {
    	$("#filtertext").html("Math");
        $("#matthewcho").show();
		$("#varsha").show();
		$("#reedit").show();
		$("#matthewsheh").show();
		$("#sangita").show();
		$("#conner").show();
		$("#kyle").show();
		$("#stuti").show();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").show();
		$("#keshav").show();
		$("#chirag").show();
		$("#sophie").show();
		$("#rohit").show();
		$("#samyang").show();
		$("#rukmini").show();
		$("#rohun").show();
    });

    $("#physics").click(function(event) {
    	$("#filtertext").html("Physics");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").show();
		$("#matthewsheh").show();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").show();
		$("#stuti").show();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").show();
		$("#rohit").show();
		$("#samyang").show();
		$("#rukmini").hide();
		$("#rohun").hide();
    });

    $("#bio").click(function(event) {
    	$("#filtertext").html("Biology");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").show();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").show();
		$("#dan").hide();
		$("#nitin").hide();
		$("#sahana").show();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").show();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
    });

    $("#chem").click(function(event) {
    	$("#filtertext").html("Chemistry");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").show();
		$("#conner").show();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").show();
		$("#keshav").show();
		$("#chirag").show();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
    });

    $("#writing").click(function(event) {
    	$("#filtertext").html("Writing");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").show();
		$("#matthewsheh").show();
		$("#sangita").show();
		$("#conner").hide();
		$("#kyle").show();
		$("#stuti").show();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").show();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").show();
		$("#rohun").hide();
    });

    $("#history").click(function(event) {
    	$("#filtertext").html("History");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").show();
		$("#matthewsheh").show();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").show();
		$("#stuti").hide();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").show();
		$("#rohit").hide();
		$("#samyang").show();
		$("#rukmini").show();
		$("#rohun").hide();
    });

    $("#webdev").click(function(event) {
    	$("#filtertext").html("Web Development");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").show();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").show();
		$("#rukmini").hide();
		$("#rohun").show();
    });

    $("#java").click(function(event) {
    	$("#filtertext").html("Java");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").show();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").show();
		$("#kyle").show();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").show();
		$("#sophie").hide();
		$("#rohit").show();
		$("#samyang").show();
		$("#rukmini").hide();
		$("#rohun").show();
    });

    $("#python").click(function(event) {
    	$("#filtertext").html("Python");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").show();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").show();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
    });

    $("#business").click(function(event) {
    	$("#filtertext").html("Business");
        $("#matthewcho").hide();
		$("#varsha").hide();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").show();
		$("#dan").hide();
		$("#nitin").hide();
		$("#sahana").show();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
    });

    $("#spanish").click(function(event) {
    	$("#filtertext").html("Spanish");
        $("#matthewcho").show();
		$("#varsha").show();
		$("#reedit").show();
		$("#matthewsheh").show();
		$("#sangita").show();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").show();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").show();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
    });

   $("#french").click(function(event) {
    	$("#filtertext").html("French");
        $("#matthewcho").hide();
		$("#varsha").hide();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
    });
});




var i = 0;
var txt = '"Never doubt that a small group of thoughtful commited citizens can change the world; indeed it\'s the only thing that ever has."'; /* The text */
var speed = 20; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("indexquote").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
