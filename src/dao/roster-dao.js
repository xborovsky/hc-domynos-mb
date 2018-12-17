import { refTypes } from './ref-types';
import { fetchList } from './common-dao';

import firebase from '../util/firebase';

const fetchAll = async () => {
    let data = await fetchList(refTypes.roster);
    return data.sort((p1, p2) => parseInt(p1.number) - parseInt(p2.number));
};

const fetchPlayersForSelect = async () => {
    return await fetchList(refTypes.roster)
        .then(players => {
            var result = [{value : null, text : null}];
            players.forEach(player => {
                result.push({ value : player.id, text : player.name });
            });
            return result;
        });
};

const fetchAllWithStats = () => {
    // TODO error handling
    return new Promise((resolve, reject) => {
        Promise.all([fetchList(refTypes.playerStats), fetchList(refTypes.gkStats)])
            .then(responses => {
                const playerStats = responses[0];
                const gkStats = responses[1];
                let playersData = [];

                fetchList(refTypes.roster).then(players => {
                    players.forEach(player => {
                        if (player.position === 'GK') {
                            player.stats = gkStats.filter(gkStat => gkStat['player_id'] === player.id);
                        } else {
                            player.stats = playerStats.filter(playerStat => playerStat['player_id'] === player.id);
                        }
                        if (player.stats && player.stats.length) {
                            player.stats = player.stats[0];
                        }
                        playersData.push(player);
                    });

                    resolve(playersData);
                });
            });
        });
};

const addPlayer = (name, number, position, imageUrl) => {
    let ref = firebase.database().ref(refTypes.roster),
        newRef = ref.push();

    newRef.set({name, number, position, imageUrl});
    return newRef;
};

export {
    fetchAll,
    fetchAllWithStats,
    addPlayer,
    fetchPlayersForSelect
}