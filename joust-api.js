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

router.get('/competitions/get/', getCompetition);
router.get('/competitions/getall', getCompetitions);
router.post('/competitions/update', jsonParser, updateCompetition);

async function ping(req, res)
{
    console.log(req.query);

    res.status(200).json({message: 'pong'})
}
//#region Joustes
async function getJoust(req,res)
{
    let result = [];
    let comps = [];
    const connection = sql_helper.createConnection();
    if(!req.query || req.query.id === undefined)
        res.status(404).json({message: 'Not found!'});
    let inserts = [req.query.id];
    result = await sql_helper.promiseSQL(connection, 'select * from joustes where id = ?', inserts);
    comps = await sql_helper.promiseSQL(connection, 'select * from competitions where joust_id = ?', inserts);
    connection.end;
    result[0].copmetitions = comps;
    res.status(200).json({joust: result[0]});
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
    let res_message = "";
    const connection = sql_helper.createConnection();
    let inserts = [req.query.id];
    let joust_service_info = await sql_helper.promiseSQL(connection, 'select type, status from joustes where id = ?', inserts);
    let attendees = await sql_helper.promiseSQL(connection, 'select user_id from attendees where joust_id = ?', inserts);
    if(joust_service_info[0].status == 0)
    {
        let type = "";
        let success = false;
        switch(joust_service_info[0].type)
        {
            case 0:
                console.log("Create circle");
                type = "circle";
                success = await createCircle(connection, attendees, req.query.id);
                break;
            case 1:
                console.log("Create olympic");
                type = "olympic";
                success = await createOlympic(connection, attendees, req.query.id);
                break;
        }
        if(success)
        {
            //await sql_helper.promiseSQL(connection, 'update joustes set status = 1 where id = ?', inserts);
            res_message = "Successfully created " + type + " system!";
        }
        else
        {
            res_message = "Error with start!";
        }
    }
    else
    {
        res_message = "Joust is started already!"
    }
    connection.end;
    res.status(200).json({message: res_message});
}
//#endregion

//#region Competitions

async function getCompetition(req,res)
{
    let result = [];
    let comps = [];
    const connection = sql_helper.createConnection();
    if(!req.query || req.query.id === undefined)
        res.status(404).json({message: 'Not found!'});
    let inserts = [req.query.id];
    result = await sql_helper.promiseSQL(connection, 'select * from competitions where id = ?', inserts);
    connection.end;
    res.status(200).json({copmetition: result[0]});
}

async function getCompetitions(req,res)
{
    let result = [];
    const connection = sql_helper.createConnection();
    if(!req.query || req.query.id === undefined)
        res.status(404).json({message: 'Not found!'});
    let inserts = [req.query.id];
    result = await sql_helper.promiseSQL(connection, 'select * from competitions where joust_id = ?', inserts);
    connection.end;
    res.status(200).json({copmetitions: result});
}

async function updateCompetition(req,res)
{
    let result = [];
    let comps = [];
    const connection = sql_helper.createConnection();
    let inserts = [
        req.body.description,
        req.body.date_start,
        req.body.date_end,
        req.body.status,
        req.body.id
    ];
    result = await sql_helper.promiseSQL(connection, 'update competitions set description = ?, date_start = ?, date_end = ?, status = ? where id = ?', inserts);
    connection.end;
    res.status(200).json({message: "Successfully updated!"});
}

//#endregion


//#region Users



//#endregion

//#region Non API

async function createOlympic(connection, attendees, joust_id)
{
    let power = Math.log2(attendees.length);
    let first_stage = true;
    if(power === Math.round(power) && power > 0)
    {
        while(power > 0)
        {
            for(let i = 0; i < (2 ** power) - 1; i+=2)
            {
                if(first_stage)
                {
                    let inserts = [joust_id, attendees[i].user_id, attendees[i+1].user_id, 0, power];
                    await sql_helper.promiseSQL(connection, 'insert into competitions (joust_id, member1, member2, status, stage) values (?,?,?,?,?)', inserts);
                }
                else
                {
                    let inserts = [joust_id, 0, power];
                    await sql_helper.promiseSQL(connection, 'insert into competitions (joust_id, status, stage) values (?,?,?)', inserts);
                }
            }
            first_stage = false;
            power--;
        }
        return true;        
    }
    else
    {
        return false;
    }
}

async function createCircle(connection, attendees, joust_id)
{
    let count = attendees.length;
    for (let i = 0; i < count; i++)
    {
        for (let j = i+1; j < count; j++)
        {
            let inserts = [joust_id, attendees[i].user_id, attendees[j].user_id, 0, 1];
            await sql_helper.promiseSQL(connection, 'insert into competitions (joust_id, member1, member2, status, stage) values (?,?,?,?,?)', inserts);
        }
    }
    return true;
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