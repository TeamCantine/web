const express = require("express");
const router = express.Router();
const pool = require("./connection");

/**
 * Gets all the dances
 */
router.get("/", (req, res, next) => {
    const name = req.query.name.trim();
    console.log("GET: " + req.query.name + "\n")
    const order = name.toUpperCase() === "ROLE_HEAD" ? " ORDER BY ID DESC " : ""

    pool
        .query('SELECT * FROM WRKJEXP.' + req.query.name.trim() + order)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.log('error');
            console.log(error);

        });

});

// SELECT DISTINCT(AS_USER) FROM  wrkjexp.ROLE_USER


router.get("/asusers", (req, res, next) => {
    console.log("GET: " + req.query.name + "\n")

    pool
        .query('SELECT * FROM  wrkjexp.ROLE_USER')
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(error => {
            console.log('error');
            console.log(error);

        });

});


router.post("/insertHead", (req, res, next) => {
    const head = req.body;
    pool
        .insertAndGetId('INSERT INTO WRKJEXP.ROLE_HEAD (CANTINA,TIPO_OP,OPERATOR,STATUS, DATE) VALUES(?,?,?,?,?)', [head.cantina, head.tipo_op, head.operator, head.status, head.date])
        .then(id => {
            console.log('Inserted new row with id ' + id);
            res.status(200).json(id);
        });

});


router.post("/insertRow", (req, res, next) => {
    const head = req.body;
    pool
        .insertAndGetId('INSERT INTO WRKJEXP.ROLE_ROW (HEAD_ID,ROW_TYPE,SUBJ_VASE,CODE_VASE,QUANTITY) VALUES(?,?,?,?,?)', [head.HEAD_ID, head.ROW_TYPE, head.SUBJ_VASE, head.CODE_VASE, head.QUANTITY])
        .then(id => {
            console.log('Inserted new row with id ' + id);
            res.status(200).json(id);
        });

});


router.post("/insertFids", (req, res, next) => {
    const head = req.body;
    console.log(head)
    pool
        .insertAndGetId('INSERT INTO WRKJEXP.ROLE_FIELD_LIST (FIELD,FIDES) VALUES(?,?)', [head.FIELD, head.FIDES])
        .then(id => {
            console.log('Inserted new row with id ' + id);
            res.status(200).json(id);
        });

});


/**
 * 
 */
router.delete("/deleteTaskHead", (req, res, next) => {
    console.log(req.body);
    const task = req.body;


    pool
        .update('DELETE FROM WRKJEXP.ROLE_ROW WHERE HEAD_ID=?', [task.id])
        .then(nUpdated => {
            console.log('Deleted ' + nUpdated + ' rows');

            pool
                .update('DELETE FROM WRKJEXP.ROLE_HEAD WHERE ID=?', [task.id])
                .then(nUpdated => {
                    console.log('Deleted ' + nUpdated + ' rows');
                    res.status(200).json(nUpdated);
                });

        });

});



router.delete("/deleteTaskRow", (req, res, next) => {
    console.log(req.body);
    const task = req.body;
    pool
        .update('DELETE FROM WRKJEXP.ROLE_ROW WHERE ID=?', [task.id])
        .then(nUpdated => {
            console.log('Deleted ' + nUpdated + ' rows');
            res.status(200).json(nUpdated);
        });

});








module.exports = router;