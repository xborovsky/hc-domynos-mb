import { fetchList, fetchById } from './common-dao';
import { refTypes } from './ref-types';
import firebase from '../util/firebase';
import { mapResponse } from '../util/firebase-mapper';

const fetchUpcomingAndLastPlayed = () => { // TODO error handling
    return new Promise((resolve, reject) => {
        Promise.all([fetchAllLastPlayed(5), fetchAllUpcoming(1)])
            .then(responses => {
                const lastPlayed = responses[0];
                const upcoming = responses[1];
                resolve(lastPlayed.concat(upcoming));
            })
    });
}

const fetchAllLastPlayed = async limit => { // TODO asi uplne nefunguje to razeni + potrebna podminka where datum
    let builder = firebase.database().ref(refTypes.match)
        .orderByChild('datetime');

    if (limit) {
        builder = builder.limitToLast(5);
    }

    const res = await builder.once('value');
    const matches = mapResponse(res);
    return appendTeamDetails(matches.reverse());
}

const fetchAllUpcoming = async limit => { // TODO asi uplne nefunguje to razeni + potrebna podminka where datum
    let builder = firebase.database().ref(refTypes.match)
        .orderByChild('datetime');

    if (limit) {
        builder = builder.limitToLast(1);
    }

    const res = await builder.once('value');
    const matches = mapResponse(res);
    return appendTeamDetails(matches.reverse());
}

const fetchAll = () => {
    return new Promise((resolve, reject) => {
        //Promise.all([fetchAllLastPlayed(), fetchAllUpcoming()])
        Promise.all([fetchAllLastPlayed(), []])
            .then(responses => {
                const lastPlayed = responses[0];
                const upcoming = responses[1];
                resolve(lastPlayed.concat(upcoming));
            })
    });
};

const fetchMatchById = async id => {
    return fetchById(refTypes.match, id)
        .then(async res => {
            const list = [];
            list.push(res.val());
            const matchWithDetails = await appendTeamDetails(list);
            return matchWithDetails[0];
    });
};

const addMatch = (home, away, place, datetime) => {
    let ref = firebase.database().ref(refTypes.match),
        newRef = ref.push();

    newRef.set({home, away, place, datetime});
    return newRef;
};

const appendTeamDetails = async matches => {
    const teams = await fetchList(refTypes.team);
    matches.forEach(match => {
        const homeTeam = teams.filter(team => team.id === match.home)[0];
        const awayTeam = teams.filter(team => team.id === match.away)[0];
        match.homeTeamName = homeTeam.name;
        match.homeTeamLogo = homeTeam.logo;
        match.awayTeamName = awayTeam.name;
        match.awayTeamLogo = awayTeam.logo;
    });
    return matches;
};

export {
    fetchUpcomingAndLastPlayed,
    fetchAllLastPlayed,
    fetchAllUpcoming,
    fetchAll,
    addMatch,
    fetchMatchById
}