
$(document).ready(function() {
    bookmarkList.bindEventListeners();
    bookmarkList.render();

    // get bookmarks from DB
    dataBase.readBookmarks( bookmarks => {
        bookmarks.forEach(bookmark => {
            store.createBookmark(bookmark);
            bookmarkList.render();
        });
    })
}());




