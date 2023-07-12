function createFilterStrings(isMovie, genresList, minRating, maxRating) {
    const genresText = "&with_genres=";
    const minRatingText = "&vote_average.gte=";
    const maxRatingText = "&vote_average.lte=";
    const type = isMovie ? 'movieGenres' : 'seriesGenres';

    let genreString;

    if (genresList[type].length === 0) {
        genreString = "";
    } else if (genresList[type].length === 1) {
        genreString = genresText + genresList[type][0];
    } else {
        const numbersToString = genresList[type].map((id) => id.toString());
        const joinedNumbers = numbersToString.join('%2C');
        genreString = genresText + joinedNumbers;
    }

    const ratingString = minRatingText + minRating + maxRatingText + maxRating;

    return [genreString, ratingString];
}

export default createFilterStrings;