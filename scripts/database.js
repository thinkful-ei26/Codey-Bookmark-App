
const dataBase = (function() {

    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/codey';

    const createBookmark = (bookmark, callback) => {
        const endpoint = BASE_URL + '/bookmarks';
        bookmark = JSON.stringify(bookmark);
        $.ajax({
            url: endpoint,
            method: 'POST',
            contentType: 'application/json',
            data: bookmark,
            success: callback,
            error: errorCallback,
        })
    }

    const readBookmarks = (callback) => {
        const endpoint = BASE_URL + '/bookmarks';
        $.getJSON(endpoint, callback);
    }

    const updateBookmark = (id, updatedData, callback) => {
        const endpoint = BASE_URL + '/bookmarks/' + id;
        $.ajax({
            url: endpoint,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: callback,
            error: errorCallback,
        })
    }

    const deleteBookmark = (id, callback) => {
        const endpoint = BASE_URL + '/bookmarks/' + id;
        $.ajax({
            url: endpoint,
            method: 'DELETE',
            contentType: 'application/json',
            success: callback,
            error: errorCallback,
        })
    }

    const errorCallback = (err) => {
        store.error = err.responseJSON.message;
        bookmarkList.render();
    }

    return {
        createBookmark,
        readBookmarks,
        updateBookmark,
        deleteBookmark,
        errorCallback,
    }
}());