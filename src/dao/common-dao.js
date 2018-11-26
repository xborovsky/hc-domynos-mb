import firebase from '../util/firebase';
import { mapResponse } from '../util/firebase-mapper';

export const fetchList = async (refType) => {
    if (!refType) {
        throw new Error("Invalid DAO data type!");
    }

    const res = await firebase.database().ref(refType)
        .once('value');
    return mapResponse(res);
};

export const deleteById = async (refType, id) => {
    return await firebase.database().ref(refType)
        .child(id)
        .remove();
};