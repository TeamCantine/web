const express = require("express");
const router = express.Router();
const pool = require("./connection");

/**
 * Gets all the dances
 */
router.get("/", (req, res, next) => {
    console.log("GET: " + req.query.name + "\n")
    pool
        .query('SELECT * FROM WRKJEXP.' + req.query.name.trim())
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.log('error');
            console.log(error);

        });

});





module.exports = router;