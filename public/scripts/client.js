//axios

let bouton = document.getElementById("btn_new_tag")
let tags_collection = document.getElementById("tags")

bouton.onclick = addATag;


function addATag() {

    let value = document.getElementById('new_tag_name').value

    axios
        .post(`http://localhost:3000/sneakers/tag-add/${value}`)
        .then(axiosRes => {
            console.log(axiosRes.data)
            let to_add = document.createElement("option")
            to_add.setAttribute("value", axiosRes.data._id)
            to_add.innerHTML = "" + axiosRes.data.tag
            tags_collection.append(to_add)
        })
        .catch(err => console.log(err))
}

