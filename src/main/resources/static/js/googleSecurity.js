var userObj = null;
function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        userObj = profile;
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log("Name: " + profile.getName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        
        console.log(location.href);
        if(location.href == "http://localhost:8080/"){
        	console.log("Nothing to redirect to");
        }
        else{
	        var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:8080/tokensignin');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onload = function() {
				todo = xhr.responseText;
			  console.log('Signed in as: ' + xhr.responseText);
			  window.location.href = todo;
	
			};
			xhr.send('idtoken=' + id_token);
        }

      };
      
      function signOut() {
    	    var auth2 = gapi.auth2.getAuthInstance();
    	    auth2.signOut().then(function () {
    	      console.log('User signed out.');
    	      var xhr = new XMLHttpRequest();
    			xhr.open('POST', 'http://localhost:8080/tokensignout');
    			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    			xhr.onload = function() {
    				todo = xhr.responseText;
    			  console.log('Signed in as: ' + xhr.responseText);
    			  window.location.href = todo;

    			};
    			xhr.send();
    	    });
    	  }	