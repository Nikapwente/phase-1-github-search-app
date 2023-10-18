document.addEventListener("DOMContentLoaded", () => {


    let form = document.getElementById('github-form');
    form.addEventListener('submit', getUsername);

    function getUsername(event) {
        event.preventDefault();
        let search = event.target[0].value; 
        loadUsers(search);
    }





    function loadUsers(userName) {
        fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(response => response.json())
        .then(function (data) {
                let object = data.items;
                let userList = document.getElementById('user-list');
                let repoList = document.getElementById('repos-list');
                for (key in object) {
                    let userNameResults = object[key]["login"]

                    listItem = document.createElement('li');
                    listItem.textContent = `${userNameResults}`;
                    userList.append(listItem);
                    listItem.addEventListener("click", loadRepos);

                    function loadRepos (event) {
                        userName = event.target.textContent;
                        fetch(`https://api.github.com/users/${userName}/repos`)
                        .then(response => response.json())
                        .then(function (repos) {
                            repos.forEach(function(contents) {
                                let userRepos = contents.name;
                                listItem = document.createElement('li');
                                listItem.textContent = `${userRepos}`;
                                repoList.append(listItem);
                            })

                        })
                    }


                }
           
                         
            
        })
    }




})