// methods we need create(), findByEmail(), findById()

const pool = require("../db/postgres");

class userRepo {
    async create(user){
        const query = 
        `INSERT INTO users (email, password_hash)
         VALUES($1, $2)
         Returning *;
        `

        const values = [user.email, user.password_hash, user.role];

        const result = await pool.query(query, values);
    }

    async findByEmail(email){
        const query = 
        `SELECT * FROM users
         WHERE email = $1;
        `
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }


    async findById(id){
        const query = 
        `
        SELECT * FROM users
        WHERE id = $1;
        `
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}


module.exports = new userRepo();