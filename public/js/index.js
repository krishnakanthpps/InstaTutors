$(document).ready(function() {
    if(localStorage.getItem('popState') != 'shown'){
        $("#popup").delay(500).fadeIn();
        $("#popupmask").delay(400).fadeIn();
        localStorage.setItem('popState','shown')
    }

    $('#popup-close, #popupmask').click(function(e) // You are clicking the close button
    {
        $('#popup').fadeOut(); // Now the pop up is hiden.
        $("#popupmask").fadeOut();
    });
});

$(window).on('load', function () {
	setTimeout("$(\"#indeximg\").css(\"width\", \"140px\")",100);
	setTimeout("$(\"#indeximg #bigpart\").addClass(\"rotater1\")",100);
	setTimeout("$(\"#indeximg #smallpart\").addClass(\"rotater2\")",100);
	setTimeout("$(\"#indexhead p\").slideDown(\"fast\")",1000);
	setTimeout("$(\"#gplaybutton\").slideDown(\"fast\")",1000);
	setTimeout("$(\"#headlink\").slideDown(\"fast\")",1000);
	setTimeout("$(\"#indexquestions\").slideDown(\"fast\")",100);

	//load courses for courses page
	firebase.database().ref('courses').once('value', snap => {
		var html = "<div class=\"row\">";
		var col1 = "<div class=\"col-sm-6\">";
		var col2 = "<div class=\"col-sm-6\">";
		var index = 0;
		snap.forEach(function(childSnapshot) {
			var courses = childSnapshot.val().split(', ');
			if(index%2 == 0 && index!=8 ) {
				col1+="<div class=\"coursesec\"><h3>" + childSnapshot.key + "</h3>";
				for(var i=0; i<courses.length; i++) {
					col1+="<p>"+courses[i]+"</p>";
				}
				col1+="</div>";
			} else {
				col2+="<div class=\"coursesec\"><h3>" + childSnapshot.key + "</h3>";
				for(var i=0; i<courses.length; i++) {
					col2+="<p>"+courses[i]+"</p>";
				}
				col2+="</div>";
			}
			index++;
		});
		html+=col1+"</div>" + col2+"</div></div>";
		html+="<div class=\"row\"><h2>Other Subjects:</h2> <h4>Web Development</h4> <h4>Python</h4> <h4>SAT</h4> <h4>ACT</h4> </div>";
		$("#coursesbody").html(html);
	});

	$( "#stars .fas" ).each(function(index) {
	    $(this).on("mouseout", function(){
	        // For the boolean value
	        $("#onestar").css("color", "#444");
			$("#twostar").css("color", "#444");
			$("#threestar").css("color", "#444");
			$("#fourstar").css("color", "#444");
			$("#fivestar").css("color", "#444");
	    });
	});

	$(".sidecancel").html("&times;");

	$('[data-toggle="popover"]').popover();

	$("#tutorbio").prop("readonly", true);

	$("#loading").css("opacity", "0");
	$("#loading").css("top", "-500px");

    	firebase.database().ref('tutors').once('value', snap => {
			$("#tutorsection").html("");
			snap.forEach(function(childSnapshot) {
				if(childSnapshot.hasChild("bio")) {
					var split = childSnapshot.key;
					var name = childSnapshot.child("name").val();
					var subjects = [];
					if(childSnapshot.hasChild("subjects")) {
						subjects = childSnapshot.child("subjects").val().split(",");
					}
					var subjectlabels = "";
					for(var i=0; i<subjects.length; i++) {
						var subject = subjects[i];
						if(subjects[i] == "sat") {
							subject= "SAT";
						}
						if(subjects[i] == "act") {
							subject = "ACT";
						}
						subjectlabels += "<h5 class=\"label " + subjects[i] + "\">" + subject + "</h5> "
					}
					var courses = "";
					childSnapshot.child("courses").forEach(function(childSnapshot) {
						courses += childSnapshot.val();
					});

					firebase.storage().ref().child("profilephotos").child(split).getDownloadURL().then(function(url) {
						$("#tutorsection").append("<div class=\"col4 tutor\" id=\"" + split + "\" onclick=\"showBio()\"> <div class=\"tutorimg\" style=\"background: url(\'" + url + "\'); background-size: 100%; background-position: center center; background-repeat: no-repeat;\"> </div><h3>" + name + "</h3>" + subjectlabels + " <p class=\"hidden\">" + courses + "</p></div>");
						var width = $("#" + split + " .tutorimg").width();
						var height = $("#" + split + " .tutorimg").height();
						if(height > width) {
							$("#" + split + " .tutorimg").css('width', height);
						} else {
							$("#" + split + " .tutorimg").css('height', width);
						}
					}).catch(function(error) {
						$("#tutorsection").append("<div class=\"col4 tutor\" id=\"" + split + "\" onclick=\"showBio()\"> <div class=\"tutorimg\" style=\"background: url(\'images/notpictured.jpg\'); background-size: 100%; background-position: center center; background-repeat: no-repeat;\"> </div> <h3>" + name + "</h3>" + subjectlabels + "<p class=\"hidden\">" + courses + "</p></div>");
						var width = $("#" + split + " .tutorimg").width();
						var height = $("#" + split + " .tutorimg").height();
						if(height > width) {
							$("#" + split + " .tutorimg").css('width', height);
						} else {
							$("#" + split + " .tutorimg").css('height', width);
						}
					});
					//$("#tutors").append("<div class=\"col4 tutor\" id=\"" + split + "\" onclick=\"showBio()\"> <img src=\"" + url + "\"> <h3>" + name + "</h3>" + subjectlabels + "</div>");
				}
			});
		});
		$("#teamtutorcount").fadeIn();

		
	//function to call when resetting a request
	/*firebase.database().ref('tutors/tanushinstatutors').on('value', function(snapshot) {
		var orig = snapshot.child("12-08-2018").val();

		console.log(orig);
		var newaddress = '12-09-2018';
		firebase.database().ref('courses/German').set(orig);
	});*/

	/*firebase.database().ref('users').on('value', function(snapshot) {
							snapshot.forEach(function(childSnapshot) {
								var split = splitEmail(childSnapshot.child("email").val());
								var name = childSnapshot.child("name").val();
								if(name != null) {
									firebase.database().ref('names/' + name).child("id").set(split);
								}
							});
	});*/
	/*firebase.database().ref('users').on('value', function(snapshot) {
							snapshot.forEach(function(childSnapshot) {
								console.log(childSnapshot.child("parentemail").val() + "\n");
							});
	});*/
	/*firebase.database().ref('users').on('value', snap => {
		var studentcount = 0;
		snap.forEach(function(childSnapshot) {
			if(childSnapshot.hasChild("verified")) {
				studentcount++;
			}
		});
		$("#totaltuteecount").html(studentcount);	
	});

	firebase.database().ref('tutors').once('value', snap => {
		var tutorcount = 0;
		snap.forEach(function(childSnapshot) {
			if(childSnapshot.hasChild("verified")) {
				tutorcount++;
			}
		});
		$("#totaltutorcount").html(tutorcount);
	});

	firebase.database().ref('requests').on('value', snap => {
		var sessionscount = 0;
		snap.forEach(function(childSnapshot) {
			sessionscount++;
		});
		$("#totalsessionscount").html(sessionscount);
		$("#counts").fadeIn();
	});*/

	$('#invite_field').on('input', function() {
	    var key = $('#invite_field').val();
	    firebase.database().ref('emailKeys').on("value", snap => {
	    	var found = false;
	    	snap.forEach(function(childSnapshot) {
	    		if(key.search(childSnapshot.val()) != -1) {
					found = true;
				}
	    	});
	    	if(found) {
	    		$("#foundusers").html("found invite!");
	    	} else {
	    		$("#foundusers").html("no users found.");
	    	}
		});
	});
	//call when setting the leaderboard
	firebase.database().ref('users').once('value', function(snapshot) {
		var arr = [];
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.child("stat").val() == "tutee") {
				var obj = { key: childSnapshot.key, val: childSnapshot.child("totalPoints").val() }
				arr.push(obj);
			}	
		});
		arr = arr.sort(function(a, b){ return a.val - b.val; }).reverse();
		for(var i=0; i<arr.length; i++) {
			var id = arr[i][Object.keys(arr[i])[0]];
			var value = arr[i][Object.keys(arr[i])[1]];
			firebase.database().ref('leaderboard/' + id).set(value);
		}
	});


	/*var oldemail = "instatutorspamcollection@gmail.com";
	var newemail = "spam@instatutors.org";
	firebase.database().ref('tutors/' + splitEmail(oldemail)).once('value', function(snapshot) {
		firebase.database().ref('tutors/' + splitEmail(newemail)).set(snapshot.val());
		firebase.database().ref('tutors/' + splitEmail(newemail)).child("email").set(newemail);
	});*/
	//firebase.database().ref('tutors/' + splitEmail(oldemail)).remove();
});

$(window).on('resize', function(){
      $(".tutorimg").each(function(){
      	$(this).css('height', $(this).css('width'));
      });
});

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 15;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #30CFD0}";
        document.body.appendChild(css);
    };

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

//parallax scrolling
 $(window).scroll(function() {
    var winTop = $(window).scrollTop();

    $("#teamheadimg").css({
    'margin-top' : winTop/1.13
    });
    $("#contact").css({
    	'background-position' : 20 + (winTop/60) + "%"
    });
    $("#howitworks").css({
    	'background-position' :  10 + (winTop/60) + "%"
    });
    $("#aboutbody").css({
    	'background-position' :  60 + (winTop/60) + "%"
    });
});

//helper function for finding intersection of 2 arrays
function intersect(a, b) {
    var d = {};
    var results = [];
    for (var i = 0; i < b.length; i++) {
        d[b[i]] = true;
    }
    for (var j = 0; j < a.length; j++) {
        if (d[a[j]]) 
            results.push(a[j]);
    }
    return results;
}

//helper function for finding union of two arrays
function union(x, y) {
  var obj = {};
  for (var i = x.length-1; i >= 0; -- i)
     obj[x[i]] = x[i];
  for (var i = y.length-1; i >= 0; -- i)
     obj[y[i]] = y[i];
  var res = []
  for (var k in obj) {
    if (obj.hasOwnProperty(k))  // <-- optional
      res.push(obj[k]);
  }
  return res;
}

function rotate(x) {
    x.classList.toggle("change");
    if($("#phonenavlinks").css('max-height') == "800px") {
    	$("#phonenavlinks").css('max-height', '0px');
    	$("#phonenavlinks").css('opacity', '0');
    } else {
    	$("#phonenavlinks").css('max-height', "800px");
    	$("#phonenavlinks").css('opacity', '1');
    }
}

function opensidenav() {
    $(".sidebar").css("left", "0px");
    $(".sidebar").css("opacity", "1");
    $(".sidecancel").css("left", "340px");
    $(".socialmedia").css("left", "40px");
    $(".sidemask").css("width", "100%");
    $(".sidemask").css("opacity", "0.8");
    $(".sidebar a").each(function(){
          $(this).not("#aboutlinks a").addClass("slideleft");
    });
    $("#sidelogout").addClass("slideleft");
    $(".sidebar .border-bot").addClass("lengthen");
}

function closesidenav() {
	$(".sidebar").css("opacity", "0.5");
	$(".sidebar").css("left", "-400px");
    $(".sidecancel").css("left", "-60px");
    $(".socialmedia").css("left", "-360px");
    $(".sidemask").css("width", "0");
    $(".sidemask").css("opacity", "0");
    $(".sidebar a").each(function(){
          $(this).removeClass("slideleft");
    });
    $(".sidebar .border-bot").removeClass("lengthen");
}

//shows tutor bios
function showBio() {
	var tutorids = event.currentTarget.id;
	var tutorinfo = firebase.database().ref('tutors/' + tutorids);
	tutorinfo.on('value', snap => {
		var tutorname = snap.child("name").val();
		var tutorsubjects = snap.child("subjects").val().split(",");
		for(var k=0; k<tutorsubjects.length; k++) {
			tutorsubjects[k] = tutorsubjects[k].charAt(0).toUpperCase() + tutorsubjects[k].slice(1);
			if(tutorsubjects[k] == "Act" || tutorsubjects[k] == "Sat") {
				tutorsubjects[k] = tutorsubjects[k].toUpperCase();
			}
		}
		tutorsubjects = tutorsubjects.join(", ");
		var tutorbio = snap.child("bio").val();
		$("#bioname").html(tutorname);
		$("#biosubjects").html(tutorsubjects);
		$("#biobio").html(tutorbio);
	});
	$("#biomask").fadeIn();
	$("#biopopup").fadeIn();
}

