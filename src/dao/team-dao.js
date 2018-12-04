import { refTypes } from './ref-types';
import { fetchList } from './common-dao';

export const fetchTeamsForSelect = async () => {
    return await fetchList(refTypes.team)
        .then(teams => {
            const result = [{value : null, text : null}];
            teams.forEach(team => {
                result.push({ value : team.id, text : team.name });
            });
            return result;
        });
};

export const fetchAll = async () => {
    return await fetchList(refTypes.team);
};