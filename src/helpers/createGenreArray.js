function createGenreArray(id, genresList) {
    const isIdPresent = genresList.find((genre) => {
        return id === genre;

    });

    const genresArray = [...genresList];

    if (isIdPresent) {
        const indexNumberOf = genresArray.indexOf(id);
        genresArray.splice(indexNumberOf, 1)
        return genresArray
    } else {
        genresArray.push(id);
        return genresArray;
    }
}

export default createGenreArray;