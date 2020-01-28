let userId = localStorage.getItem("user")

// API Calls

let getUser = function(userId){
    return $.ajax({
        url: "/api/user/" + userId,
        type: "GET"
    })
}

let getUserComments = function(userId){
    return $.ajax({
        url: "/api/profile/" + userId + "/comments",
        type: "GET"
    })
}