$(document).ready(function(){
    $(".back2top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
      });

    $("#headlink").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $("#howitworks").offset().top }, 800);
    return false;
      });

    $("#contactlink9").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $("#contact").offset().top }, 300);
    return false;
      });

    $( "#tuteeaddsubjects .dropdown-item" ).each(function(index) {
	    $(this).on("click", function(){
	        // For the boolean value
	        $("#newsubject").val(this.innerHTML.toLowerCase()); 
	        $("#subjecttext").html(this.innerHTML);
	    });
	});

    $("#weekly").on("click", function(){
    	$("#numberofsessions").show();
    	$("#timingcount").show();
    });

    $("#bi-weekly").on("click", function(){
    	$("#numberofsessions").show();
    	$("#timingcount").show();
    });

    $("#one-time").on("click", function(){
    	$("#numberofsessions").hide();
    	$("#timingcount").hide();
    });

    //tutor filter function 
	$( "#tutors .dropdown-item" ).each(function(index) {
	    $(this).not("#all").on("click", function(){
	        $("#tutors h4 strong").html(this.innerHTML);
	        var count = 0;
	        $("#filtertext").html(this.innerHTML);
	        var subject = this.innerHTML.toLowerCase();
	        $( ".tutor" ).each(function( index ) {
			  var content = this.innerHTML.toLowerCase();
			  if(content.search(subject) == -1) {
			  	$(this).hide();
			  } else {
			  	$(this).show();
			  	count++;
			  }
			});
	        firebase.database().ref('courses').once('value', snap => {
	        	var upper = subject.charAt(0).toUpperCase() + subject.slice(1);
	        	if(snap.hasChild(upper)) {
					$( "#filtercourse").css('opacity', 1);
	        		var html = "";
	        		var everysubject = snap.child(upper).val().split(", ");
	        		for(var i=0; i<everysubject.length; i++) {
	        			html+="<a class=\"dropdown-item\" id=\"" + upper + i + "\" onclick=\"sortByCourse()\">" + everysubject[i] + "</a>";
	        		}
	        		$("#filtercoursemenu").html(html);
	        	} else {
					$( "#filtercourse").css('opacity', 0);
					$("#filtercoursemenu").html("");
	        	}
	        });
	        $("#filtercoursetext").html("All");
			$("#teamtutorcount").html(count);
	    });
	});

	$("#all").on("click", function(){
		$("#tutors h4 strong").html(this.innerHTML);
	    $("#filtertext").html(this.innerHTML);
	    var count = 0;
		$( ".tutor" ).each(function(index) {
			$(this).hide();
			$(this).show();
			count++;
		});
		$("#teamtutorcount").html(count);
	});

	//adds subject to book form
	$( "#subjectmenu .dropdown-item" ).each(function(index) {
	    $(this).on("click", function(){
	        // For the boolean value
	        var subjects = $("#subject").val();
		    $("#subject").val(this.innerHTML);
		    $("#subjecttext2").html(this.innerHTML);
		    $("#subjectfielderror").html("");
	    });
	});

	//adds subjects to application form
	$( "#applysubjectmenu .dropdown-item" ).each(function(index) {
		$(this).on("click", function(){
			if($("#applysubjects").val() == "") {
			   $("#applysubjects").val(this.innerHTML);
			} else {
			    $("#applysubjects").val($("#applysubjects").val() + ", " + this.innerHTML); 
			}
			$("#subjecttext3").html(this.innerHTML);
		});
	});

	$("#subjectmenu").on("click", function(){
		firebase.database().ref('courses').once('value', snap => {
	        var upper = $("#subject").val();;
	        if(snap.hasChild(upper)) {
				$("#responsetimediv").hide();
				$("#coursetext").html("Course");
				$("#course").val("");
				$( "#courserow" ).slideDown(300);
	        	var html = "";
	        	var everysubject = snap.child(upper).val().split(", ");
	       		for(var i=0; i<everysubject.length; i++) {
	       			html+="<a class=\"dropdown-item\" id=\"" + upper + i + "\" onclick=\"changeCourseinfo()\">" + everysubject[i] + "</a>";
	        	}
	        	html+="<a class=\"dropdown-item\" onclick=\"changeCourseinfo()\">Other (indicate in details)</a>";
	        	$("#coursemenu").html(html);
	       	} else {
				$("#coursetext").html("Course");
				$("#course").val("");
				$( "#courserow" ).slideUp(300);
				firebase.database().ref('tutors').on('value', snap => {
					var totalcount = 0;
					var availabletutors = 0;
					snap.forEach(function(childSnapshot) {
						if(childSnapshot.hasChild("courses")) {
							totalcount++;
							if(childSnapshot.child("subjects").val().search(upper.toLowerCase()) != -1) {
								availabletutors++;
							}
						}
					});
					var responsetime = responseTime(availabletutors, totalcount);
					$("#responsetimediv").fadeIn(300);
					$("#responsetime").html(responsetime + " hours");
				});
	        }

	    });
	});

	$("#applysubjectclear").on("click", function(){
		$("#applysubjects").val('');
	});

	/*$("#subjectclear").on("click", function(){
		$("#subject").val('');
		$("#subjectfielderror").html("");
		$( "#courserow" ).fadeOut();
	});

	$("#courseclear").on("click", function(){
		$("#course").val('');
		$("#coursefielderror").html("");
	});*/

	$(".slider ol li").on("click", function() {
		$(this).addClass("active").siblings("li").removeClass("active");
		$(".slider ul").animate({
		    top: -$(".slider").height() * $(this).index()
		}, 500);
	});

	$("#aboutnav").on("click", function() {
		if($("#aboutlinks").css('max-height') == "0px") {
			$("#aboutlinks").css('max-height', '300px');
		} else {
			$("#aboutlinks").css('max-height', '0px');
		}
		$("#aboutcaret").toggleClass("rotate180");
	});

});

//about links


//helper split functions for syntax
function splitEmail(email) {
	str = email.split("@");
	var res1 = str[0].replace(/\./g, "");
	var res2 = str[1].split(".");

	res = (res1 + res2[0]).toLowerCase();
	return(res);
}

function splitDate(date) {
	var newdate;
	if(date.indexOf('-') != -1) {
		newdate = date.split("-");
		return(newdate[1] + "-" + newdate[2] + "-" + newdate[0]);
	} else {
		newdate = date.split("/");
		return(newdate[1] + "-" + newdate[2] + "-" + newdate[0]);
	}
}

//converts military time to AMPM time
function convertMilitary(time) {
	var arr = time.split(":");
	var hours = arr[0];
	var minutes = arr[1];
	var ampm = "AM";
	if(hours > 12) {
		hours = hours - 12;
		ampm = "PM";
	}
	return(hours + ":" + minutes + " " + ampm);
}

