const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

//connection
router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signin", (req, res) => {
    
    const { email, password } = req.body;
    userModel
        .findOne({ email })
        .then((dbres) => {

            if (dbres) {
                
                if (dbres.password == password) { // to change with encryption
                    console.log("youpi")
                    console.log(res.session)
                    req.session.currentUser = req.body;
                    res.redirect("/")
                }  
                else {
                    console.log("wrong password")
                    res.redirect("/signin")
                }
             
            } else {
                console.log("ERROR: wrong password and/or email address")
                res.redirect("/signin")
            }

        })
        .catch((err) => console.log(err))
    
})


//registration
router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res) => {
    
    const { firstname, lastname, email, password } = req.body

    userModel
        .findOne({ email }) 
        .then((dbres) => {

            if (dbres) {
                console.log(dbres.firstname + " already exists")
                console.log("mail already exists")
                res.redirect("/signup")
            }
            else {
                userModel
                    .create({
                        firstname,
                        lastname,
                        email,
                        password
                    })
                    .then(() => console.log("all good"))
                    .catch(() => console.log('all bad'))

                res.redirect("/")
            }

        })
        .catch((err) => console.log(err))

});

router.get("/logout", (req, res) => {
    
    req.session.destroy()
    res.redirect("/")

})


module.exports = router;
