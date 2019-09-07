const tbody = document.querySelector("tbody")

tbody.addEventListener('click', remove)

function remove(e) {

    if (e.target.classList.contains("fa-trash")){
        
        let id_db = e.target.getAttribute('data-id-sneaker')
        let row = e.target.parentNode.parentNode
        console.log(row)

        axios
            .delete(`http://localhost:3000/sneakers/delete/${id_db}`)
            .then(() => {
                console.log("yoooo")
                row.remove()
            })
            .catch(err => {
                console.log("oh nooooo")
                console.log(err)
            });
        
        console.log(e.target);
        

    };
    // let id_db = 
    // axios

}