function convertBack(time) {
	var arr = time.split(" ");
	var fin = arr[0].split(":");
	var hours = fin[0];
	var minutes = fin[1];
	var ampm = "am";
	if(arr[1] == "PM") {
		hours = parseInt(hours) + 12;
	} 
	return(hours + ":" + minutes);
}

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    firebase.auth().currentUser.getIdToken(true); 
    firebase.auth().currentUser.getIdToken(true); 
    $("#logininfo p").html("Logged in as: " + user.email);
    $("#logininfo").show();
    $("#phonelogout").show();
    var split = splitEmail(user.email);
    //writes a temporary account (this is only for Google sign ins)
    var tempref = firebase.database().ref('tempusers');
    tempref.once('value', function (snapshot) {
    	if (!snapshot.hasChild(split)) {
	        writeAccount(user.displayName, user.email, "tutee");
	    } else {
	    	if(snapshot.child(split).child("stat").val() == "tutee") {
	    		firebase.database().ref('users/' + split).child("email").set(snapshot.child(split).child("email").val());
	    		firebase.database().ref('users/' + split).child("stat").set(snapshot.child(split).child("stat").val());
	    	}
	    }
	});
	//generates new email key, writes to emailKeys ref
	firebase.database().ref('emailKeys').once('value', function(snap) {
		if(!snap.hasChild(split)) {
	    	var emailKey = firebase.database().ref('emailKeys').push().key;
			firebase.database().ref('emailKeys/' + split).set(emailKey);
		}
	});
	if(user.emailVerified == false) {
		$("#email_div").fadeIn();
		$("#verifyemail").html("Please Verify Your Email Address: " + user.email);
		$(".main-div").css("display", "none");
	} else {
	   	firebase.database().ref('tutors').on('value', snap => {
	   		var isTutor = false;
	   		if(snap.hasChild(split)) {
	   			isTutor = true;
	   		}
	   		console.log(isTutor);
				if(isTutor == true) { //user is tutor
					var userName = firebase.database().ref('tutors/' + split).child('name');
					userName.on('value', snap => {
						$("#tutorwelcome").html("Welcome Tutor: " + snap.val());
					});

					//load profile photo
					firebase.storage().ref().child("profilephotos").child(split).getDownloadURL().then(function(url) {
								$("#changephoto").fadeIn();
								$("#profilephoto").fadeIn();
								$("#profilephoto").attr('src', url);
							}).catch(function(error) {
								$("#selectphoto").fadeIn();
								$("#changephoto").hide();
							});

					var pastSessions = firebase.database().ref('tutors/' + split).child('pastSessions');
					pastSessions.on('value', snap => {
						$("#tutorsessionscount").html(snap.val());
					});
					$("#info_div").css("display", "none");
					$("#email_div").css("display", "none");
					$(".main-div").css("display", "none");
				    $("#logout").fadeIn();
				    $(".create-div").css("display", "none");
  					$("#sidequestion").html("All Questions");
  					$("#sidequestion").css('display', 'block');
				    $("#sideaccount").css('display', 'block');
				    $("#menubar").fadeIn();
				    $("#booknav").html("See All Requests");
				    $("#questionnav").html("See All Questions");
				    $("#loginnav").fadeIn();
				    $("#sidelogin").html("See All Requests");
				    $("#login2").html("See All Requests");
				    var accountInfo = firebase.database().ref('tutors/' + split);
					accountInfo.on("value", snap => {
						if(!snap.hasChild("verified")) {
							$("#info_div").fadeIn();
							$("#tutorsessions").hide();
						} else {
							$("#info_div").hide();
							$("#tutorsessions").fadeIn();
							$("#tutoruser i").html(snap.child("email").val());
							$("#tutorgrade i").html(snap.child("grade").val());
							$("#tutorschool i").html(snap.child("school").val());
							$("#loggedin #menubar").css('background', 'transparent');
  							$("#loggedin #menubar").css('top', '0');
							$("#tutorparentemail i").html(snap.child("parentemail").val());
							firebase.database().ref('tempusers/' + split).remove();
						}
						if(snap.hasChild("appearLink")) {
							$("#appearinlink").val(snap.child("appearLink").val());
						}
					});

					//render courses modal 
					firebase.database().ref('tutors/' + split).on('value', snap => {
						var subjects = snap.child("subjects").val().split(",");
						firebase.database().ref('courses').once('value', snap => {
							var inputhtml = "";
							for(var i=0; i<subjects.length; i++) {
								var upper = subjects[i].charAt(0).toUpperCase() + subjects[i].slice(1);
								if(snap.hasChild(upper)) {
									firebase.database().ref('tutors/' + split + '/courses').on('value', snap => {
										if(snap.hasChild(subjects[i])) {
											inputhtml += "<div id=\"" + subjects[i] + "_courses\"><h3>" + upper + " Courses</h3><h4 class=\"courseinput\" id=\"" + subjects[i] + "coursesinput\">" + snap.child(subjects[i]).val() + "</h4>";
										} else {
											inputhtml += "<div id=\"" + subjects[i] + "_courses\"><h3>" + upper + " Courses</h3><h4 class=\"courseinput\" id=\"" + subjects[i] + "coursesinput\"></h4>";
										}
									});
									var everysubject = snap.child(upper).val().split(", ");
									for(var k=0; k<everysubject.length; k++) {
										firebase.database().ref('tutors/' + split + '/courses').on('value', snap => {
											if(snap.hasChild(subjects[i]) && snap.child(subjects[i]).val().search(everysubject[k]) != -1) {
												inputhtml += "<p id=\"" + subjects[i] + k + k + "\" onclick=\"selectCourse()\" class=\"selected\">" + everysubject[k] + "</p>";
											} else {
												inputhtml += "<p id=\"" + subjects[i] + k + k + "\" onclick=\"selectCourse()\">" + everysubject[k] + "</p>";
											}
										});
									}
									inputhtml += "</div>"
								}
							}	
							$("#courseinputs").html(inputhtml);
						});
					});

				    //adds tutor subjects to 'my account'
					firebase.database().ref('tutors/' + split).child("subjects").on("value", snap => {
						var subjects = snap.val();
						var splitsubs = subjects.split(",");
						var subjecttext = "";
						var coursetext = "";
						for(var i=0; i<splitsubs.length; i++) {
							var sub = splitsubs[i].toLowerCase();
							if(sub == "act" || sub == "sat") {
								splitsubs[i] = splitsubs[i].toUpperCase();
							}
							subjecttext += "<h5 class=\"label " + sub + "\">" + splitsubs[i].charAt(0).toUpperCase() + splitsubs[i].slice(1) + "</h5> ";
							firebase.database().ref('tutors/' + split + "/courses/" + sub).on("value", snap => {
								var courses = snap.val();
								if(courses != null) {
									coursetext += "<p><strong>" + sub.charAt(0).toUpperCase() + sub.slice(1) + ":</strong> " + courses + "</p>"
								}
							});
						}
						$("#tutorcoursesarea").html(coursetext);
						$("#tutorsubjectsarea").html(subjecttext);
					});



					//updates tutor bio in 'my account'
					firebase.database().ref('tutors/' + split).child("bio").on("value", snap => {
						$("#tutorbio").html(snap.val());
					});

					//when sessions get added, add to tutor sessions
					var tutorReq = firebase.database().ref('requests');
				    tutorReq.on("value", snap => {
				    	var html = "";
				    	snap.forEach(function(childSnapshot) {
							var date = childSnapshot.child("date").val();
							var done = childSnapshot.child("done").val();
							var email = childSnapshot.child("email").val();
							var subject = childSnapshot.child("subject").val();
							var course;
							if(!childSnapshot.hasChild("course") || childSnapshot.child("course").val().toLowerCase() == "na") {
								course = "<h4 class=\"hidden\"></h4>";
							} else {
								course = "<h4>Course: " + childSnapshot.child("course").val() + "</h4>";
							}
							var details = childSnapshot.child("details").val();
							var tuteename = childSnapshot.child("name").val();
							var key = childSnapshot.key;
							var time = childSnapshot.child("time").val();
							var tutor = childSnapshot.child("tutor").val();

							var myUser = firebase.database().ref('tutors/' + split).child("subjects");

							myUser.on("value", snap => {
								var splitsubs = snap.val();
								//check whether request's subjects overlap tutor's subjects
								//if not, don't show request
								var display;
								if(splitsubs.search(subject.toLowerCase()) == -1 || done == "yes") {
									display = "green";
								} else {
									display = "red";
								}
								subject = subject.charAt(0).toUpperCase() + subject.slice(1);
								if(date != null && display != "green") {
									html += "<div class=\"tutorreq\" id=\"" + key + "\" style=\"color: " + display + "; display: none\"> <h2>Email: " + email + "</h2> <h4>Date: " + date + "</h4> " + "<h4>Time: " + convertMilitary(time) + "</h4><h4>Subject: " + subject + "</h4> " + course + " <h4>Details: " + details + "</h4> <h4>Tutor: " + tutor + "</h4> <div class\"tutorreqbuttons\"><i onclick=\"takeSession()\" class=\"fas fa-check-circle\"></i> <i onclick=\"showTuteeInfo()\" class=\"fas fa-info-circle\"></i></div></div>";
								}
							});
						});
						console.log(html);
						if(html == "") {
							$("#tutorsessionsbody").html("<h3 id=\"norequests\">You currently have no available requests.</h3>");
						} else {
							$("#tutorsessionsbody").html(html);
						}

					});

					setTimeout("sortSessions()", 300);

					var questionRef = firebase.database().ref('questions');

						questionRef.on("value", snap => {
							var questionshtml = "";
							snap.forEach(function(childSnapshot) {
								var email = childSnapshot.child("askid").val();
								var question = childSnapshot.child("question").val();
								var time = convertMilitary(childSnapshot.child("time").val());
								var answer = childSnapshot.child("answer").val();
								if(answer == "") {
									questionshtml += "<div class=\"tutorquestion\"> <h4>Question: " + question + "</h4> <h4>Time: " + time + "</h4> <h4 id=\"questionemail\">" + email + "</h4> <textarea style=\"resize: none\" type=\"text\"></textarea><button class=\"answerquestion\" onclick=\"answerQuestion()\">Answer this Question</button></div>";
								}
							});
							$("#tutorquestionbody").html(questionshtml);
						});

					//adds tutor rating to 'my account', divides totalStars by rated sessions
					var tutorRatedSess = firebase.database().ref('tutors/' + split).child("ratedSessions");

					tutorRatedSess.on("value", snap => {
						var ratedSessions = snap.val();
						if(ratedSessions > 0) {
							firebase.database().ref('tutors/' + split).child("totalStars").on("value", snap => {
								$("#tutorrating").html((snap.val()/ratedSessions).toFixed(2) + " <i class=\"fas fa-star\"></i>");
							});
						}
					});

				    //defines event for when new request accepted by tutor
					firebase.database().ref('tutors/' + split).on("value", snap => {
						var upcoming = "";
						var past = "";
						snap.forEach(function(childSnapshot) {
							if(childSnapshot.hasChild("date")) {
								var date = childSnapshot.child("date").val();
								var email = childSnapshot.child("email").val();
								var subject = childSnapshot.child("subject").val();
								var details = childSnapshot.child("details").val();
								var time = childSnapshot.child("time").val();
								var course;
								if(!childSnapshot.hasChild("course") || childSnapshot.child("course").val().toLowerCase() == "na" || childSnapshot.child("course").val().toLowerCase() == "other") {
									course = "<h4 class=\"hidden\"></h4>";
								} else {
									course = "<h4>Course: " + childSnapshot.child("course").val() + "</h4>";
								}
								var timehour = convertBack(time).split(":")[0];
								var selectedDate = new Date(splitDate(splitDate(date)));
			   					selectedDate.setTimezoneOffset(-1500 - timehour*100);
								var now = new Date().setTimezoneOffset(-700);

								var emailsent;
								if(childSnapshot.hasChild("emailSent")) {
									emailsent = "<i class=\"fas fa-check\"></i>";
								} else {
									emailsent = "<i class=\"fas fa-envelope\" onclick=\"openEmailModal()\"></i>";
								}

								var recapemailsent;
								if(childSnapshot.hasChild("recapEmailSent")) {
									recapemailsent = "<i class=\"fas fa-check\"></i>";
								} else {
									recapemailsent = "<i class=\"fas fa-envelope\" onclick=\"openRecapEmailModal()\"></i>";
								}

								if(now < selectedDate && date != null) {
									upcoming += "<div class=\"tutorreq\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> <h4 class=\"tutorreqname\">Name: " + name + "</h4> <h4>Subject: " + subject + "</h4>" + course + " <h4>Details: " + details + "</h4> <h4>Email: " + email + "</h4> <span>" + emailsent + "</span></div>";
								} else {
									if(date != null) {
										past += "<div class=\"tutorreq lightblue\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> <h4 class=\"tutorreqname\">Name: " + name + "</h4> <h4>Subject: " + subject + "</h4> " + course + "<h4>Details: " + details + "</h4> <h4>Email: " + email + "</h4> <span>" + recapemailsent + "</span> </div>";				
									}
								}
							}
						});
						$("#tutormysessionsbody").html(upcoming);
						$("#tutorpastsessionsbody").html(past);
					});

						//update previous sessions count
						firebase.database().ref('tutors/' + split).on('value', function(snapshot) {
							var returnArr = [];
							var times = [];
							snapshot.forEach(function(childSnapshot) {
						        if(childSnapshot.hasChild("date")) {
							        returnArr.push(childSnapshot.child("date").val());
							        times.push(childSnapshot.child("time").val());
							    }
						    });
							var newArr = [];
						    for(var n=0; n<returnArr.length; n++) {
						    	var selectedDate2;
						    	var timehour = convertBack(times[n]).split(":")[0];
						    	if(returnArr[n] != null) {
						        	selectedDate2 = new Date(splitDate(splitDate(returnArr[n])));
						        }
						        selectedDate2.setTimezoneOffset(-1500 - timehour*100);
						        var now2 = new Date().setTimezoneOffset(-700);
						        if(returnArr[n] != null && selectedDate2 < now2) {
						        	newArr.push(returnArr[n]);
							    }
						    }
						    firebase.database().ref('tutors/' + split).child("pastSessions").set(newArr.length);
						});    

				} else {
					//tutee interface
					$("#loginnav").fadeIn();
					var accountInfo = firebase.database().ref('users/' + split);
					accountInfo.on("value", snap => {
						if(snap.hasChild("verified")) {
							$("#info_div").hide();
							$("#mainbody").fadeIn();
							$("#myname i").html(snap.child("name").val());
							$("#loggedin #menubar").css('background', 'transparent');
  							$("#loggedin #menubar").css('top', '0');
							$("#mygrade i").html(snap.child("grade").val());
							$("#myschool i").html(snap.child("school").val());
							$("#myparentemail i").html(snap.child("parentemail").val());
							firebase.database().ref('tempusers/' + split).remove();
						} else {
							$("#info_div").fadeIn();
							$("#mainbody").hide();
						}
					});

					accountInfo.once("value", snap => {
						var pastsess = snap.child("pastSessions").val();
						var friendsess = 0;
						var recommended = 0;
						if(snap.hasChild("recommendedby")) {
							recommended = 100;
							console.log(recommended);
						}
						var invites = [];
						if(snap.hasChild("invitedUsers")) {
							invites = snap.child("invitedUsers").val().split(",");
						}
						for(var i=0; i<invites.length; i++) {
							firebase.database().ref('users/' + invites[i]).child('pastSessions').once("value", snap => {
								friendsess+=snap.val()*30;
							});
						}
						console.log(friendsess);
						firebase.database().ref('users/' + split).child("totalPoints").set(parseInt(pastsess) * 100 + friendsess + recommended);
					});

					$("#email_div").css("display", "none");
				    $(".main-div").css("display", "none");
				    $(".create-div").css("display", "none");
				    $("#sidequestion").css('display', 'block');
				    $("#sideaccount").css('display', 'block');
  					$("#menubar").fadeIn();
				    $("#bookasession a").html("Request a Session");
				    $("#navbar").hide();
				    $("#sidelogin").html("Request a Session");
				    $("#login2").html("Request a Session");

				    var totalPoints = firebase.database().ref('users/' + split).child("totalPoints");
					totalPoints.on("value", snap => {
						$("#totalpoints").html(snap.val());
					});

					var sessionsCount = firebase.database().ref('users/' + split).child("pastSessions");

					//bronze, silver gold awards
					sessionsCount.on("value", snap => {
						var sessions = snap.val();
						if(sessions >= 0 && sessions < 10) {
							$("#bronzeaward").show();
							firebase.database().ref('users/' + split).child("awardstatus").set("bronze");
						} else if (sessions >= 10 && sessions < 20) {
							$("#silveraward").show();
							firebase.database().ref('users/' + split).child("awardstatus").set("silver");
						} else {
							$("#goldaward").show();
							firebase.database().ref('users/' + split).child("awardstatus").set("gold");
						}
					});

					//achievements
					$("#noob").css("opacity", "1");
					$("#noob").css("height", "150px");
					firebase.database().ref('users/' + split).on('value', function(snapshot) {
						var prevdates = [];
						var dates = [];
						var stars = 0;
						var mathSessions = 0;
						var scienceSessions = 0;
						var humanSessions = 0;
						snapshot.forEach(function(childSnapshot) {
							var date2 = new Date(childSnapshot.child("date").val());
							var now = new Date();
							var subjects = childSnapshot.child("subject").val();
							if(now.setTimezoneOffset(1600) < date2 && date2 != null) {
								prevdates.push(date2);
							}
							if(date2 != null && date2 != "Wed Dec 31 1969 16:00:00 GMT-0800 (Pacific Standard Time)") {
								dates.push(date2);
								if(subjects.search("math")!= -1) {
									mathSessions++;
								}
								if(subjects.search("biology")!= -1 || subjects.search("chemistry")!= -1 || subjects.search("physics")!= -1) {
									scienceSessions++;
								}
								if(subjects.search("writing")!= -1 || subjects.search("history")!= -1 || subjects.search("spanish")!= -1 || subjects.search("chinese")!= -1) {
									humanSessions++;
								}
							}
							if(childSnapshot.hasChild("stars")) {
								stars++;
							}
						});
						var prevSessionsCount = prevdates.length;
						var sessionsCount = dates.length;

						if(sessionsCount > 0) {
							$("#oncer").css("opacity", "1");
							$("#oncer").css("height", "150px");
						}
						if(stars > 0) {
							$("#rater").css("opacity", "1");
							$("#rater").css("height", "150px");
						}
						if(prevSessionsCount > 2) {
							$("#novice").css("opacity", "1");
							$("#novice").css("height", "150px");
						}
						if(prevSessionsCount > 4) {
							$("#regular").css("opacity", "1");
							$("#regular").css("height", "150px");
						}
						if(mathSessions > 4) {
							$("#mathematician").css("opacity", "1");
							$("#mathematician").css("height", "150px");
						}
						if(scienceSessions > 4) {
							$("#scientist").css("opacity", "1");
							$("#scientist").css("height", "150px");
						}
						if(humanSessions > 4) {
							$("#humanities").css("opacity", "1");
							$("#humanities").css("height", "150px");
						}
						if(prevSessionsCount > 9) {
							$("#decathlete").css("opacity", "1");
							$("#decathlete").css("height", "150px");
						}
						if(stars > 9) {
							$("#critic").css("opacity", "1");
							$("#critic").css("height", "150px");
						}
						if(mathSessions > 19) {
							$("#masterofmath").css("opacity", "1");
							$("#masterofmath").css("height", "150px");
						}
						if(mathSessions > 19) {
							$("#masterofscience").css("opacity", "1");
							$("#masterofscience").css("height", "150px");
						}
						if(humanSessions > 19) {
							$("#masterofhumanities").css("opacity", "1");
							$("#masterofhumanities").css("height", "150px");
						}
						if(prevSessionsCount > 4) {
							$("#grandmaster").css("opacity", "1");
							$("#grandmaster").css("height", "150px");
						}
					});

					var userName = firebase.database().ref('users/' + split).child('name');

					userName.on('value', snap => {
						$("#welcome").html("Welcome " + snap.val()+ "!");
					});

				    //show leaderboard
				    firebase.database().ref('leaderboard').once('value', function(snapshot) {
						var arr = [];
						snapshot.forEach(function(childSnapshot) {
							var obj = { key: childSnapshot.key, val: childSnapshot.val() }
							arr.push(obj);
						});
						arr = arr.sort(function(a, b){ return a.val - b.val; }).reverse();
						for(var i=0; i<5; i++) {
							var key;
							var id = arr[i][Object.keys(arr[i])[0]];
							var color = "";
							if(id == split) {
								key = "YOU";
								color = " style=\"background-color: lightgreen\"";
							} else {
								key = "*****";
							}
							var value = arr[i][Object.keys(arr[i])[1]];
							var rank = i+1;
							for(var k=0; k<5; k++) {
								if(value == arr[k][Object.keys(arr[k])[1]]) {
									rank = k+1;
									break;
								}
							}
							$("#leaderboard table tbody").append("<tr" + color + "><td class=\"leaderrank\">" + rank + "</td><td class=\"leadername\">" + key + "</td> <td class=\"leaderscore\">" + value + "</td></tr>");
						}
						var rank;
						for(var j=0; j<arr.length; j++) {
							var id = arr[j][Object.keys(arr[j])[0]];
							key = "YOU";
							var value = arr[j][Object.keys(arr[j])[1]];
							if(id == split) {
								rank = j+1;
								for(var k=0; k<arr.length; k++) {
									if(value == arr[k][Object.keys(arr[k])[1]]) {
										rank = k+1;
										break;
									}
								}
								if(value == 0) {
									rank = arr.length;
								}
								if(rank >= 5) {
									$("#leaderboard table tbody").append("<tr style=\"background-color: lightgreen\"><td class=\"leaderrank\">" + rank + "</td><td class=\"leadername\">" + key + "</td> <td class=\"leaderscore\">" + value + "</td></tr>");
								}
								break;
							}
						}
					});

				    /*var tuteeSubjects = firebase.database().ref('users/' + split).child("subjects");

				    //when tutee adds a subject to profile
					tuteeSubjects.on("value", snap => {
						var subjects = snap.val();
						var splitsubs = subjects.split(",");
						var text = "";
						for(var i=0; i<splitsubs.length; i++) {
							var sub = splitsubs[i].toLowerCase();

							text += "<h5 class=\"label " + sub + "\">" + splitsubs[i] + "</h5> ";
						}

						$("#mysubjectsarea").html(text);
					});*/

					//when question is added, add to question queue
					var questionRef = firebase.database().ref('questions');

					questionRef.on("value", snap => {
						var html = "";
						snap.forEach(function(childSnapshot) {
							var email = childSnapshot.child("askid").val();
							var question = childSnapshot.child("question").val();
							var time = convertMilitary(childSnapshot.child("time").val());
							var answer = childSnapshot.child("answer").val();
							var tutor = childSnapshot.child("tutor").val();
							if(answer != "") {
								color = " green";
								answer = "<h4>Answer: " + answer + "</h4> <h4>Tutor: " + tutor + "</h4>";
							} else {
								color = "";
							}
							if(email == user.email) {
								html += "<div class=\"tuteequestion" + color + "\"> <h4>Question: " + question + "</h4> <h4>Time: " + time + "</h4>" + answer + "</div>";
							}
						});
						$("#myquestions").html(html);
					});

					//when new tutoring request made, add to upcoming sessions
					firebase.database().ref('users/' + split).on("value", snap => {
						var email = snap.child("email").val();
						if(email == user.email) {
							var returnArr = [];
							var times = [];
							var upcoming = "";
							var past = "";
							snap.forEach(function(childSnapshot) {
								if(childSnapshot.hasChild("date") && !childSnapshot.hasChild("removed")) {		
									var date = childSnapshot.child("date").val();
									var done = childSnapshot.child("done").val();
									var subject = childSnapshot.child("subject").val();
									var details = childSnapshot.child("details").val();
									if(!childSnapshot.hasChild("course") || childSnapshot.child("course").val().toLowerCase() == "na") {
										course = "<h4 class=\"hidden\"></h4>";
									} else {
										course = "<h4>Course: " + childSnapshot.child("course").val() + "</h4>";
									}
									var time = childSnapshot.child("time").val();
									var tutor = childSnapshot.child("tutor").val();

									var color;
									if(done == "yes") {
										color = " green";
									} else {
										color = "";
									}
									if(date != null) {
										var selectedDate = new Date(splitDate(splitDate(date)));
									}

				   					var timehour = time.split(":")[0];
									selectedDate.setTimezoneOffset(-1500 - timehour*100);
									var now = new Date().setTimezoneOffset(-700);

									if(now < selectedDate && date != null) {
										upcoming += "<div class=\"req" + color + "\"> <div class=\"cancel\" onclick=\"cancel()\"><i class=\"fas fa-times\"></i></div> <h2>Date: " + date + "</h2> " + "<h4>Time: " + convertMilitary(time) + "</h4> </h4>" + "<h4>Subject: " + subject + "</h4> " + course + "<h4>Details: "+ details + "</h4> <h4>Tutor: " + tutor + "</h4> </div>";
									} else {
										if(date != null) {
											var tuteeRef2 = firebase.database().ref('users/' + splitEmail(email) + "/" + date);
											tuteeRef2.once("value", snap => {
												if(snap.hasChild("stars")) {
													stars = snap.child("stars").val() + " <i class=\"fas fa-star\"></i>";
												} else {
													stars = "<i onclick=\"openStar()\" class=\"fas fa-star\"></i>";
												}
												past += "<div class=\"req lightblue\"> <div class=\"star\">" + stars + "</div> <h2>Date: " + date + "</h2> " + "<h4>Time: " + convertMilitary(time) + "</h4> </h4>" + "<h4>Subject: " + subject + "</h4> " + course + "<h4>Details: "+ details + "</h4> <h4>Tutor: " + tutor + "</h4> </div>";
											});
										}
									}
									returnArr.push(childSnapshot.child("date").val());
							        times.push(childSnapshot.child("time").val());
								}
							});
							$("#sessionsbody").html(upcoming);
							$("#pastsessionsbody").html(past);
							var newArr = [];
						    for(var n=0; n<returnArr.length; n++) {
						    	var selectedDate2;
						    	var timehour2 = times[n].split(":")[0];
						    	if(returnArr[n] != null) {
						        	selectedDate2 = new Date(splitDate(splitDate(returnArr[n])));
						        }
						        selectedDate2.setTimezoneOffset(-1500 - timehour2*100);
						        var now2 = new Date().setTimezoneOffset(-700);
						        if(returnArr[n] != null && selectedDate2 < now2) {
						        	newArr.push(returnArr[n]);
							    }
						    }
						    firebase.database().ref('users/' + split).child("pastSessions").set(newArr.length);
						}
					});
				}
		});

		var pastSessions = firebase.database().ref('users/' + split).child('pastSessions');

		pastSessions.on('value', snap => {
			$("#sessionscount").html(snap.val());
		});

	    if(user != null){
	      $("#user").html("User: " + user.email + "");
	    }
	}

  } else {
    // No user is signed in.
    $("#mainbody").fadeOut();
    $(".main-div").fadeIn();
    $("#email_div").css("display", "none");
    $("#indexnav").hide();
    $("#sidequestion").hide();
    $("#menubar").fadeIn();
	$("#sideaccount").hide();
    $("#sidelogin").html("LOGIN");
    $("#bookasession a").html("LOGIN or SIGNUP");
    $("#navbar").show();
    $("#tutorsessions").css("display", "none");
    $("#adminlogin").fadeIn();
    $("#logininfo").hide();
    $("#phonelogout").hide();
  }
});

