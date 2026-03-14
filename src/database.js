const sqlite3 = require('sqlite3').verbose() // verbose() for more definitive error messages

const db = new sqlite3.Database('./data.db', (err) => {
    if(err) {
        return console.error(`Error connecting to database: ${err.message}.`)
    }

    console.log('Connected successfully to the database.')
})

// db.serialize = forces every query to run sequentially
db.serialize(() => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;
    // Kapag .run() gamit mo, 'wag ka mag arrow function
    db.run(createTableQuery, [], function(err) {
        if(err) {
            return console.error(`Error: ${err.message}.`)
        }

        console.log('CREATED users TABLE SUCCESSFULLY.')
    })


    const createUserQuery = `
        INSERT INTO users (username, password)
        VALUES ('yliherr', 'anoypogi123');
    `;
    db.get("SELECT * FROM users WHERE username = 'yliherr'", [], (err, row) => {
        if(row) {
            return console.log('MOCK DATA ALREADY EXISTS.')
        }

        db.run(createUserQuery, [], function(err) {
            if(err) {
                return console.error(`Error: ${err.message}.`)
            }

            return console.log('INSERTED MOCK DATA SUCCESSFULLY.')
        })
    })


    // db.prepare = looping queries
    const usersArray = [
        {
            username: "John Doe",
            password: "12345"
        },
        {
            username: "John Rick",
            password: "12345"
        },
        {
            username: "John Woop",
            password: "12345"
        }
    ]
    db.get("SELECT * FROM users WHERE username = 'John Doe'", [], (err, row) => {
        if(row) {
            return console.log('INITIAL DATAS ALREADY EXISTS.')
        }

        // You should declare the loop right here because functions in sqlite3 are all
        // asyncrhonous, just because it has return keyword does not make it run line by line
        // it just calls every function it sees, sequentially.
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
        for(let i = 0; i < usersArray.length; i++) {
            // stmt.run(), .get(), .all(), .each()
            // also they can still have callbacks - (err) => {}
            stmt.run(usersArray[i].username, usersArray[i].password)
        }
        stmt.finalize()

        return console.log('INSERTED INITIAL DATAS SUCCESSFULLY.')
    })
})

// db.close((err) => {
//     if(err) {
//         return console.error(`Error closing the database: ${err.message}`)
//     }

//     console.log('Database connection closed successfully.')
// })

db.on('error', (err) => {
    console.error(`[DB ERROR]: ${err.message}`)
})

module.exports = db