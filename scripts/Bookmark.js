
const Bookmark = (function() {

    const create = (title, url, desc, rating) => {
        return {
            id: cuid(),
            title,
            url,
            desc,
            rating,
        }
    }

    return {
        create,
    }

}());