//send verification email to user
function sendVerification() {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  alert("Email verification sent!  Check your inbox in 2-3 minutes, and follow the instructions in the email.")
	}).catch(function(error) {
	  alert("Error: " + error.message);
	});
}

function sortSessions() {
	var ids = [];
	var html = [];
	$( ".tutorreq" ).each(function(index) {
		if($(this).css('color') == "rgb(255, 0, 0)") {
			ids.push($(this).attr('id'));
		}
	});
	ids.sort();
	for(var j=0; j<ids.length; j++) {
		html.push($("#" + ids[j]).html());
	}
	for(var i=0; i<ids.length; i++) {
		$("#tutorsessionsbody").append("<div class=\"tutorreq\" style=\"display: block\" id=\"" + ids[i] + "\">" + html[i] + "</div>");
	}
}

function openResetPass() {
	$(".main-div").css("display", "none");
	$("#reset_div").fadeIn();
}

function changeCourseinfo() {
	var course = event.currentTarget.innerHTML;
	if(course == "Other (indicate in details)") {
		 course = "other";
	}
	$("#course").val(course);
	$("#coursetext").html(course);
	$("#coursefielderror").html("");
	var subject = $("#subject").val().toLowerCase();
	course = course.toLowerCase();
	firebase.database().ref('tutors').on('value', snap => {
		var totalcount = 0;
		var availabletutors = 0;
		snap.forEach(function(childSnapshot) {
			if(childSnapshot.hasChild("courses")) {
				totalcount++;
				if(childSnapshot.child("courses").hasChild(subject)) {
					if(course == "other" && childSnapshot.child("subjects").val().toLowerCase().search(subject) != -1) {
						availabletutors++;
					} else if(childSnapshot.child("courses").child(subject).val().toLowerCase().search(course) != -1) {
						availabletutors++;
					}
				}
			}
		});
		var responsetime = responseTime(availabletutors, totalcount);
		if(responsetime != 10000) {
			$("#responsetimediv").fadeIn(300);
			$("#responsetime").html(responsetime + " hours");
		} else {
			$("#responsetimediv").hide();
		}
	});
}

//reset Password
function resetPass() {
	var emailAddress = $("#reset_email_field").val();

	firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
	  alert("Reset email sent!  Please check your inbox and follow the instructions in the email.")
	}).catch(function(error) {
	  alert(error.message);
	  console.log(error);
	});
}

