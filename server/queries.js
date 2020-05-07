const queries = {

    //Consider that the user wants to know which anime he rated
    selectAllAnimeLike (startsWith) {
        return `SELECT * FROM Anime WHERE name LIKE '${startsWith}%'`;
    },
    selectAllAnime : "SELECT * FROM Anime",
    selectAllAnimeLike (startsWith) {
        return `SELECT * FROM Anime WHERE name LIKE '${startsWith}%'`;
    },
    selectUserWithUsername (username){
        return `SELECT * FROM User WHERE username = '${username}'`;
    },
    selectUserWithUsernameAndPassword (username, password){
        return `SELECT * FROM User WHERE username = '${username}' AND password = '${password}'`;
    },
    insertUser : 'INSERT INTO User SET ?',
    selectAnimeWithName (name) {
        return  `SELECT Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score, 
        GROUP_CONCAT(Genre.name SEPARATOR ', ') AS 'Genres', GROUP_CONCAT(Studio.name SEPARATOR ', ') AS 'Studios', 
        GROUP_CONCAT(Producer.name SEPARATOR ', ') AS 'Producers', GROUP_CONCAT(Licencor.name SEPARATOR ', ') AS 'Licencors' 
        FROM Anime JOIN AnimeGenre ON Anime.id = AnimeGenre.anime_id JOIN Genre ON AnimeGenre.genre_id = Genre.id 
        JOIN AnimeStudio ON Anime.id = AnimeStudio.anime_id JOIN Studio ON AnimeStudio.studio_id = Studio.id 
        JOIN AnimeProducer ON Anime.id = AnimeProducer.anime_id JOIN Producer ON AnimeProducer.producer_id = Producer.id 
        JOIN AnimeLicencor ON Anime.id = AnimeLicencor.anime_id JOIN Licencor ON AnimeLicencor.licencor_id = Licencor.id 
        WHERE Anime.name = '${name}' 
        GROUP BY Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score`;
    },
    selectAllWatchedAnimeByUser (username) {
        return `SELECT Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score
        FROM Anime WHERE EXISTS (SELECT *
                                 FROM UserWatched
                                 WHERE UserWatched.anime_id = Anime.id
                                 AND UserWatched.user_username = '${username}')
        ORDER BY Anime.total_score DESC`;
    }, 
    selectAllWishedAnimeByUser (username) {
        return `SELECT Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score
        FROM Anime WHERE EXISTS (SELECT *
                                 FROM UserWish
                                 WHERE UserWish.anime_id = Anime.id
                                 AND UserWish.user_username = '${username}')
        ORDER BY Anime.total_score DESC`;
    }, 
    selectAllRatdeAnimeByUser (username) {
        return `SELECT Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score, UserScore.score
        FROM Anime JOIN UserScore ON Anime.id = UserScore.anime_id
        WHERE UserScore.user_username = '${username}'
        ORDER BY Anime.total_score DESC`;
    },
    //Select name of genres
    selectAllAnimeWithGenres (genres) {
        let sql = `SELECT Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score, COUNT(*) as 'Count'
                        FROM Anime JOIN AnimeGenre ON Anime.id = AnimeGenre.anime_id 
                        JOIN Genre ON AnimeGenre.genre_id = Genre.id
                        WHERE Genre.name = '${genres[0]}'`;
        for (let i = 0; i < genres.length; i++){
            sql += ` OR Genre.name = '${genres[i]}'`;
        }
        sql += `GROUP BY Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score
                      HAVING Count > 0
                      ORDER BY Count DESC
                      LIMIT 10`;
        return sql;
    },
    selectNTopRatedAnime (n) { 
        return `SELECT Anime.id, Anime.name, Anime.description, Anime.picture, Anime.date_aired, Anime.total_score 
                FROM Anime
                ORDER BY Anime.total_score
                LIMIT 10 ${n}`;
    }


};

module.exports = queries;