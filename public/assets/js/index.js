$(function(){
    $("#create").on("submit",function(event){
        event.preventDefault();
        console.log($("#createUsername").val().trim())
        console.log($("#createPassword").val().trim())
        
        var newUser = {
            username: $("#createUsername").val().trim(),
            password: $("#createPassword").val().trim()
        }
        $.ajax("/api/users", {
            type: "POST",
            data: newUser
        }).then(
            function(){
                console.log("Created new user")
                
            }
        )
    })


    
})