const express = require('express');
const router = require('express-promise-router')();
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();
const sql_helper = require('./helpers/sql-helper');

const app = express();

app.use('/', router);

router.get('/ping', ping);

router.get('/joust/getall', getJoustes);
router.get('/joust/get/', getJoust);
router.post('/joust/add', jsonParser, addJoust);
router.post('/joust/remove', jsonParser, removeJoust);
router.get('/joust/start', jsonParser, startJoust);

async function ping(req, res)
{
    console.log(req.query);

    res.status(200).json({message: 'pong'})
}
//#region Joustes
async function getJoust(req,res)
{
    let result = [];
    const connection = sql_helper.createConnection();
    if(!req.query || req.query.id === undefined)
        res.status(404).json({message: 'Not found!'});
    let inserts = [req.query.id];
    result = await sql_helper.promiseSQL(connection, 'select * from joustes where id = ?', inserts);
    connection.end;
    res.status(200).json({joustes: result});
}

async function getJoustes(req,res)
{
    let result = [];
    const connection = sql_helper.createConnection();
    result = await sql_helper.promiseSQL(connection, 'select * from joustes', []);
    connection.end;
    res.status(200).json({joustes: result});
}

async function addJoust(req,res)
{
    const connection = sql_helper.createConnection();
    let inserts = [ req.body.type, 
                    req.body.name,
                    req.body.description,
                    req.body.created_by,
                    req.body.location,
                    req.body.date_start,
                    req.body.date_end,
                    0
                ];
    result = await sql_helper.promiseSQL(connection, 
        `insert into joustes 
        (type, name, description, created_by, 
        location, date_start, date_end, status) 
        values (?,?,?,?,?,?,?,?)`, inserts);
    connection.end;
    res.status(200).json({message: "Successfully added"});
}

async function removeJoust(req,res)
{
    const connection = sql_helper.createConnection();
    let inserts = [req.body.joust_id];
    result = await sql_helper.promiseSQL(connection, 'delete from joustes where id = ?', inserts);
    connection.end;
    res.status(200).json({message: "Successfully removed"});
}

async function startJoust(req,res)
{
    const connection = sql_helper.createConnection();
    let inserts = [req.query.id];
    result = await sql_helper.promiseSQL(connection, 'select user_id from attendees where joust_id = ?', inserts);

    connection.end;
    res.status(200).json({message: "Successfully removed"});
}
//#endregion

//#region Competitions
async function getThemes(req,res)
{
    let result = [];
    const connection = sql_helper.createConnection();
    let inserts = [req.body.category_id]
    result = await sql_helper.promiseSQL(connection, 'select t.id, t.name, t.description from themes t inner join themes_to_categories ttc on ttc.theme_id = t.id AND ttc.uc_id = ?', inserts);
    connection.end;
    res.status(200).json({user_categories: result});
}

async function addTheme(req,res)
{
    const connection = sql_helper.createConnection();

    let inserts = [req.body.name, req.body.description];
    result = await sql_helper.promiseSQL(connection, 'insert into themes (name, description) values (?,?)', inserts);
    
    inserts = [req.body.category_id, result.insertId];
    result = await sql_helper.promiseSQL(connection, 'insert into themes_to_categories (uc_id, theme_id) values (?,?)', inserts);
    
    connection.end;
    res.status(200).json({message: "Successfully added"});
}

async function removeTheme(req,res)
{
    const connection = sql_helper.createConnection();
    let inserts = [req.body.theme_id];
    result = await sql_helper.promiseSQL(connection, 'delete from themes where id = ?', inserts);
    connection.end;
    res.status(200).json({message: "Successfully removed"});
}
//#endregion


//#region Users



//#endregion

//#region Non API

async function createOlympic(attendees, joust_id)
{
    let power = Math.log2(attendees.length);
    if(power === Math.round(power))
    {
        while(power > 1)
        {
            for(let i = 0; i < (power ** 2) - 1; i+=2)
            {
                let insert = [];
                await sql_helper.promiseSQL(connection, 'insert into', []);
            }
        }        
    }
}

//#endregion

const start = function(callback) {
    app.listen(process.env.API_PORT || 1000, function () {
        console.log(`API service is listening on port ${this.address().port}`);
        if (callback) {
            callback();
        }
    })
}

module.exports = {
    start
}