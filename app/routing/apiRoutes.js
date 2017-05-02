/*
 * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
 * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
 */

var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        // store user data
        var userData = req.body;
        var userScores = userData.scores;
        var newFriend = {
            name: "",
            pic: "",
            matchScore: 100
        };
        console.log(userData);

        // compare to existing user data
        var scoreDiff = 0;

        // calculate best match
        for (var i = 0; i < friends.length; i++) {
            console.log("Currently evaluating ->");
            console.log(friends[i]);
            console.log("- - - - - - - - - - - - - -");

            scoreDiff = 0;

            for (var j = 0; j < friends[i].scores[j]; j++) {
                scoreDiff = parseInt(userScores[j]) - parseInt(friends[i].scores[j]);
                if (scoreDiff < 0) {
                    scoreDiff = scoreDiff * -1;
                }

                if (scoreDiff <= newFriend.matchScore) {
                    newFriend.name = friends[i].name;
                    newFriend.photo = friends[i].photo;
                    newFriend.matchScore = scoreDiff;
                }
            }
        }

        // push user data to db
        friends.push(userData);

        // send result of friendship calculation
        res.json(newFriend);

    });

}