/* $(function(){
    $("#create").on("submit",function(event){
        event.preventDefault();
        
        var newUser = {
            username: $("#createUsername").val().trim(),
            password: $("#createPassword").val().trim()
        }
        // POST request to create a new user
        $.ajax("/api/users", {
            type: "POST",
            data: newUser
        }).then(
            function(confirm){
                if(confirm){
                    console.log("Created new user")
                    $("#createUsername").val('')
                    $("#createPassword").val('') 
                    window.localStorage.setItem("user", confirm)
                }
                else{
                    console.log("registration failed")
                }
                             
            }
        )
    })


    $("#log").on("submit", function(event){
        event.preventDefault();
        let user = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        }
        // PUT request for validating user
        $.ajax("/api/users" + "/" + user.username + "/" + user.password,{
            type: "GET"
        }).then(
            function(confirm){
                if(confirm){
                    window.location = "/main"
                    window.localStorage.setItem("user", confirm)
                }
                else(
                    alert("Log in failed")
                )
            }
        )

    })
    
})
<<<<<<< HEAD

=======
*/
>>>>>>> 1a9a1fb0affad7401c0dc592067c1a834e69e903