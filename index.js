const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let loadButtonEl;
let albumsDivEl;
let commentsDivEl;
let postDivEl;
let photosDivEl;
let albumDivEl;

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const buttonEl = document.createElement('button');
        buttonEl.textContent = post.title;

        const pEl = document.createElement('p');
        pEl.appendChild(buttonEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));

        //create attribute
        const postIdAttr = post.id;
        buttonEl.setAttribute('post-id', postIdAttr);
        buttonEl.addEventListener('click', onLoadPost);
        buttonEl.addEventListener('click', onLoadComments);


        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPostsReceived() {
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById('post').style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    document.getElementById("album").style.display = 'none';

    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createPost(posts) {
    const pEl = document.createElement('p');
        // creating paragraph
     for (let i = 0; i < posts.length; i++) {
         const post = posts[i];
         const strongEl = document.createElement('strong');
         strongEl.textContent = post.title;
         const bodyEl = document.createElement('p');
         bodyEl.textContent = post.body;

         pEl.appendChild(strongEl);
         pEl.appendChild(bodyEl);
     }
        return pEl;
}

function onPostReceived() {
    postDivEl.style.display = 'block';
    const text = this.responseText;
    const posts = JSON.parse(text);
    const divEl = document.getElementById('post-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPost(posts));
}

function onLoadPost() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("album").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById('posts').style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    const el = this;
    const postId = el.getAttribute('post-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostReceived);
    xhr.open('GET', BASE_URL + '/posts?id=' + postId);
    xhr.send();
}

function createComments(comments) {
    const ulEl = document.createElement('ul');

    for(let i = 0; i < comments.length; i++) {
        const comment = comments[i];


        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.name;
        const cEl = document.createElement('p');
        cEl.textContent = comment.body;
        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(cEl);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);
        ulEl.appendChild(liEl);
    }
    return ulEl;

}

function onCommentsReceived() {
    commentsDivEl.style.display = 'block';

    const text = this.responseText;
    const comments = JSON.parse(text);

    const divEl = document.getElementById('comments-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createComments(comments));
}

function onLoadComments() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("album").style.display = 'none';
    document.getElementById("posts").style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    const el = this;
    const postId = el.getAttribute('post-id');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const albumsTdEl = document.createElement('td');
    albumsTdEl.textContent = 'Albums'

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(albumsTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        // creating album cell
        const dataUserIdAttr2 = document.createAttribute('data-user-id');
        dataUserIdAttr2.value = user.id;

        const albumButtonEl = document.createElement('button');
        albumButtonEl.textContent = 'Albums';
        albumButtonEl.setAttributeNode(dataUserIdAttr2);
        albumButtonEl.addEventListener('click', onLoadAlbums);

        const albumTdEl = document.createElement('td');
        albumTdEl.appendChild(albumButtonEl);


        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(albumButtonEl);
        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

function createAlbumsList(albums) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = album.title;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);

        const albumIdAttr = document.createAttribute('album-id');
        albumIdAttr.value = album.id;
        strongEl.setAttributeNode(albumIdAttr);
        strongEl.setAttribute('class', 'link');

        strongEl.addEventListener('click', onLoadAlbum);
        strongEl.addEventListener('click', onLoadPhotos);

    }

    return ulEl;
}


function onAlbumsReceived() {
    albumsDivEl.style.display = 'block';

    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('albums-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumsList(albums));
}


function onLoadAlbums() {
    document.getElementById("posts").style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById("post").style.display = 'none';
    document.getElementById("album").style.display = 'none';

    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}

function createAlbum(albums) {
    const pEl = document.createElement('p');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const strongEl = document.createElement('h2');
        strongEl.textContent = album.title;

        pEl.appendChild(strongEl);
    }

    return pEl;
}

function onAlbumReceived() {
    albumDivEl.style.display = 'block';
    const text = this.responseText;
    const albums = JSON.parse(text);
    const divEl = document.getElementById('album-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbum(albums));
}

function onLoadAlbum() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById('posts').style.display = 'none';
    document.getElementById('post').style.display = 'none';
    const el = this;
    const albumId = el.getAttribute('album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumReceived);
    xhr.open('GET', BASE_URL + '/albums?id=' + albumId);
    xhr.send();
}

function createPhotos(photos) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < photos.length; i++){
        const photo = photos[i];

        const photoEl = document.createElement('img');
        photoEl.setAttribute('src', photo.url);
        photoEl.setAttribute('width', '200');

        ulEl.appendChild(photoEl);
    }

    return ulEl;
}

function onPhotosReceieved() {
    photosDivEl.style.display ='block';
    const text = this.responseText;
    const photos = JSON.parse(text);
    const divEl = document.getElementById('photos-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPhotos(photos));
}

function onLoadPhotos() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById('posts').style.display = 'none';
    document.getElementById('post').style.display = 'none';
    const el = this;
    const albumId = el.getAttribute('album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPhotosReceieved);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    albumsDivEl = document.getElementById('albums');
    commentsDivEl = document.getElementById('comments');
    loadButtonEl = document.getElementById('load-users');
    postDivEl = document.getElementById('post');
    photosDivEl = document.getElementById('photos');
    albumDivEl = document.getElementById('album');
    loadButtonEl.addEventListener('click', onLoadUsers);

});

