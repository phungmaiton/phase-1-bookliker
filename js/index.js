const list = document.querySelector('#list')
const panel = document.querySelector('#show-panel')

fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(bookObject => bookObject.forEach(book => renderBook(book)))

const renderBook = (book) => {
    const li = document.createElement('li');
    li.textContent = book.title;
    list.append(li);
    const bookid = book.id;

    li.addEventListener('click', () => {
        const bookid = book.id;
        panel.innerHTML = "";
        const img = document.createElement('img');
        img.src = book.img_url;
        
        const title = document.createElement('h2');
        title.textContent = book.title;
        
        const subtitle = document.createElement('h3');
        subtitle.textContent = book.subtitle;
        
        const author = document.createElement('h3');
        author.textContent = book.author;
        
        const description = document.createElement('p');
        description.textContent = book.description;
        
        const likerList = document.createElement('ul')

        const userObject = book.users;

        userObject.forEach(user => {
            const liker = document.createElement('li');
            liker.textContent = user.username;
            likerList.appendChild(liker);
        })

        const likeButton = document.createElement('button');
        likeButton.textContent = "LIKE";

        panel.append(img, title, subtitle, author, description, likerList, likeButton)

        likeButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/books/${bookid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "users": [...book.users, { "id": 1, "username": "pouros"}]  
                })
            })
            .then(resp => resp.json())
            .then(newLiker => {
                newLiker = document.createElement('li');
                newLiker.textContent = "pouros";
                likerList.append(newLiker)
            })

        })
    })

}