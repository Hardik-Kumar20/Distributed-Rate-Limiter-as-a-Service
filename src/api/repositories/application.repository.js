const pool = require("../db/postgres");
class ApplicationRepo{
    async create(application){
        const query = 
            `INSERT INTO applications 
             (name, owner_id, plan) 
             VALUES($1, $2, $3)
                RETURNING *;
            `

            const values = [
                application.name,
                application.owner_id,
                application.plan
            ]

            const result = await pool.query(query, values);
            return result.rows[0];
    }

    async findAll(){
        const query = 
        `SELECT * FROM applications
         ORDER BY created_at DESC;
        `
        
        const result = await pool.query(query);
        return result.rows;
    }
    
    async findById(id){
        const query = 
        `SELECT * FROM applications
         WHERE id = $1;
        `
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }


    async deleteApp(id){
        const query =
        `DELETE FROM applications
         WHERE id = $1;
        `
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new ApplicationRepo();