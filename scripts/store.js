
const store = (function() {
    
    const createBookmark = function(bookmark) {
        this.list.push(bookmark);
    }

    const readBookmark = function(id) {
        return store.list.find(bookmark => bookmark.id === id);
    }

    const updateBookmark = function(id, updatedData) {
        const bookmark = readBookmark(id);
        Object.assign(bookmark, updatedData);
    }

    const deleteBookmark = function(id) {
        this.list = this.list.filter(bookmark => bookmark.id !== id);
    }

    const toggleAddingBookmark = function() {
        this.addingBookmark = !this.addingBookmark;
    }

    return {
        list: [],
        addingBookmark: false,
        listSortBy: 1,
        error: null,

        createBookmark,
        readBookmark,
        updateBookmark,
        deleteBookmark,
        toggleAddingBookmark,
    }

}());