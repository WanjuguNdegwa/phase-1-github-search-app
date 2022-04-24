document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form#github-form');
    const usersList = document.querySelector('ul#user-list');
    const reposList = document.querySelector('ul#repos-list');

    const userSearchEndpoint = 'https://api.github.com/search/users?q=';
    const userReposEndpoint = 'https://api.github.com/users/'

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.querySelector('input#search').value;

        fetch(userSearchEndpoint + query, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                usersList.replaceChildren();
                reposList.replaceChildren();

                res.items.forEach((user) => {
                    const li = document.createElement('li');
                    li.innerText = user.login

                    li.addEventListener('click', (e) => {
                        fetchRepos(user.login);
                    })

                    usersList.appendChild(li);
                })
            })

    });

    function fetchRepos(user) {
        fetch(userReposEndpoint + `${user}/repos`, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                reposList.replaceChildren();
                res.forEach((repo) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    `

                    reposList.appendChild(li);
                })
            })
    }
})