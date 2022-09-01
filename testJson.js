const data = require('./loadData');

const url = "https://gist.githubusercontent.com/kumarpani/1e759f27ae302be92ad51ec09955e765/raw/184cef7125e6ef5a774e60de31479bb9b2884cb5/TeamRCB.json";

const loadJson = async (url) => {
    const jsonData = await data.getJson(url);
    return JSON.parse(jsonData);
}

const checkForeignPlayers = async (number) => {
    let jsonData = await loadJson(url);
    //console.log(jsonData.player);
    const internationalPlayerCount = jsonData.player.reduce(function (count, play) {
        return (play.country != "India") ? ++count : count;
    }, 0);
    if (internationalPlayerCount > number)
        throw new Error("More than " + number + " Internaional Players");
    else
        console.info("Validated that International Players are not more than " + number);
}

const checkWicketKeeperExist = async () => {
    let jsonData = await loadJson(url);
    let keeper = jsonData.player.reduce((keep, play) => {
        //console.log(play.country);
        return (play.role == 'Wicket-keeper') ? ++keep : keep;
    }, 0);
    if (keeper == 0)
        throw new Error("Unexpected Keeper Count " + keeper);
    else
        console.info("Validated that Atleast 1 Wicket-Keeper is placed in the team " + number);
}

checkForeignPlayers(4);
checkWicketKeeperExist();
