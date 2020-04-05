const express = require('express');
const router = express.Router();
const conn = require('../db/database');

router.get('/surat_masuk', (req, res) => {
    let dateFormat = 'DATE_FORMAT(tanggal_surat, \"%a, %d %b %Y\")';
    let sql = "SELECT *, "+dateFormat+"as tanggalSurat FROM tbl_s_masuk";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        //console.log(results);
        res.render('s_masuk', {
            results: results,
            title: "surat masuk"
        });
    });
});

router.get('/surat_masuk/detil/:id', (req, res) => {
    let sql = `SELECT * FROM tbl_s_masuk WHERE ID= ${req.param.id}`
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('detil_surat_masuk', {
            results: results
        });
    });
});

//route untuk insert data
router.post('/surat_masuk/save', (req, res) => {
    let data = {
        no_surat: req.body.no_surat,
        tanggal_surat: req.body.tanggal_surat,
        asal_surat: req.body.asal_surat,
        perihal: req.body.perihal
    };
    let sql = "INSERT INTO tbl_s_masuk SET ?";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route untuk update data
router.post('/surat_masuk/update', (req, res) => {
    let sql = "UPDATE tbl_s_masuk SET no_surat='" + req.body.no_surat + "', tanggal_surat='" + req.body.no_surat + "', asal_surat='" + req.body.asal_surat + "', perihal='" + req.body.perihal + "' WHERE id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route untuk delete data
router.post('/delete', (req, res) => {
    let sql = "DELETE from tbl_s_masuk WHERE id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});


module.exports = router;