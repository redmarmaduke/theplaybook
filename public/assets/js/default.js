$(function () {
    $("#create-comment").on("click", function (event) {
        event.preventDefault();

        // if no user is logged in then do nothing FIXME: || 1
        let userId = parseInt(window.localStorage.getItem("user")) || 1;
        let gameId = parseInt($(this).data("game-id"));
        if (isNaN(userId) || isNaN(gameId)) {
            return;
        }

        var bodyInput = $("#comment").val().trim()
        if (!bodyInput || bodyInput.length > 140) {
            alert("Please make sure you have entered a comment and it is less than 140 characters");
            return;
        }
        var newComment = {
            text: $("#comment").val().trim(),
            UserId: userId,
            GameId: gameId
        }
        //Send POST request
        axios.post("/api/comment",newComment).then(
            function () {
                console.log("added new comment");
                location.reload();
            }
        );
    })
    // Edit Comment
    $("#edit-comment").on("click", function (event) {
        var id = $(this).data("id")
        var editedComment = {
            text: $("#comment").val().trim(),
            userId: 1,
            GameID: $(this).data("game-id")
        }
        //Send PUT request
        axios.put("/api/comment/" + id, {
            data: editedComment
        }).then(
            function () {
                console.log("edited comment")
                location.reload()
            }
        )
    })
    // Delete Comment
    $("#delete-comment").on("click", function (event) {
        var id = $(this).data("id");
        console.log("ID:",id);
        // Send DELETE request
        axios.delete("/api/comments/" + id).then(function () {
            console.log("deleted comment")
            location.reload()
        })
    });
});
