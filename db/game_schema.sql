DROP DATABASE IF EXISTS theplaybook_db;
CREATE DATABASE theplaybook_db;

USE theplaybook_db;

DELIMITER //

CREATE PROCEDURE fn_AddGame (IN GameName CHAR(50), IN GameGenre CHAR(50), IN GameReleaseDate CHAR(50), IN GameHype INT)
BEGIN
	DECLARE GameIdentifier INT(11);
    DECLARE GenreIdentifier INT(11);
    DECLARE Count INT(11);
    
	SELECT id INTO GameIdentifier FROM game WHERE name = GameName;
    IF (GameIdentifier IS NULL) THEN
		INSERT INTO game (name,releaseDate,hype) VALUES (GameName, GameReleaseDate, GameHype);
		SET GameIdentifier = LAST_INSERT_ID();
	END IF;

	SELECT id INTO GenreIdentifier FROM genre WHERE name = GameGenre;
    IF (GenreIdentifier IS NULL) THEN
		INSERT INTO genre (name) VALUES (GameGenre);
		SET GenreIdentifier = LAST_INSERT_ID();
	END IF;
		
	SELECT COUNT(*) INTO Count FROM gamegenre WHERE GameId = GameIdentifier AND GenreId = GenreIdentifier;  
	IF (Count = 0) THEN
		INSERT INTO gamegenre (GameId,GenreId) VALUES (GameIdentifier,GenreIdentifier);
	END IF;
END;//

DELIMITER ;
