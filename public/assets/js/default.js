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
        axios.post("/api/comment", newComment).then(
            function () {
                location.reload();
            }
        );
    })

    // Edit Comment
    $(".edit-comment").on("click", function (event) {
        var btn = $(event.target);
        
        var id = btn.data("id");
        var state = btn.data("state");
        var textarea = $(`:input[data-id='${id}']`);
        
        // if state is equal to update
        if (!state.localeCompare("update")) {
            textarea.attr('readonly', false);
            
            btn.html("Save");
            btn.removeClass("btn-warning");
            btn.addClass("btn-success");
            btn.data("state","save");
        }
        else {
            textarea.attr('readonly', true);
            
            btn.html("Update");
            btn.removeClass("btn-success");
            btn.addClass("btn-warning");
            btn.data("state","update");

            //Send PUT request
            axios.put("/api/comment/" + id, {
                comment: textarea.val().trim()
            }).then(function () {
                location.reload()
            });
        }
    });

    // Delete Comment
    $(".delete-comment").on("click", function (event) {
        var id = $(event.target).data("id");
        // Send DELETE request
        axios.delete("/api/comment/" + id).then(function () {
            location.reload();
        });
    });
});
