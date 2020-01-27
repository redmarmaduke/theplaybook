
$(function () {

//Add new comment
$("#create-comment").on("click", function(event){
    event.preventDefault();
    var bodyInput = ("#comment").val().trim()
    console.log(("#comment").val().trim())
    if (!bodyInput || bodyInput > 140) {
        alert("Please make sure you have entered a comment and it is less than 140 characters")
        return;
    }

    var newComment = {
        text: ("#comment").val().trim(),
        UserId:1,
        GameId: $(this).data("game-id")
    }

    //Send POST request
    axios("/api/comment", {
        type: "POST",
        data: newComment
    }).then(
        function(){
            console.log("added new comment");
            location.reload();
        }
    )
})

// Edit Comment
$("#edit-comment").on("click", function(event){
    var id = $(this).data("id")
    var editedComment = {
        text: ("#comment").val().trim(),
        userId:1,
        GameID: $(this).data("game-id")

    }

    //Send PUT request
    axios("/api/comment/" + id, {
        type: "PUT",
        data: editedComment
    }).then(
        function(){
            console.log("edited comment")
            location.reload()
        }
    )
})

// Delete Comment
$("#delete-comment").on("click", function(event){
    var id = $(this).data("id");

    // Send DELETE request
    axios("/api/comments/" + id, {
        type: "DELETE"
    }).then(function(){
        console.log("deleted comment")
        location.reload()
    })
})



})