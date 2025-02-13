// Function to get element by ID
getID = function(x){
    return document.getElementById(x);
};

// Function to update the leaderboard and ranks
updateLeaderboard = function () {
    var table = getID("player");
    var rows = table.rows;

    // Convert rows into an array and sort by score
    var playersArray = Array.from(rows).slice(1); // Skip header
    playersArray.sort(function(a, b) {
        return parseInt(b.cells[2].innerText) - parseInt(a.cells[2].innerText);
    });

    // Clear the table body before updating
    table.tBodies[0].innerHTML = '';

    // Add new sorted rows with ranks
    playersArray.forEach((row, index) => {
        var rank = index + 1;
        var rankCell = row.cells[0];
        rankCell.innerText = rank;
        table.tBodies[0].appendChild(row);
    });
};

// Function to submit the data (add or update)
submitData = function (){
    var player = getID("player_name").value;
    var score = getID("player_score").value;

    if (!player || !score) {
        alert("Please enter both player name and score.");
        return;
    }

    var table = getID("player");
    var rows = table.rows;

    // Check if the player already exists in the table
    var playerExists = false;
    for (var i = 1; i < rows.length; i++) {  // start from 1 to skip the header
        var existingPlayer = rows[i].cells[1].innerText;

        if (existingPlayer === player) {
            // Player found, update their score
            rows[i].cells[2].innerText = score;
            playerExists = true;
            break;
        }
    }

    if (!playerExists) {
        // Player not found, create a new row
        var rankCell = document.createElement("TD");
        var playerCell = document.createElement("TD");
        var scoreCell = document.createElement("TD");

        var playerCellText = document.createTextNode(player);
        var scoreCellText = document.createTextNode(score);

        playerCell.appendChild(playerCellText);
        scoreCell.appendChild(scoreCellText);

        var row = document.createElement("TR");
        row.appendChild(rankCell);
        row.appendChild(playerCell);
        row.appendChild(scoreCell);

        table.appendChild(row);
    }

    // Sort leaderboard after adding player
    updateLeaderboard();

    // Clear the input fields after submission
    getID("player_name").value = "";
    getID("player_score").value = "";
};

// Function to modify player's points (add or remove points)
modifyPoints = function () {
    var playerName = getID("modify_player_name").value;
    var points
