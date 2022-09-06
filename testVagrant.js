const data = require('../loadData');
const assertchai = require('chai').assert;

const url = "https://gist.githubusercontent.com/kumarpani/1e759f27ae302be92ad51ec09955e765/raw/184cef7125e6ef5a774e60de31479bb9b2884cb5/TeamRCB.json";

const loadJson = async (url) => {
    const jsonData = await data.getJson(url);
    return JSON.parse(jsonData);
}

module.exports = {
    'check Foreign Players': async function () {
        let jsonData = await loadJson(url);
        const internationalPlayerCount = jsonData.player.reduce(function (count, play) {
            return (play.country != "India") ? ++count : count;
        }, 0);
        assertchai.isAtMost(internationalPlayerCount, 4);
        //assert.equal(true, (internationalPlayerCount <= 4));
    },
    'check WicketKeeper Exist': async () => {
        let jsonData = await loadJson(url);
        let keeper = jsonData.player.reduce((keep, play) => {
            //console.log(play.country);
            return (play.role == 'Wicket-keeper') ? ++keep : keep;
        }, 0);
        assertchai.isAtLeast(keeper, 1);
        //assert.equal(true, (keeper > 1));
    }
};