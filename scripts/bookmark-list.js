
const bookmarkList = (function() {

    const addBookmarkForm = `
    <form id="add-bookmark-form">
        <label for="bookmark-title">Title</label>
            <input type="text" name="bookmark-title" class="js-bookmark-title" placeholder="Title">
        <label for="bookmark-url">Url</label>
            <input type="text" name="bookmark-url" class="js-bookmark-url" placeholder="https://thinkful.com">
        <label for="bookmark-des">Description</label>
            <textarea rows="4" cols="50" name="bookmark-desc" class="js-bookmark-desc" placeholder="Website description."></textarea>            
        <select id="select-rating">
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
        </select>
        <button type="submit">Add bookmark</button>
        <button id ="cancel-bookmark">cancel</button>
    </form>
    `;

    const bookmarkListButtons = `
    <button id="add-bookmark">Add</button>
    <label for="rating-select">Sort by</label>
    <select name="rating-select" id="select-sort-type">
        <option value="" selected disabled hidden>Rating</option>
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
    </select>
    `;

    const generateHtml = (bookmark) => {
        let rating = [];
        for(let i = 0; i < bookmark.rating; i++) {
            rating.push('checked');
        }

        return `
            <li class="js-bookmark" data-bookmark-id="${bookmark.id}">
                <h3><a href="${bookmark.url}">${bookmark.title}</a></h3>
                <div class="rating">
                    <span id="1" class="fa fa-star ${rating[0]}"></span>
                    <span id="2" class="fa fa-star ${rating[1]}"></span>
                    <span id="3" class="fa fa-star ${rating[2]}"></span>
                    <span id="4" class="fa fa-star ${rating[3]}"></span>
                    <span id="5" class="fa fa-star ${rating[4]}"></span>
                </div>
                <div id="${bookmark.id}" class="hidden">
                    <a class="bookmark-link" href="${bookmark.url}">${bookmark.url}</a>
                    <form id="description-form">
                    <textarea class="margin js-desc-form" rows="4" cols="50">${bookmark.desc}</textarea>
                    <button type="submit">Edit description</button>
                    </form>
                    <button id="delete-bookmark">Delete</button>
                </div>
                <button class="toggle-extended-button">show more</button>
            </li>
        `
    }

    const generateBookmarksString = (bookmarkList) => {
        const bookmarks = bookmarkList.map(bookmark => generateHtml(bookmark));
        return bookmarks.join('');
    }

    const getItemIdFromElement = (bookmark) => {
        return $(bookmark).closest('.js-bookmark').data('bookmark-id');
    }

    const render = () => {
        if(store.error){
            $('.error-container').html(`<p>${store.error}</p>`)
            store.error = null;
        }

        if(store.addingBookmark) {
            $('.toggle-container').html(addBookmarkForm);
        } else {
            $('.toggle-container').html(bookmarkListButtons);
        }

        const sortedBookmarks = store.list.filter(bookmark => bookmark.rating >= store.listSortBy);
        const bookmarkString = generateBookmarksString(sortedBookmarks);
        $('.bookmark-list').html(bookmarkString);
    }

    const handleToggleAddingBookmark = () => {
        $('.toggle-container').on('click', '#add-bookmark', () => {
            store.toggleAddingBookmark();
            render();
        });
        $('.toggle-container').on('click', '#cancel-bookmark', () => {
            store.toggleAddingBookmark();
            render();
        });
    }

    const handleAddBookmark = () => {
        $('.toggle-container').on('submit', '#add-bookmark-form', event => {
            event.preventDefault();
            const title = $('.js-bookmark-title').val();
            const url = $('.js-bookmark-url').val();
            const desc = $('.js-bookmark-desc').val();
            const rating = $('#select-rating').val();
            const bookmark = Bookmark.create(title, url, desc, rating);
            dataBase.createBookmark(bookmark, function(responseObject) {
                store.createBookmark(responseObject);
                store.toggleAddingBookmark();
                render();
            });
            
        })
    }

    const handleDeleteBookmark = () => {
        $('.bookmark-list').on('click', '#delete-bookmark', event => {
            const id = getItemIdFromElement(event.currentTarget);
            dataBase.deleteBookmark(id, function(){
                store.deleteBookmark(id);
                render();
            });
        });
    }

    const handletoggleExtendedBookmark = () => {
        $('.bookmark-list').on('click', '.toggle-extended-button', event => {
            const id = getItemIdFromElement(event.currentTarget);
            $(`#${id}`).toggleClass("hidden");
        });
    }

    const handleSortByRating = () => {
        $('.toggle-container').on('change', '#select-sort-type', () => {
            store.listSortBy = $('#select-sort-type').val();
            render();
        });
    }

    const handleEditBookmark = () => {
        $('.bookmark-list').on('click', '.fa-star', event => {
            const id = getItemIdFromElement(event.currentTarget);
            const newRating = {rating: event.currentTarget.id};
            dataBase.updateBookmark(id, newRating, function(responseObject) {
                store.updateBookmark(id, newRating);
                render();
            })
        });
        $('.bookmark-list').on('submit', '#description-form', event => {
            event.preventDefault();
            const id = getItemIdFromElement(event.currentTarget);
            const newDesc = {desc: $('.js-desc-form').val()}
            dataBase.updateBookmark(id, newDesc, function(responseObject) {
                store.updateBookmark(id, newDesc);
                render();
            })

        });
        // make an on click for the desc-form to render the submit button
    }

    const bindEventListeners = () => {
        handleToggleAddingBookmark();
        handleAddBookmark();
        handleDeleteBookmark();
        handletoggleExtendedBookmark();
        handleSortByRating();
        handleEditBookmark();
    }

    return {
        render,
        bindEventListeners,
    }

}());