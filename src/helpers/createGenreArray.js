import React from "react";

function createGenreArray(id, genresList) {
    const isIdPresent = genresList.find((genre) => {
        return id === genre;

    });

    const genresArray = [...genresList];

    if (isIdPresent) {
        const indexNumberOf = genresArray.indexOf(id);
        return genresArray.splice(indexNumberOf, 1);

    } else {

        genresArray.push(id);
        return genresArray;

    }

}

export default createGenreArray;