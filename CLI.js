var tvmaze = require("tvmaze-api");
var axios = require("axios");
let fs = require("fs");

let query_word = process.argv[2];
let query_slice = process.argv.slice(3).join(" ");
let query_slice_join = process.argv.slice(3).join("+")
let key_word = query_slice_join;

if (query_word === "show") {
    get_show()
} else if (query_word === "actor") {
    get_actor()
} else {
    console.log("please enter either 'Show and Name' OR 'Actor and Name'");
}

function get_show() {
    tvmaze.getByQuery(key_word, true, [], function (result) {
        let show_log = {
            name: result.name,
            genres: result.genres,
            rating: result.rating.average,
            network: result.network.name,
            summary: result.summary,
            break_line: "END OF QUERY ==================================="
        }
        function console_log_show() {
            console.log(`searched for show: ${query_slice}\nThe name of the show: ${show_log.name} \nThe show's genre(s): ${show_log.genres} \nThe show's average rating: ${show_log.rating}\nThe show's network: ${show_log.network}\nThe Show Summary: ${show_log.summary}\n${show_log.break_line}`);
        }
        console_log_show();
        fs.appendFile("log.txt", JSON.stringify(show_log), function (err) {
            if (err) throw err;
        })

    });
}

function get_actor() {
    axios.get(`http://api.tvmaze.com/search/people?q=${key_word}`).then(function (respond) {
        let actor_log = {
            name: respond.data[0].person.name,
            birthday: respond.data[0].person.birthday,
            gender: respond.data[0].person.gender,
            country: respond.data[0].person.country.name,
            URL: respond.data[0].person.url,
            break_line: "END OF QUERY ==================================="
        }

        function console_log_actor() {
            console.log(`searched for actor: ${query_slice}\nThe actor's name: ${actor_log.name} \nThe actor's birthday: ${actor_log.birthday} \nThe actor's gender: ${actor_log.gender}\nThe actor's country: ${actor_log.country}\nThe actor's TV Maze URL: ${actor_log.URL}\n${actor_log.break_line}`);
        }
        console_log_actor();
        fs.appendFile("log.txt", JSON.stringify(actor_log), function (err) {
            if (err) throw err;
        })
    })
}