const express = require('express')
const db = require('../database')

const createUser = (req, res) => {
    const { username, password } = req.body
    if(!username || !password) {
        return res.status(400).json({success:false,data:`Username or Password is empty!`})
    }

    const query = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `
    const params = [username, password]

    db.run(query, params, function(err) {
        if(err) {
            return res.status(500).json({success:false,data:`Error: ${err.message}`})
        }

        res.status(200).json({success:true,data:"User created successfully."})
    })
}

const getUser = (req, res) => {
    const {id} = req.params;
    const query = "SELECT * FROM users WHERE id = ?"

    db.get(query, [id], (err, row) => {
        if(err) {
            return res.status(500).json({success:false,data:`Error: ${err.message}`})
        }

        // Pag get, may 'row'
        res.status(200).json({success:true,data:row})
    })
}

const getAllUsers = (req, res) => {
    const query = `
        SELECT * FROM users
    `;

    db.all(query, [], (err, rows) => {
        if(err) {
            return res.status(500).json({success:false,data:`Error: ${err.message}`})
        }

        res.status(200).json({success:true,data:rows})
    })
}

// db.each = call a callback for each rows
const getAllUsersViaEach = (req, res) => {
    const query = `
        SELECT * FROM users
    `;
    let users = []

    db.each(query, [],
        (err, row) => {
            if(err) {
                return res.status(500).json({success:false,data:`Error: ${err.message}`})
            }

            row.uniqueId = (Date.now() + Math.random()).toString(36);
            users.push(row)
        },
        (err, count) => {
            res.status(200).json({success:true,data:users,count:count})
        }
    )
}

module.exports = { createUser, getUser, getAllUsers, getAllUsersViaEach }