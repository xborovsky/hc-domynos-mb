export const mapResponse = (response) => {
    const data = response.val();
    let mapped = [];

    if (data) {
        Object.keys(data).forEach(dataId => {
            mapped.push({id : dataId, ...data[dataId]});
        });
    }

    return mapped;
};