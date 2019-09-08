const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const tagModel = require("../models/tag.js")
const sneakerModel = require("../models/Sneaker");
const fileUploader = require("../config/cloudinary");
// const middleware = require("../config/cloudinary");

router.post("/prod-add", fileUploader.single("sneaker_image"), (req, res) => {

    console.log("-------the file ? -------")
    console.log("-------------------------")

    const {
        sneaker_name,
        sneaker_ref,
        sneaker_size,
        sneaker_descr,
        sneaker_price,
        sneaker_category,
        sneaker_id_tag
    } = req.body

    sneakerModel.findOne({ sneaker_name: req.body.sneaker_name })
        .then((dbRes) => {

            if (dbRes) console.log("y'en a deja un deso")
            else {
                if (req.file) sneaker_image = req.file.secure_url
                else sneaker_image = "/images/default.jpg";

                sneakerModel.create({
                    sneaker_name,
                    sneaker_ref,
                    sneaker_size,
                    sneaker_descr,
                    sneaker_price,
                    sneaker_image,
                    sneaker_id_tag,
                    sneaker_category
                })
            }
        })
        .catch(() => console.log("ça ne marche pas"))
    res.render("products_add")
})


router.get("/prod-add", (req, res) => {
    tagModel
        .find()
        .then((dbRes) => {
            console.log(dbRes)
            res.render("products_add",
                {
                    scripts: ["client.js"],
                    tags: dbRes
                })
        })
        .catch(err => console.log(err));
})

router.get("/prod-manage", (req, res) => {

    sneakerModel
        .find()
        .then((dbres) => {
            res.render("products_manage", {

                scripts: ['delete.js'],
                sneakers: dbres
            })
        })
        .catch(() => console.log("nada"))

    console.log("tu es dans le prod manage")
})


router.delete("/delete/:id", (req, res) => {

    sneakerModel
        .remove({ _id: req.params.id })
        .then(() => res.send("sneaker deleted"))
        .catch((err) => console.log(err))

})



router.get("/collection", (req, res) => {

    sneakerModel
        .find()
        .then(dbsneakers => {

            tagModel
                .find()
                .then(dbtags => {

                    res.render("products",

                        {
                            sneakers: dbsneakers,
                            tags: dbtags,
                            scripts: ['getbytag.js']
                        }
                    )
                })
                .catch(err => console.log(err))

        })
        .catch(() => console.log("nada"))
});

router.get("/:cat", (req, res) => {

    sneakerModel
        .find({ sneaker_category: req.params.cat })
        .then((dbres) => {
            res.render("products", { sneakers: dbres })
        })
        .catch(() => console.log("nada"))

});


router.post("/tags/:id", (req, res) => {

    console.log("you tried to get shoes by id")
    sneakerModel
        .find({ sneaker_id_tag: req.params.id })
        .then((dbres) => {
            console.log("the tag exists")
            res.send(dbres)
        })
        .catch(() => console.log("cannot find id of tag"))
    // sneakerModel
    //     .find({ _id: req.params.id })
    //     .then(dbres => res.send({ tags: dbres }))
    //     .catch(err => console.log(err))

});

router.post("/tag-add/:tag", (req, res) => {

    let tag_to_add = req.params.tag.toLowerCase()

    tagModel.findOne({ tag: tag_to_add })
        .then((dbRes) => {

            if (dbRes) console.log("already exists: " + dbRes)
            else {
                tagModel
                    .create({ tag: tag_to_add })
                    .then(tags => res.send(tags))
                    .catch(err => console.log(err))
            }
        })
        .catch((err) => console.log(err));


})


router.get("/one-product/:id", (req, res) => {

    sneakerModel
        .findById(req.params.id)
        .then((dbRes) => {
            res.render("one_product", dbRes);
        })
        .catch(err => console.log(err))
});


router.get("/product-edit/:id", (req, res) => {

    sneakerModel
        .findById({ _id: req.params.id })
        .then((dbres) =>
            res.render("product_edit", dbres)
        )
        .catch(err => console.log(err))

});



module.exports = router;