//submits question to tutors (2 hour response)
function submitquestion() {
	var question = $("#question").val();
	console.log(question);
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var split = splitEmail(firebase.auth().currentUser.email);
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	var time = hours + ":" + minutes;

	var newhours = hours;
	var ampm = "AM";
	if(hours > 12) {
		newhours = hours - 12;
		ampm = "PM";
	}
	var newtime = newhours + ":" + minutes + " " + ampm;

	if(question != "") {
		$("#question").val("");
		$("#questionerrors").css("color", "green");
		$("#questionerrors").html("Thank you for your question!  You will receive an email when your question is answered.  The answer will be in the email.");
		firebase.database().ref('questions/' + split + time).set({
			time: time,
			answer: "",
			tutor: "",
			askid: firebase.auth().currentUser.email,
			question: question
		 });
		var content = "<h3>New Question</h3> <p><strong>Question: </strong>" + question + "</p> <p><strong>Time: </strong>" + newtime + "</p> <p>You can answer this question <a href=\"https://www.instatutors.org/question\">here</a>.";
		Email.send("support@instatutors.org",
					firebase.auth().currentUser.email,
					"New Question Submitted at " + newtime,
					content,
					{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

		/*Email.send("support@instatutors.org",
					"tutors@instatutors.org",
					"New Question Submitted at " + newtime,
					content,
					{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});*/
	} else {
		$("#questionerrors").css("color", "red");
		$("#questionerrors").html("Please enter a question.");
	}
}

//enter account info 
function submitinfo() {
	var split = splitEmail(firebase.auth().currentUser.email);
	var name = $("#name_field").val();
	var grade = $("#grade_field").val();
	var school = $("#school_field").val();
	var parentemail = $("#parentemail_field").val();
	var city = $("#city_field").val();
	var invitecode = $("#invite_field").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var heard = $("#heardabout").val();
	var missing = [];
	if(name == "") {
		missing.push(" your name");
	}
	if(heard == "Select") {
		missing.push(" how you heard about InstaTutors")
	}
	if(parseInt(grade) < 4 || parseInt(grade) > 12 || grade == "") {
		missing.push(" Your grade (must be between 4th and 12th grade)");
	}
	if(parentemail.search(validemail) == -1) {
		missing.push(" valid email");
	}
	if(school == "") {
		missing.push(" your school");
	}
	if(city == "") {
		missing.push(" your city of residence");
	}
	if(missing.length>0) {
		$("#infoerrors").html("Please fill out the following: " + missing);
	} else {
		firebase.database().ref('tutors').once('value', function(snapshot) {
			if(!snapshot.hasChild(split)) {
				console.log("yes");
				firebase.database().ref('users/' + split).child("verified").set("yes");
				firebase.database().ref('users/' + split).child("name").set(name);
				firebase.database().ref('users/' + split).child("grade").set(grade);
				firebase.database().ref('users/' + split).child("school").set(school);
				firebase.database().ref('users/' + split).child("totalPoints").set(0);
				firebase.database().ref('users/' + split).child("pastSessions").set(0);
				firebase.database().ref('users/' + split).child("parentemail").set(parentemail);
				firebase.database().ref('users/' + split).child("city").set(city);
				firebase.database().ref('users/' + split).child("heard").set(heard);
			} else {
				firebase.database().ref('tutors/' + split).child("verified").set("yes");
				firebase.database().ref('tutors/' + split).child("name").set(name);
				firebase.database().ref('tutors/' + split).child("grade").set(grade);
				firebase.database().ref('tutors/' + split).child("school").set(school);
				firebase.database().ref('tutors/' + split).child("parentemail").set(parentemail);
				firebase.database().ref('tutors/' + split).child("city").set(city);
				firebase.database().ref('users/' + split).child("heard").set(heard);
			}
			firebase.database().ref('tempusers/' + split).remove();
		});
		var user;
		var recommend = false;
		firebase.database().ref('emailKeys').on("value", snap => {
	    	snap.forEach(function(childSnapshot) {
	    		if(invitecode.search(childSnapshot.val()) != -1) {
					recommend = true;
					user = childSnapshot.key;
				}
	    	});
		});
		console.log(recommend);

		if(recommend) {
			firebase.database().ref('users/' + split).child("recommendedby").set(user);
			firebase.database().ref('users/' + user).once('value', function (snapshot) {
						if(!snapshot.hasChild("invitedUsers")) {
							firebase.database().ref('users/' + user).child("invitedUsers").set(split);
						} else {
							var currentinvites = snapshot.child("invitedUsers").val();
							firebase.database().ref('users/' + user).update({ invitedUsers: currentinvites + "," + split});;
						}
			});
			setTimeout("location.reload(true);",100);
		}
	}
}

function showselect() {
	$("#profilephoto").slideUp("fast");
	$("#selectphoto").fadeIn();
	$("#changephoto").hide();
}

//submit teacher photo
function submitphoto() {
	const ref = firebase.storage().ref();
	const file = $('#profilephotoinput').get(0).files[0];
	const metadata = { contentType: file.type };
	const task = ref.child("profilephotos").child(splitEmail(firebase.auth().currentUser.email)).put(file, metadata);
	$("#selectphoto").fadeOut();
	$("#changephoto").fadeIn();
	$("#profilephoto").fadeIn();
	task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
	   	var img = document.getElementById('profilephoto');
		  img.src = url;
		}).catch(function(error) {
	  // Handle any errors
	});
}


function submitnewinfo() {
	var split = splitEmail(firebase.auth().currentUser.email);
	var name = $("#modifyname").val();
	var grade = $("#modifygrade").val();
	var school = $("#modifyschool").val();
	var parentemail = $("#modifyparentemail").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var missing = [];
	if(parseInt(grade) < 4 || parseInt(grade) > 12 || grade == "") {
		missing.push("Your grade (must be between 4th and 12th grade)");
	}
	if(parentemail.search(validemail) == -1) {
		missing.push(" valid email");
	}
	if(school == "") {
		missing.push(" your school");
	}
	if(name == "") {
		missing.push(" your name");
	}
	if(missing.length >0) {
		$("#newinfoerrors").html("Please fill out the following: " + missing);
	} else {
		firebase.database().ref('users/' + split).child("grade").set(grade);
		firebase.database().ref('users/' + split).child("school").set(school);
		firebase.database().ref('users/' + split).child("parentemail").set(parentemail);
		firebase.database().ref('users/' + split).child("name").set(name);
		$("#infoparas").toggle();
		$("#infomodify").fadeToggle();
		$("#editinfo .fa-edit").toggle();
		$("#editinfo .fa-times").fadeToggle();
	}
}

//Same thing, but from the account
function resetPass2() {
	var emailAddress = firebase.auth().currentUser.email;

	firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
	  alert("Reset email sent!  Please check your inbox and follow the instructions in the email.")
	}).catch(function(error) {
	  alert(error.message);
	  console.log(error);
	});
}

//for tutors to answer question
function answerQuestion() {
	var time = event.currentTarget.parentNode.childNodes[3].innerHTML.slice(6);
	time = time.split(" ");
	var splittime = time[0].split(":");
	var hours = splittime[0];
	var minutes = splittime[1];
	if(time[1] == "PM") {
		hours = parseInt(hours) + 12;
	}
	var question = event.currentTarget.parentNode.childNodes[1].innerHTML.slice(10);
	var email = event.currentTarget.parentNode.childNodes[5].innerHTML;
	var newtime = hours + ":" + minutes;
	var answer = event.currentTarget.parentNode.childNodes[7].value;
	if(answer != "" || length < 10) {
		var length = answer.split(" ").length;
		if(length < 10) {
			alert("Please enter an answer greater than 10 words.");	
		} else {
			firebase.database().ref('questions/' + splitEmail(email) + newtime).child("answer").set(answer);
			firebase.database().ref('questions/' + splitEmail(email) + newtime).child("tutor").set(firebase.auth().currentUser.email);
			var content = "<h3>Question Has Been Answered</h3> <p><strong>Question: </strong>" + question + "</p> <p><strong>Answer: </strong>" + answer + "</p> <p>You can request more help at <a href=\"https://www.instatutors.org\">instatutors.org</a></p>.";
			Email.send("support@instatutors.org",
					email,
					"Your Question has been Answered",
					content,
					{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});
			alert("Thank you for your answer!  Be prepared to answer follow up questions.");
		}
	} else {
		alert("Please enter an answer greater than 10 words.");
	}
}

