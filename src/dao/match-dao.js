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
    return matches.reverse();
}

const fetchAllUpcoming = async limit => { // TODO asi uplne nefunguje to razeni + potrebna podminka where datum
    let builder = firebase.database().ref(refTypes.match)
        .orderByChild('datetime');

    if (limit) {
        builder = builder.limitToLast(1);
    }

    const res = await builder.once('value');
    const matches = mapResponse(res);
    return matches.reverse();
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

const addMatch = (home, away, homeScore, awayScore, isSo, place, datetime) => {
    let ref = firebase.database().ref(refTypes.match),
        newRef = ref.push();

    newRef.set({home, away, homeScore, awayScore, isSo, place, datetime});
    return newRef;
};

export {
    fetchUpcomingAndLastPlayed,
    fetchAllLastPlayed,
    fetchAllUpcoming,
    fetchAll,
    addMatch
}