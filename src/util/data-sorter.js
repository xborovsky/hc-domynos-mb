export const sortData = (data, sortByColumn, sortAsc) => {
    const dataCopy = [...data];

    dataCopy.sort((item1, item2) => {
        if (sortAsc) {
            return item1[sortByColumn] < item2[sortByColumn] ? -1 :
                item1[sortByColumn] > item2[sortByColumn] ? 1 :
                0;
        } else {
            return item1[sortByColumn] < item2[sortByColumn] ? 1 :
                item1[sortByColumn] > item2[sortByColumn] ? -1 :
                0;
        }
    });

    return dataCopy;
};