
var friends = require('../data/friends');


module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {

        var bestMatch = {
            name: '',
            photo: '',
            friendDifference: Infinity
        };

        // THESE TWO LINES OF CODE TAKE THE RESULTS OF THE
        // USERS SURVEY POST, THEN PARSE IT.
        var userData = req.body;
        var userScores = userData.scores;

        // THIS VAR WILL CALCULATE THE DIFF BETWEEN USER'S SCORES
        // AND SCORES OF USERS ALREADY IN THE DATABASE.
        var totalDifference;

        // NOW, WE LOOP THROUGH ALL FRIEND POSSIBILITIES IN THE DATABASE.
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;
            console.log(currentFriend.name);

            // NEXT, WE LOOP THROUGH THE SCORES OF EACH FRIEND.
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

            // THEN, WE CALC THE DIFF BETWEEN THE SCORES AND
            // SUM THEM INTO THE 'totalDifference'
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            // IF THE SUM OF THE DIFF IS LESS THEN THE DIFF
            // OF THE CURRENT 'bestMatch'
            if (totalDifference <= bestMatch.friendDifference) {
                // RESET THE 'bestMatch' TO BE THE NEW FRIEND.
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        // LASTLY, SAVE THE 'useData' TO THE DATABASE.
        friends.push(userData);

        // AND RETURN A JSON WITH THE USER'S 'bestMatch'
        // TO BE USED BY THE HTML IN THE NEXT PAGE.
        res.json(bestMatch);
    });
};