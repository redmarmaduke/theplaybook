$(function(){
    $("#create").on("submit",function(event){
        event.preventDefault();
        console.log($("#createUsername").val().trim())
        console.log($("#createPassword").val().trim())
        
        var newUser = {
            username: $("#createUsername").val().trim(),
            password: $("#createPassword").val().trim()
        }
        // POST request to create a new user
        $.ajax("/api/users", {
            type: "POST",
            data: newUser
        }).then(
            function(){
                console.log("Created new user")
                $("#createUsername").val('')
                $("#createPassword").val('')              
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
                
                }
                else(
                    alert("Log in failed")
                )
            }
        )

    })
    
})