//for Tutors to claim a session
function takeSession() {
	var date = event.currentTarget.parentNode.parentNode.childNodes[3].innerHTML;
	var newdate = date.slice(6);
	var email = event.currentTarget.parentNode.parentNode.childNodes[1].innerHTML;
	var time = event.currentTarget.parentNode.parentNode.childNodes[5].innerHTML.slice(6);
	var subject = event.currentTarget.parentNode.parentNode.childNodes[6].innerHTML.slice(9);
	var course = event.currentTarget.parentNode.parentNode.childNodes[8].innerHTML;
	if(course != "") {
		course = course.slice(8);
	}
	var newemail = splitEmail(email.slice(7));
	var details = event.currentTarget.parentNode.parentNode.childNodes[10].innerHTML.slice(9);
	console.log(details);
	var split = splitEmail(firebase.auth().currentUser.email);

	firebase.database().ref('tutors/' + split).once('value', function(snapshot) {
		var sessionsCount = 0;
		var prevdates = [];
		snapshot.forEach(function(childSnapshot) {
			var date2 = new Date(childSnapshot.child("date").val());
			var now = new Date();
			if(date2 > now && date2 != null) {
				sessionsCount++;
				prevdates.push(childSnapshot.child("date").val());
			}		
		});
		if(prevdates.indexOf(newdate) != -1 && split!="spaminstatutors") {
			alert("You cannot take more than one session in the same day.");
		} else {
			var r = confirm("Confirm that you can commit to tutoring this session?");
			var yes = "yes";
			if(r) {
				var userName = firebase.database().ref('tutors/' + split).child('name');
				userName.on('value', snap => {
					firebase.database().ref('requests/' + newdate + newemail).child("tutor").set(snap.val());
					firebase.database().ref('users/' + newemail + "/" + newdate).child("tutor").set(snap.val());
				});
				firebase.database().ref('requests/' + newdate + newemail).child("done").set(yes);
				firebase.database().ref('users/' + newemail + "/" + newdate).child("done").set(yes);
				alert("confirmed. ");
				firebase.database().ref('tutors/' + split + "/" + newdate).set({
				    email: email.slice(7),
				    date: newdate,
				    time: time,
				    course: course,
					subject: subject,
					details: details,	
				 });

				var content = "<h3 style=\"color: #30CFD0\">Tutor Contact: " + firebase.auth().currentUser.email + "</h3> <p><strong>Date:</strong> " + date + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Course:</strong> " + course + "</p> <p><strong>Details: </strong>" + details + "</p> <p>Your tutor will email you within 24 hours!</p>";

				Email.send("support@instatutors.org",
					email,
					"Confirmed: Tutoring Session on " + date,
					content,
					{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

				var content2 = "<h3><strong>Date:</strong> " + date + "</h3> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Course:</strong> " + course + "</p> <p><strong>Details: </strong>" + details + "</p> <p>Make sure to email your tutee with our built in mail function (under \"My Account\"), and set a reminder for yourself so you do not forget to show up for your session.  Good luck!</p>";

				Email.send("support@instatutors.org",
					firebase.auth().currentUser.email,
					"Confirmed: Tutoring Session on " + date,
					content2,
					{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});
				}
			}
	});
}

//shows tuteeinfo onclick when button clicked
function showTuteeInfo() {
	var email2 = event.currentTarget.parentNode.parentNode.childNodes[1].innerHTML;
	var split2 = splitEmail(email2.slice(7));
	firebase.database().ref('users/' + split2).once('value', snap => {
		console.log(snap.val());
		var name = snap.child("name").val();
		var grade = snap.child("grade").val();
		var school = snap.child("school").val();
		var city = snap.child("city").val();
		var parentemail = snap.child("parentemail").val();
		var pastSessions = snap.child("pastSessions").val();
		$("#tuteemodalbody").html("<h2>Name: " + name + "</h2> <h4>Grade: " + grade + "</h4> <h4>School: " + school + "</h4> <h4>City: " + city + "</h4> <h4>Parent Email: " + parentemail + "</h4> <h4>Past Sessions: " + pastSessions + "</h4>");
	});
	$("#tuteeinfo").css('left', '15%');
	$("#emailmodalmask").css('opacity', '0.7');
	$("#emailmodalmask").css('z-index', '98');
}

function closeTuteeModal() {
	$("#tuteeinfo").css('left', '200%');
	$("#emailmodalmask").css('opacity', '0');
	$("#emailmodalmask").css('z-index', '0');
}

function openEmailModal() {
	var date = event.currentTarget.parentNode.parentNode.childNodes[1].innerHTML.slice(6);
	var email = event.currentTarget.parentNode.parentNode.childNodes[12].innerHTML.slice(7);
	var time = event.currentTarget.parentNode.parentNode.childNodes[3].innerHTML.slice(6);
	var subject = event.currentTarget.parentNode.parentNode.childNodes[7].innerHTML.slice(9);
	var course = event.currentTarget.parentNode.parentNode.childNodes[8].innerHTML.slice(8);
	console.log(course);
	if(course != "") {
		subject = course;
	}
	var name = "<STUDENT-NAME>";
	var myemail;
	var myname;
	var appear = "";
	firebase.database().ref('tutors/' + splitEmail(firebase.auth().currentUser.email)).on('value', snap => {
		myname = snap.child("name").val();
		if(snap.hasChild("appearLink")) {
			appear = snap.child("appearLink").val();
		}
	});
	$("#emailto").html("To: " + email);
	var link = "appear.in/" + myname.split(" ")[0] + "-" + myname.split(" ")[1];
	if(appear != "") {
		link = appear;
	}
	firebase.database().ref('users/' + splitEmail(email)).on('value', snap => {
		var content = "Hi " + snap.child("name").val() + "! \n\n My name is " + myname + " and I will be your tutor for " + subject + " on " + date + " at " + time + ". \n\n When it comes time for your tutoring session, go to this link: " + link.toLowerCase() + ".  The room will be locked, so nobody can access the room but us.\n\nPlease let me know if you have any questions before our tutoring session, and thank you for choosing InstaTutors! \n\n Best, \n " + myname;
 		$("#emailcontent").val(content);
 	});
 	$("#emailmodal h2").attr('id', date);
 	$("#emailmodal h2").html("Send an Email to Your Student");
 	$("#sendstudentemail").fadeIn();
 	$("#sendstudentrecapemail").hide();
	$("#emailmodal").css('top', '5vh');
	$("#emailmodal").css('opacity', '1');
	$("#emailmodalmask").css('opacity', '0.7');
	$("#emailmodalmask").css('z-index', '98');
}

function openCoursesModal() {
	$("#coursesmodal").css('top', '5vh');
	$("#coursesmodal").css('opacity', '1');
	$("#coursesmodalmask").css('opacity', '0.7');
	$("#coursesmodalmask").css('z-index', '98');
}

function openRecapEmailModal() {
	var date = event.currentTarget.parentNode.parentNode.childNodes[1].innerHTML.slice(6);
	var email = event.currentTarget.parentNode.parentNode.childNodes[12].innerHTML.slice(7);
	var time = event.currentTarget.parentNode.parentNode.childNodes[3].innerHTML.slice(6);
	var subject = event.currentTarget.parentNode.parentNode.childNodes[7].innerHTML.slice(9);
	var course = event.currentTarget.parentNode.parentNode.childNodes[9].innerHTML.slice(8);
	console.log(course);
	if(course != "") {
		subject = course;
	}
	var name = "";
	var myemail;
	var myname = "";
	$("#emailto").html("To: " + email);
	firebase.database().ref('tutors/' + splitEmail(firebase.auth().currentUser.email)).on('value', snap => {
		myname = snap.child("name").val();
	});
	firebase.database().ref('users/' + splitEmail(email)).on('value', snap => {
		var content = "Hi " + snap.child("name").val() + "! \n\n Thank you for attending today's " + subject + " tutoring session. Hopefully you have a better grasp of <INSERT-CONCEPTS>.\n\n Here is a quick recap of our tutoring session today: \n\n <INSERT-RECAP>\n\n If you have any further questions, please let me know -- I am here to help.  Otherwise, please rate this tutoring session on the InstaTutors site, and consider taking the time to provide some feedback for me on this quick survey: http://tracking.instatutors.org/public/survey?sid=zznF0JX-BDZO7wGb6jnC1A2 \n\n Thanks again for choosing InstaTutors! \n\n Best, \n " + myname;
 		$("#emailcontent").val(content);
	});
 	$("#emailmodal h2").attr('id', date);
 	$("#emailmodal h2").html("Send a Recap Email to Your Student");
 	$("#sendstudentrecapemail").fadeIn();
 	$("#sendstudentemail").hide();
	$("#emailmodal").css('top', '50px');
	$("#emailmodal").css('opacity', '1');
	$("#emailmodalmask").css('opacity', '0.7');
	$("#emailmodalmask").css('z-index', '98');
}

function sendStudentEmail() {
	var content = $("#emailcontent").val();
	var arr = content.split("\n");
	var content2 = "";
	for(var i=0; i<arr.length; i++) {
		if(arr[i] == "") {
			content2 += "";
		} else {
			content2 += "<p>" + arr[i] + "</p>";
		}
	}
	var myemail = firebase.auth().currentUser.email;
	var email = $("#emailto").html().slice(4);
	var myname;
	firebase.database().ref('tutors/' + splitEmail(firebase.auth().currentUser.email)).child('name').on('value', snap => {
		myname = snap.val();
	});
	var ref = $("#emailmodal h2").attr('id');
	firebase.database().ref('requests/' + ref + splitEmail(email)).child("emailSent").set("true");
	firebase.database().ref('tutors/' + splitEmail(myemail) + "/" + ref).child("emailSent").set("true");
	Email.send(myemail,
		email,
		"[InstaTutors] Message From Your Tutor: " + myname,
		content2,
		{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

	Email.send(myemail,
		myemail,
		"[InstaTutors] Message From Your Tutor: " + myname,
		content2,
		{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

	Email.send(myemail,
		"instatutorsteam@gmail.com",
		"[InstaTutors] Message From Your Tutor: " + myname,
		content2,
		{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

	$("#emailmodal").css('top', '-100vh');
	$("#emailmodal").css('opacity', '0');
	$("#emailmodalmask").css('opacity', '0');
	$("#emailmodalmask").css('z-index', '0');
	$("#sendstudentrecapemail").hide();
 	$("#sendstudentemail").hide();
}

function sendStudentRecapEmail() {
	var content = $("#emailcontent").val();
	var arr = content.split("\n");
	var content2 = "";
	for(var i=0; i<arr.length; i++) {
		if(arr[i] == "") {
			content2 += "";
		} else {
			content2 += "<p>" + arr[i] + "</p>";
		}
	}
	var myemail = firebase.auth().currentUser.email;
	var email = $("#emailto").html().slice(4);
	var myname;
	firebase.database().ref('tutors/' + splitEmail(firebase.auth().currentUser.email)).child('name').on('value', snap => {
		myname = snap.val();
	});
	var ref = $("#emailmodal h2").attr('id');
	firebase.database().ref('requests/' + ref + splitEmail(email)).child("recapEmailSent").set("true");
	firebase.database().ref('tutors/' + splitEmail(myemail) + "/" + ref).child("recapEmailSent").set("true");
	Email.send(myemail,
		email,
		"[InstaTutors] Recap of Today's Tutoring Session - " + myname,
		content2,
		{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) {console.log("sent") }});

	Email.send(myemail,
		myemail,
		"[InstaTutors] Recap of Today's Tutoring Session - " + myname,
		content2,
		{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

	Email.send(myemail,
		"instatutorsteam@gmail.com",
		"[InstaTutors] Recap of Today's Tutoring Session - " + myname,
		content2,
		{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

	$("#emailmodal").css('top', '-100vh');
	$("#emailmodal").css('opacity', '0');
	$("#emailmodalmask").css('opacity', '0');
	$("#emailmodalmask").css('z-index', '0');
	$("#sendstudentrecapemail").hide();
 	$("#sendstudentemail").hide();
}

function closeEmailModal() {
	$("#emailmodal").css('top', '-100vh');
	$("#emailmodal").css('opacity', '0');
	$("#emailmodalmask").css('opacity', '0');
	$("#emailmodalmask").css('z-index', '0');
	$("#sendstudentrecapemail").hide();
 	$("#sendstudentemail").hide();
}

function closeCoursesModal() {
	$("#coursesmodal").css('top', '-100vh');
	$("#coursesmodal").css('opacity', '0');
	$("#coursesmodalmask").css('opacity', '0');
	$("#coursesmodalmask").css('z-index', '0');
}

//cancel Tutoring session (request)
function cancel() {
	var input = prompt("To cancel a session, please input your email.");
	var date = event.currentTarget.parentNode.childNodes[3].innerHTML;
	var newdate = date.slice(6);
	var email = firebase.auth().currentUser.email;
	var newemail = splitEmail(email);
	var subject = event.currentTarget.parentNode.childNodes[7].innerHTML.slice(10);

	if(input == email) {
		var reason = prompt("What is your reason for canceling?");
		firebase.database().ref('requests/' + newdate + newemail).child("done").set("yes");
		firebase.database().ref('users/' + newemail + "/" + newdate).child("removed").set("yes");
		
		/*Email.send("support@instatutors.org",
			"instatutorsteam@gmail.com",
			"New Tutoring Session Requested for " + subject + " on " + newdate,
			content,
			{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});
		*/
		alert("Tutoring session for " + newdate + " canceled.");
	} else {
		alert("wrong email. aborting.")
	}
}

//update Star Count for tutors
var currenttutor;
var currentdate;

function openStar() {
	$("#starsmask").css('opacity', '0.8');
	$("#starsmask").css('z-index', '95');
	$("#stars").css('top', '15%');
	currenttutor = event.currentTarget.parentNode.parentNode.childNodes[12].innerHTML.slice(7);
	currentdate = event.currentTarget.parentNode.parentNode.childNodes[3].innerHTML.slice(6);
}

function star(stars) {
	var split = splitEmail(firebase.auth().currentUser.email);
	var ref = firebase.database().ref('tutors');

	alert("Thank you for rating " + currenttutor + " " + stars + " stars.");
	$("#starsmask").fadeOut();
	$("#stars").fadeOut();

	firebase.database().ref('users/' + split + "/" + currentdate).child("stars").set(stars);

	var tutoremail = "";
	ref.orderByChild("name").equalTo(currenttutor).on("value", snap => {
		var prevstars;
		var ratedsessions;
		if(tutoremail == "") {
			tutoremail += Object.keys(snap.val())[0];
		} else {
			tutoremail = "trash/" + Object.keys(snap.val())[0];
		}
		var tutorRef = firebase.database().ref('tutors/' + tutoremail);
		tutorRef.child('totalStars').once("value", snap => {
			prevstars = snap.val();
		});
		tutorRef.once("value", snap => {
			if(!snap.hasChild("ratedSessions")) {
				ratedSessions = 0;
			} else {
				ratedSessions = snap.child("ratedSessions").val();
			}
			console.log(ratedSessions);
		});
		tutorRef.child('ratedSessions').set(ratedSessions + 1);
		tutorRef.child('totalStars').set(prevstars + stars);
	});
}

function hoverone() {
	$("#onestar").css("color", "gold");
}

function hovertwo() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
}

function hoverthree() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
	$("#threestar").css("color", "gold");
}

function hoverfour() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
	$("#threestar").css("color", "gold");
	$("#fourstar").css("color", "gold");
}

function hoverfive() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
	$("#threestar").css("color", "gold");
	$("#fourstar").css("color", "gold");
	$("#fivestar").css("color", "gold");
}

function closeStars() {
	$("#starsmask").css('opacity', '0');
	$("#starsmask").css('z-index', '0');
	$("#stars").css('top', '-100%');
}

function sessionstab() {
	$("#sessionstab").fadeIn();
	 $("#booktab").hide();
	 $("#questiontab").hide();
}

function questiontab() {
	$("#questiontab").fadeIn();
	 $("#booktab").hide();
	 $("#sessionstab").hide();
}

function booktab() {
	$("#booktab").fadeIn();
	 $("#questiontab").hide();
	 $("#sessionstab").hide();
}

function allsessionstab() {
	$("#allsessions").fadeIn();
	 $("#tutormysessions").hide();
	 $("#tutorallquestions").hide();
}

function tutorsessionstab() {
	$("#tutormysessions").fadeIn();
	 $("#allsessions").hide();
	 $("#tutorallquestions").hide();
}

function allquestionstab() {
	$("#tutorallquestions").fadeIn();
	$("#allsessions").hide();
	 $("#tutormysessions").hide();
}

function openCreate() {
	$(".main-div").hide();
	$(".create-div").fadeIn();
}

function closeCreate() {
	$(".main-div").fadeIn();
	$(".create-div").hide();
}

function fadebiomask() {
	$("#biomask").fadeOut();
	$("#biopopup").fadeOut();
}

//initialize database
var database = firebase.database();

//send account data to firebase
function writeAccount(name, email, stat) {
	var split = splitEmail(email);

		firebase.database().ref('tempusers/' + split).set({
			name: name,
		    email: email,
		    stat: stat,
		    pastSessions: 0,
		    totalPoints: 0
		 });

		if(name != null) {
			firebase.database().ref('names/' + splitEmail(email)).set({
				id: splitEmail(email)
			});
		}
}

function writeTempAccount() {
	var email = firebase.auth().currentUser.email;
	var split = splitEmail(email);

		firebase.database().ref('tempusers/' + split).set({
		    email: email,
		    stat: "tutee",
		    pastSessions: 0,
		    totalPoints: 0
		 });

		if(name != null) {
			firebase.database().ref('names/' + splitEmail(email)).set({
				id: splitEmail(email)
			});
		}

	firebase.auth().currentUser.getIdToken(true); 
	setTimeout("location.reload(true);",300);
}


//create new account
function createAccount() {
	var newName = $("#createname").val();
	var newEmail = $("#createemail").val();
	var newPass = $("#createpassword").val();
	var confirmPass = $("#confirmpassword").val();
	var stat = "tutee";

	if(newPass == confirmPass && newPass != "" && newEmail != "") {
		if(newName == "") {
			$("#errormessage2").html("Please enter your name.");
		} else {
			firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).catch(function(error) {
			event.preventDefault();
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  $("#errormessage2").html("Error : " + errorMessage);
			});

			firebase.auth().signInWithEmailAndPassword(newEmail, newPass);
			$(".create-div").css("display", "none");
			$("#email_div").fadeIn();

			sendVerification();
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
}

function googlelogin() {
	firebase.auth().signInWithRedirect(provider);
	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    // This gives you a Google Access Token. You can use it to access the Google API.
	    var token = result.credential.accessToken;
	    // ...
	  }
	  // The signed-in user info.
	  var user = result.user;
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function logout(){
  firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	  event.preventDefault();
	});
	//$("#errormessage").html("");
	//$("#errormessage2").html("");
	setTimeout("location.reload(true);",300);
}


//save requests to firebase
function writeRequest(email, date, time, subject, course, details, done, tutor) {
	var newEmail = splitEmail(email);
	var newDate = splitDate(date);

	firebase.database().ref('users/' + newEmail + "/" + newDate).set({
			email: email,
			date: newDate,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject,
			details: details,
			course: course
		  });

	firebase.database().ref('requests/' + newDate + newEmail).set({
			email: email,
			date: newDate,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject,
			details: details,
			course: course
		  });
}


//on tutoring request submit -> pushes form data to firebase
function requestSession() {
	var email = firebase.auth().currentUser.email;
	var date = $("#date").val();
	var time = $("#time").val();
	var tutor = $("#tutor").val();
	var subject = $("#subject").val();
	var course = $("#course").val();
	var coursedisplay = $("#courserow").css('display');
	if(coursedisplay == "none") {
		course = "NA";
	}
	var details = $("#details").val();
	var timing;

	if($('#weekly:checked').val() == "on") {
		timing = "weekly";
	} else if ($('#bi-weekly:checked').val() == "on") {
		timing = "bi-weekly";
	} else {
		timing = "one-time";
	}
	var numberofsessions = parseInt($("#timingcount").val());
	if(timing == "one-time") {
		numberofsessions = 1;
	}

	var missing = [];

	firebase.database().ref('users/' + splitEmail(email)).once('value', function(snapshot) {
		var sessionsCount = 0;
		var prevdates = [];
		snapshot.forEach(function(childSnapshot) {
			var date2 = new Date(childSnapshot.child("date").val());
			var now = new Date();
			if(date2 > now && date2 != null && !childSnapshot.hasChild("removed")) {
				sessionsCount++;
				prevdates.push(childSnapshot.child("date").val());
			}		
		});

		firebase.database().ref('users/' + splitEmail(email)).child("awardstatus").once('value', function(snapshot) {
			var maxSess;
			var daysInAdvance;
			if(snapshot.val() == "bronze") {
				maxSess = 5;
				daysInAdvance = 1;
			} else if(snapshot.val() == "silver") {
				maxSess = 8;
				daysInAdvance = 1;
			} else {
				maxSess = 10;
				daysInAdvance = 0;
			}
			if(numberofsessions + sessionsCount > maxSess) {
				$("#formerrors").css("color", "red");
				$("#formerrors").html("You can only have " + maxSess + " active requests at a time.");
				event.preventDefault();
			} else {
				var selectedDate = new Date(date);
				selectedDate.setTimezoneOffset(-1600);
			   	var now = new Date();
			   	now.setDate(now.getDate() + daysInAdvance);
			   	now.setHours(0);
				if(date == "" || selectedDate <= now || isNaN(date.split('-')[0]) || isNaN(date.split('-')[1]) || isNaN(date.split('-')[2])) {
					missing.push(" valid date (date must be at least " + daysInAdvance + " days ahead of today, and in the format MM-DD-YYYY)");
				}
				if(time == "" || isNaN(time.split(':')[0]) || isNaN(time.split(':')[1])) {
					missing.push(" time (time should be the format HH:MM)");
				}
				if(subject == "") {
					missing.push(" subject");
				}
				if(details == "") {
					missing.push(" details");
				}
				if(course == "") {
					missing.push(" course");
				}
				if(missing != "") {
					$("#formerros").css("color", "red");
					$("#formerrors").html("Please enter the following: " + missing);
					event.preventDefault();
				} else {
					var dates = [];
					if(timing == "weekly") {
							for(var i=0; i<numberofsessions; i++) {
								var newdate = new Date(new Date(date).toString());
								newdate = newdate.addDays(7*i);
								newdate = newdate.setTimezoneOffset(-1600);
								newdate = newdate.toString("MM-dd-yyyy");
								dates.push(newdate);
							} 
					} else if(timing == "bi-weekly") {
							for(var i=0; i<numberofsessions; i++) {
								var newdate = new Date(new Date(date).toString());
								newdate = newdate.addDays(14*i);
								newdate = newdate.setTimezoneOffset(-1600);
								newdate = newdate.toString("MM-dd-yyyy");
								dates.push(newdate);
							}
					}
					if(intersect(prevdates, dates).length > 0 || prevdates.indexOf(splitDate(date)) != -1) {
						if(timing == "bi-weekly" || timing == "weekly") {
							console.log(intersect(prevdates, dates).length);
							$("#formerrors").html("You already have sessions booked on the following dates: " + intersect(prevdates, dates));
						} else {
							var dateindex = prevdates.indexOf(splitDate(date));
							$("#formerrors").html("You already have a session booked on the following date: " + prevdates[dateindex]);
						}
					} else {
						var content;
						if(timing == "weekly") {
							var polishdates = "";
							for(var p=0; p<dates.length; p++) {
								writeRequest(email, splitDate(splitDate(dates[p])), time, subject, course, details, "no", tutor);
								if(p>0) {
									polishdates += (", " + dates[p]);
								} else {
									polishdates += dates[p];
								}
							}
							console.log(polishdates);
							content = "<h3 style=\"color: #30CFD0\">New Tutoring PLAN Requested -</h3>  <p><strong>Dates:</strong> " + polishdates + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Course: </strong>" + course + "</p> <p><strong>Details: </strong>" + details + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";
							$("#bookedheader").html("Your tutoring requests for " + polishdates + " are logged.");
							date = polishdates;

						} else if(timing == "bi-weekly") {
							var polishdates = "";
							for(var p=0; p<dates.length; p++) {
								writeRequest(email, splitDate(splitDate(dates[p])), time, subject, course, details, "no", tutor);
								if(p>0) {
									polishdates += (", " + dates[p]);
								} else {
									polishdates += dates[p];
								}
							}
							content = "<h3 style=\"color: #30CFD0\">New Tutoring PLAN Requested -</h3>  <p><strong>Dates:</strong> " + polishdates + "</p> <p><strong>Time:</strong> " + convertMilitary(time) + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Course: </strong>" + course + "</p> <p><strong>Details: </strong>" + details + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";
							$("#bookedheader").html("Your tutoring requests for " + polishdates + " are logged.");
							date = polishdates;

						} else {
							writeRequest(email, date, time, subject, course, details, "no", tutor);
							content = "<h3 style=\"color: #30CFD0\">New Tutoring Session -</h3>  <p><strong>Date:</strong> " + splitDate(date) + "</p> <p><strong>Time:</strong> " + convertMilitary(time) + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Course: </strong>" + course + "</p> <p><strong>Details: </strong>" + details + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";
							date = splitDate(date);
							$("#bookedheader").html("Your tutoring request for " + date + " is logged.");
						}


						var ref = firebase.database().ref('tutors');
						//get uids of all tutors
							ref.once("value", snap => {
						 		var tutorids = Object.keys(snap.val());
						 		for(var i=0; i<tutorids.length; i++) {
						 			var myUser = firebase.database().ref('tutors/' + tutorids[i]);

									myUser.on("value", snap => {
										if(snap.hasChild("subjects")) {
											var splitsubs = snap.child("subjects").val();
											var reqsub = subject.toLowerCase();
											//check whether request's subjects overlap tutor's subjects
											//if not, don't show request
											if(splitsubs.search(reqsub) != -1) {
												Email.send("support@instatutors.org",
													snap.child("email").val(),
													"New Tutoring Session Requested for " + subject + " on " + date,
													content + "<p>Take this session <a href=\"https://www.instatutors.org/login\">here</a>.</p>",
													{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});
											}
										}
									});
								}
							 });
							

							var subjectarr = subject.split(", ");
							firebase.database().ref('users/' + splitEmail(email)).once('value', function(snapshot) {
								if(snapshot.hasChild("subjects") == false) {
									firebase.database().ref('users/' + splitEmail(email)).child("subjects").set(subjectarr.join(","));
								} else {
									var value = snapshot.child("subjects").val();
									for(var i=0; i<subjectarr.length; i++) {
										if(value.search(subjectarr[i]) == -1) {
											value+= "," + subjectarr[i];
										}
									}
									firebase.database().ref('users/' + splitEmail(email)).child("subjects").set(value);
								}
							});
							if(tutor == "") {
								$("#tutor2").hide();
							} else {
								$("#tutor2").html("Tutor: " + tutor);
							}
							if(course == "NA") {
								$("#course2").hide();
							} else {
								$("#course2").html("Course: " + course);
							}
							$("#time2").html("Time: " + convertMilitary(time));
							$("#subject2").html("Subject: " + subject);
							$("#details2").html("Details: " + details);

							$("#mainbody").hide();
							$("#confirmedbody").fadeIn();
							$("#logout").css("display", "none");
							//send confirmation email to user
							Email.send("support@instatutors.org",
								firebase.auth().currentUser.email,
								"New Tutoring Session(s) Requested for " + subject + " on " + date,
								content + "<p>Check out your account <a href=\"https://www.instatutors.org/account\">here</a>.</p>",
								{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});

							return true;
					}
				}
			}
		});
	});
}

//submit appear.in link
function submitAppear() {
	var link = $("#appearinlink").val();
	if(link.search("appear.in/") == -1) {
		$("#appearerrors").css('color', 'red');
		$("#appearerrors").html('please enter a valid link');
	} else {
		var split = splitEmail(firebase.auth().currentUser.email);
		firebase.database().ref('tutors/' + split).child("appearLink").set(link);
		$("#appearerrors").css('color', 'green');
		$("#appearerrors").html('Success');
	}
}

//let tutor edit their bios
function editBio() {
	$("#tutorbio").css("border", "2px solid #30CFD0");
	$("#tutorbio").prop("readonly", false);
	$("#submitBio").fadeIn("fast");
}

function submitBio() {
	var content = $("#tutorbio").val();
	var wordcount = content.split(" ").length;
	if(wordcount < 100) {
		$("#tutorbio").css("border", "1px solid #ccc");
		$("#tutorbio").prop("readonly", true);
		$("#submitBio").fadeOut("fast");
		var user = firebase.auth().currentUser;
		var split = splitEmail(user.email);

		firebase.database().ref('tutors/' + split).child("bio").set(content);
		$("#bioerror").css('color', 'green');
		$("#bioerror").html("Thank you for submitting your bio!");
		setTimeout("$(\"#bioerror\").fadeOut()", 3000);
	} else {
		$("#bioerror").css('color', 'red');
		$("#bioerror").html("Please keep your bio under 100 words.");
	}

}

//add subject to user's subjects
function addSubject() {
	var email = firebase.auth().currentUser.email;
	var subject = $("#newsubject").val();
	var newEmail = splitEmail(email);

	var tuteeSubjects = firebase.database().ref('users/' + newEmail).child("subjects");

	var currentSubjects;

	tuteeSubjects.on("value", snap => {
		currentSubjects = snap.val();
	});

	if(subject != "") {
		if(currentSubjects == null) {
			$("#subjectmessage").css("color", "green");
			$("#subjectmessage").html(subject + " added as a subject!");
			firebase.database().ref('users/' + newEmail).update({ subjects: subject.toLowerCase() + "," + currentSubjects});
		} else if (currentSubjects.search(subject) === -1) {
			$("#subjectmessage").css("color", "green");
			$("#subjectmessage").html(subject + " added as a subject!");
			firebase.database().ref('users/' + newEmail).update({ subjects: subject.toLowerCase() + "," + currentSubjects});
		} else {
			$("#subjectmessage").css("color", "red");
			$("#subjectmessage").html("You already have " + subject + " as a subject!");
		}
	} else {
		$("#subjectmessage").css("color", "red");
		$("#subjectmessage").html("Please enter a subject.")
	}
}

//delete all subjects from user's subjects
function deletesubjects() {
	alert("Deleting all subjects.");
	var email = firebase.auth().currentUser.email;
	var newEmail = splitEmail(email);
	firebase.database().ref('users/' + newEmail).update({ subjects: ""});
}

//find a tutor
/*function matchTutors() {
	var user = firebase.auth().currentUser;
	var split = splitEmail(user.email);
	var tuteeSubjects = firebase.database().ref('users/' + split).child("subjects");
	var tuteeSubArray = "";

	tuteeSubjects.on("value", snap => {
		tuteeSubArray = snap.val();
	});

	tuteeSubArray = tuteeSubArray.split(",");

	var tutordata;
	var matchedtutors = "";
	var goodtutors = "";

	var ref = firebase.database().ref('tutors');
	//get uids of all tutors
	ref.on("value", snap => {
	 	tutordata = snap.val();
	 	var tutorids = Object.keys(snap.val());

	 	for(var i=0; i<tutorids.length; i++) {
	 		var tutorSub = firebase.database().ref('tutors/' + tutorids[i]).child("subjects");

	 		//determine overlap between user subjects & tutor subjects
	 		tutorSub.on("value", snap => {
	 			var tutorSubArray = snap.val().split(",");
	 			var inCommon = intersect(tuteeSubArray, tutorSubArray);

	 			if(inCommon.length > 1) {
	 				matchedtutors += tutorids[i] + ",";
	 			} else if (inCommon.length == 1) {
	 				goodtutors += tutorids[i] + ",";
	 			}
	 		});
	 	}

	 	var mytutors = "";

	 	var matches = matchedtutors.split(",");
	 	var good = goodtutors.split(",");

	 	//add tutors to "great matches"
		for(var i=0; i<matches.length; i++) {
			var tutorRef = firebase.database().ref('tutors/' + matches[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var bio = snap.child("bio").val();
				if(bio == null) {
					bio = "";
				}
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"mytutor great\"> <h2>" + name + "</h2> <h4>Tutor Contact: <a>" + email + "</a></h4> <p>" + bio + "</p> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add tutors to "good matches"
		for(var i=0; i<good.length; i++) {
			var tutorRef = firebase.database().ref('tutors/' + good[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var bio = snap.child("bio").val();
				if(bio == null) {
					bio = "";
				}
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"mytutor good\"> <h2>" + name + "</h2> <h4>Tutor Contact: <a>" + email + "</a></h4> <p>" + bio + "</p> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add DOM elements to matched tutors
		if(mytutors == "") {
			$("#mytutorsarea").html("<p>No tutors found.  Sorry.</p>");
		} else {
			$("#mytutorsarea").html(mytutors);
		}
	});
}*/

function viewTutors() {
	var tuteeSubject = $("#subject").val();
	var tuteeCourse = $("#course").val();
	var mytutors = "";
	console.log($("#courserow").css('display'));
	if(tuteeSubject == "" || (tuteeCourse == "" && $("#courserow").css('display') == 'block')) {
	 	$("#tutorspace").html("<p>Please select a subject & course.</p>");
	 } else if ($("#courserow").css('display') == 'none' || $("#course").val() == "other") {
	 	//match by subjects
	 	var good = [];
	 	$("#tutorspace").html("");
		var ref = firebase.database().ref('tutors');
		//get uids of all tutors
		ref.on("value", snap => {
		 	snap.forEach(function(childSnapshot) {
		 		if(childSnapshot.hasChild("subjects") && childSnapshot.child("subjects").val().toLowerCase().search(tuteeSubject.toLowerCase()) != -1) {
		 			good.push(childSnapshot.key);
		 		}
		 	});
		});
		for(var i=0; i<good.length; i++) {
			var tutorRef = firebase.database().ref('tutors/' + good[i]);
			tutorRef.on("value", snap => {
				if(snap.hasChild("bio")) {
					var name = snap.child("name").val();
					var email = snap.child("email").val();
					var bio = snap.child("bio").val();
					var subjects = snap.child("subjects").val().split(",");
					var subjectLabels = "";
					for(var k=0; k<subjects.length; k++) {
						if(subjects[k] == tuteeSubject.toLowerCase()) {
							subjectLabels += "<h5 class=\"label " + subjects[k] + " speciallabel\">" + subjects[k] + "</h5> ";
						} else {
							subjectLabels += "<h5 class=\"label " + subjects[k] + "\">" + subjects[k] + "</h5> ";
						}
					}
					mytutors += "<div class=\"viewtutor great\" onclick=\"selectTutor()\"> <h2>" + name + "</h2> <p>" + bio + "</p> <h4>Subjects:</h4> " + subjectLabels + "</div>"; 		
				}
			});
		}
		if(mytutors == "") {
			$("#tutorspace").html("<p>No tutors found.  Sorry.</p>");
		} else {
			$("#tutorspace").html(mytutors);
		}
	 } else {
	 	//match by courses
	 	var good = [];
	 	$("#tutorspace").html("");
		var ref = firebase.database().ref('tutors');
		//get uids of all tutors
		ref.on("value", snap => {
		 	snap.forEach(function(childSnapshot) {
		 		if(childSnapshot.hasChild("courses/" + tuteeSubject.toLowerCase()) && childSnapshot.child("courses").child(tuteeSubject.toLowerCase()).val().toLowerCase().search(tuteeCourse.toLowerCase()) != -1) {
		 			good.push(childSnapshot.key);
		 		}
		 	});
		});
		for(var i=0; i<good.length; i++) {
			var tutorRef = firebase.database().ref('tutors/' + good[i]);
			tutorRef.on("value", snap => {
				if(snap.hasChild("bio")) {
					var name = snap.child("name").val();
					var email = snap.child("email").val();
					var bio = snap.child("bio").val();
					var relcourses = snap.child("courses").child(tuteeSubject.toLowerCase()).val().split(",").join(", ");
					mytutors += "<div class=\"viewtutor great\" onclick=\"selectTutor()\"> <h2>" + name + "</h2> <p>" + bio + "</p> <h4>" + tuteeSubject + " Courses/Experience:</h4> <strong>" + relcourses + "</strong></div>"; 		
				}
			});
		}
		if(mytutors == "") {
			$("#tutorspace").html("<p>No tutors found.  Sorry.</p>");
		} else {
			$("#tutorspace").html(mytutors);
		}
	}
}

function selectTutor() {
	var name = event.currentTarget.childNodes[1].innerHTML;
	$("#tutor").val(name);
	$("#formerrors").css("color", "#444");
	$("#formerrors").html("Selected " + name + " as a tutor.");
}

function submitApplication() {
	var name = $("#applyname").val();
	var email = $("#applyemail").val();
	var grade = $("#applygrade").val();
	var school = $("#applyschool").val();
	var subjects = $("#applysubjects").val();
	var q1 = $("#applyq1").val();
	var q2 = $("#applyq2").val();
	var q3 = $("#applyq3").val();
	var q4 = $("#applyq4").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var missing = [];
	if(name == "") {
		missing.push("name");
	}
	if(email.search(validemail) == -1) {
		missing.push(" valid email");
	}
	if(grade == "") {
		missing.push(" your grade");
	}
	if(school == "") {
		missing.push(" your school");
	}
	if(subjects == "") {
		missing.push(" your subjects");
	}
	if(q1 == "" || q2 == "" || q3 == "" || q4 == "") {
		missing.push(" responses to one or more supplemental questions");
	}
	if(missing != "") {
		$("#applyerrors").css("color", "red");
		$("#applyerrors").html("You are missing : " + missing + ".");
	} else {
		$("#applyerrors").css("color", "green");
		$("#applyerrors").html("Thank you for submitting!  We will get back to you within 48 hours.");
		var content = "<h3 color=\"#30CFD0\">New Tutor Application</h3> <p><strong>Name:</strong> " + name + "</p> <p><strong>Email:</strong> " + email + "</p> <p><strong>School + Grade:</strong> " + school + ", " + grade + "</p> <p><strong>Subject(s):</strong> " + subjects + "<p><strong> 1. Why do you want to tutor for InstaTutors? </strong></p> <p>" + q1 + "</p> <p><strong>What qualifies you to tutor for InstaTutors? </strong></p> <p> " + q2 + "</p> <p><strong> Describe your most significant academic experience. </strong></p> <p>" + q3 + "</p> <p><strong>What does \"volunteering\" mean to you?</strong></p> <p> " + q4 + "</p>";
		Email.send("support@instatutors.org",
			"instatutorsteam@gmail.com",
			"New Tutor Application from " + name,
			content,
			{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});
		$("#applyname").val("");
		$("#applyemail").val("");
		$("#applygrade").val("");
		$("#applyschool").val("");
		$("#applysubjects").val("");
		$("#applyq1").val("");
		$("#applyq2").val("");
		$("#applyq3").val("");
		$("#applyq4").val("");
	}
}
//validate message on homepage
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
		var content = "<h3 color=\"#30CFD0\">New Message</h3> <p><strong>Name:</strong> " + name + "</p> <p><strong>email:</strong> " + email + "</p> <p><strong>Message:</strong> " + message + "</p>"; 
		document.getElementById("contactForm").reset();

		Email.send("inquiries@instatutors.org",
			"instatutorsteam@gmail.com",
			"New Message from " + name,
			content,
			{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2"});
	}
}

function editInfo() {
	$("#infoparas").fadeToggle();
	$("#infomodify").fadeToggle();
	$("#editinfo .fa-edit").fadeToggle();
	$("#editinfo .fa-times").fadeToggle();
}


/*Send invites*/
function sendFriendEmail() {
	var email = $("#invitefriendsemail").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	if(email.search(validemail) == -1) {
		$("#inviteerror").css('color', 'red');
		$("#inviteerror").html('Please enter a valid email!');
	} else {
		$("#invitefriendsemail").val("");
		$("#inviteerror").css('color', 'green');
		$("#inviteerror").html('Success!  Invite more friends to earn more points!');
		var split = splitEmail(firebase.auth().currentUser.email);
	   	firebase.database().ref('users/' + split).once('value', function (snapshot) {
	   		var name = snapshot.child("name").val();
	   		var myemail = snapshot.child("email").val();
	   		firebase.database().ref('emailKeys/' + split).once('value', function (snapshot) {
	   			var content = "<body style=\"padding: 50px; background-color: #eee;\"><h1 color=\"#30CFD0\">InstaTutors: A Free Online Tutoring Service!</h1> <p>You have been invited by " + name + " to join InstaTutors, a free online tutoring service for middle school and high school students.  Request a tutoring session, and receive help over video chat from a qualified student tutor.  Or, ask a question and receive a GUARANTEED 2 hour response!</p> <p>Sign up with this code (after you create your account and log in): <strong>" + snapshot.val() + "</strong></p><p>...to earn 100 free points, and benefit " + name + "!  Use points to earn awards, and privileges. Become a Gold Student (2500+ points), and receive a $25 gift card!</p>  <h3>Sign up today at <a href=\"https://www.instatutors.org\">instatutors.org</a>!</h3></body>"; 
		   		Email.send(myemail,
				email,
				"Invite from " + name + " to join InstaTutors!",
				content,
				{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});
	   		});
	    });
	}
}

function sendFriendEmail2() {
	var email = $("#tutorfriendsemail").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	if(email.search(validemail) == -1) {
		$("#tutorinviteerror").css('color', 'red');
		$("#tutorinviteerror").html('Please enter a valid email!');
	} else {
		$("#tutorfriendsemail").val("");
		$("#tutorinviteerror").css('color', 'green');
		$("#tutorinviteerror").html('Success!  Invite more friends to earn more points!');
		var split = splitEmail(firebase.auth().currentUser.email);
	   	firebase.database().ref('tutors/' + split).once('value', function (snapshot) {
	   		var name = snapshot.child("name").val();
	   		var myemail = snapshot.child("email").val();
	   		firebase.database().ref('emailKeys/' + split).once('value', function (snapshot) {
	   			var content = "<body style=\"padding: 50px; background-color: #eee;\"><h1 color=\"#30CFD0\">InstaTutors: A Free Online Tutoring Service!</h1> <p>You have been invited by " + name + " to join InstaTutors, a free online tutoring service for middle school and high school students.  Request a tutoring session, and receive help over video chat from a qualified student tutor.  Or, ask a question and receive a GUARANTEED 2 hour response!</p> <p>Sign up with this code (after you create your account and log in): <strong>" + snapshot.val() + "</strong></p><p>...to earn 100 free points, and benefit " + name + "!  Use points to earn awards, and privileges. Become a Gold Student (2500+ points), and receive a $25 gift card!</p>  <h3>Sign up today at <a href=\"https://www.instatutors.org\">instatutors.org</a>!</h3></body>"; 
		   		Email.send(myemail,
				email,
				"Invite from " + name + " to join InstaTutors!",
				content,
				{token: "4c110561-2f5a-4bc1-a677-e1c0b05de4e2", callback: function done(message) { console.log("sent") }});
	   		});
	    });
	}
}

//function to choose subjects (for tutors)
function selectCourse() {
	var id = event.currentTarget.id;
	var subjectid = event.currentTarget.parentNode.id;
	var input = event.currentTarget.innerHTML;
	$("#" + id).toggleClass("selected");
	var fin = $("#" + subjectid + " .courseinput");
	if(fin.html().search(input) != -1) {
		var split = fin.html().split(", ");
		var index = split.indexOf(input);
		split.splice(index, 1);
		if(split.length>1) {
			split = split.join(", ");
		}
		fin.html(split);
	} else {
		if(fin.html() == "") {
			fin.html(input);
		} else {	
			fin.html(fin.html() + ", " + input);
		}
	}
}

//submitcourses to profile
function submitCourses() {
	$( ".courseinput" ).each(function(index) {
		var subject = $(this).parent().attr('id').split("_")[0];
		var newvalue = $(this).html();
		var split = splitEmail(firebase.auth().currentUser.email);
   		firebase.database().ref('tutors/' + split + "/courses/" + subject).set(newvalue);
	});
	closeCoursesModal();
}

//on tutor page, sort by course 
function sortByCourse() {
	var count = 0;
	var id = event.currentTarget.id;
	var course = $("#" + id).html();
	$("#filtercoursetext").html(course);
	course = course.toLowerCase();
	$( ".tutor" ).each(function( index ) {
		var content = this.innerHTML.toLowerCase();
		if(content.search(course) == -1) {
			$(this).hide();
		} else {
			$(this).show();
			count++;
		}
	});
	$("#teamtutorcount").html(count);
}

function responseTime(available, total) {
	console.log(available + ", " + total);
	if(available == 0) {
		return 10000;
	}
	var ratio = available/total;
	var response = (51-ratio*50);
	var date = new Date();
	var hours = date.getHours();
	if(hours > 20 && hours < 4) {
		hours += 5.0; 
	} else if(hours > 8 && hours < 14) {
		hours += 3.0;
	}
	return response.toFixed(0);
}

function input(str) {
  $("#question").val($("#question").val() + str);
}
