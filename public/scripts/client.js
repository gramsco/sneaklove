//axios

let bouton = document.getElementById("btn_new_tag")


bouton.onclick = addATag;


function addATag() {
    
    let value = document.getElementById('new_tag_name').value
    console.log(value)

    axios
        .post(`http://localhost:3000/sneakers/tag-add/${value}`)
        .then(axiosRes => console.log("it works" + axiosRes.data))
        .catch(err => console.log(err))
}

