let wrapper = document.querySelector(".tag-wrapper");
let grid = document.getElementById('products_grid');

wrapper.onclick = findTag

    
function findTag(e) {
    
    if (e.target.nodeName == "INPUT") {
        
        console.log(`you're gonna b lookin for id ${e.target.getAttribute("data-tag-id")}`)
        axios
            .post(`http://localhost:3000/sneakers/tags/${e.target.getAttribute("data-tag-id")}`)
            .then(res => {

                console.log(res.data)

                res.data.forEach(element => {
                    let div = document.getElementById(element._id)
                    console.log(div)
                    if (e.target.checked) div.style.display = "inherit"
                    else div.style.display = "none"
                });
            })     
            .catch(err => console.log(err))
    }
}