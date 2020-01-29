const fs = require('fs');

const rawg = require('axios').create({
    headers: {
        "User-Agent" : "ThePlayBook"
    } 
});

let nextURL = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-25&page_size=1000";
let games = [];

let sql_schema = `
USE theplaybook_db;

DELIMITER //

CREATE PROCEDURE fn_AddGame (IN GameName NVARCHAR(50), IN GameGenre NVARCHAR(50), IN GameReleaseDate NVARCHAR(50), IN GameHype INT)
BEGIN
	SELECT @GameId = id FROM games WHERE name = @GameName;
    IF (@GameId IS NULL) THEN
		INSERT INTO games (name,releaseDate,hype) VALUES (@GameName, @GameReleaseDate,@GameHype);
		SELECT @GameId = SCOPE_IDENTITY();
	END IF;

	SELECT @GenreId = id FROM genres WHERE name = @GameGenre;
    IF (@GenreId IS NULL) THEN
		INSERT INTO genres (name) VALUES (@GameGenre);
		SELECT @GenreId = SCOPE_IDENTITY();
	END IF;

	INSERT INTO gamegenre (GameId,GenreId) VALUES (@GameId,@GenreId);
END;//

DELIMITER ;

`;

let sql_seed =
`USE theplaybook_db;

`;

function process(url) {
    if (!url) {
        return new Promise((resolve,reject) => {
            resolve(true);
        });
    }
    return rawg.get(url).then(function(values) {
        games = [ ...games, ...values.data.results ];
        //console.log(values.data.results[0]);
        process(values.data.next);
    }).catch(function(reason) {
        console.error(reason);
    });
}

process(nextURL).then(function() {
    for (game of games) {
        for (genre of game.genres) {
            sql_seed += `Call fn_AddGame("${game.name}","${genre.name}","${game.released}",${game.suggestions_count});\n`;
        }
    }
    fs.writeFileSync("Schema.sql",sql_schema);
    fs.writeFileSync("Seed.sql",sql_seed);
});

