const express = require("express");
const Fruit = require("../models/fruit");

// Create Router
const router = express.Router();

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

////////////////////////////////////////////
// Seed route
////////////////////////////////////////////
router.get("/seed", (req, res) => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "yellow", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ];

    // Delete all fruits OBJECT IS A FILTER, empty object means find everything
    Fruit.deleteMany({}).then((data) => {
        // Seed Starter Fruits
        Fruit.create(startFruits).then((data) => {
            // send created fruits as response to confirm creation
            res.json(data);
        });
    }).catch((err) => {
        res.status(400).send(err)
    })
});
// Index
router.get('/', (req, res) => {
    Fruit.find({})
        .then((fruits) => {
            res.render("fruits/Index", { fruits })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})

// NEW ROUTE
router.get("/new", (req, res) => {
    res.render("fruits/New");
});

// DELETE
router.delete('/fruits/:id', (req, res) => {
    const { id } = req.params;
    Fruit.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/fruits')
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
})

// UPDATE
router.put('/:id', (req, res) => {
    const { id } = req.params;
    // massage data
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    //New: true means it returns the NEW document with changes
    Fruit.findByIdAndUpdate(id, req.body, { new: true })
        .then(() => {
            res.redirect(`/fruits/${id}`)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})

// CREATE
router.post("/", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // create the New fruit
    Fruit.create(req.body)
        .then((fruits) => {
            // redirect user to Index page if successfully created item
            res.redirect("/fruits");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

// EDIT
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    Fruit.findById(id)
        .then((fruit) => {
            res.render('fruits/Edit', { fruit })
        })
        .catch((error) => {
            res.send(400).json({ error })
        })
})

// SHOW ROUTE
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;

    // find the particular fruit from the database
    //.then and .catch replace an if/else statement
    Fruit.findById(id)
        .then((fruit) => {
            // render the template with the data from the database
            res.render("fruits/Show", { fruit });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

// Export the Router
module.exports = router