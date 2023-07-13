function createListsArray(id, specificList) {
    const isIdPresent = specificList.find((listItem) => {
        return id === listItem;
    });

    const listsArray = [...specificList];

    if (isIdPresent) {
        const indexNumberOf = listsArray.indexOf(id);
        listsArray.splice(indexNumberOf, 1);
        return listsArray;
    } else {
        listsArray.push(id);
        return listsArray;
    }
}

export default createListsArray;