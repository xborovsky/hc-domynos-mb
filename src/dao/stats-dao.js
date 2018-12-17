import { refTypes } from './ref-types';
import { fetchList } from './common-dao';

export const fetchPlayerStats = (isGK) => {
    const refType = isGK ? refTypes.gkStats : refTypes.playerStats,
          entryId = isGK ? "gk_id" : "player_id";

    // TODO error handling
    return new Promise((resolve, reject) => {
        fetchList(refType)
            .then(stats => {
                fetchList(refTypes.roster).then(players => {
                    stats.forEach(statsEntry => {
                        const res = players.filter(playerData => statsEntry[entryId] === playerData.id);
                        statsEntry.player = res && res.length ? res[0] : {};
                    });

                    resolve(stats);
                });
            });
        });
};

export const fetchGKStats = () => fetchPlayerStats(true);