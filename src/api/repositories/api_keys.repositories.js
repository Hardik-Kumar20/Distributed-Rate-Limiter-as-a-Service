// Methods we need 
// 1. create(),  2. findByHash(),  3. findByApplication(),  4. delete()

const pool = require("../db/postgres");

class ApiKeyRepo{
    async create(apiKey){
        const query = 
            `INSERT INTO api_keys (key_hash, application_id, name, is_active)
             VALUES($1, $2, $3, true)
             RETURNING *;`

             const values = [
                apiKey.keyHash,
                apiKey.applicationId,
                apiKey.name
             ]

        const result = await pool.query(query, values);
        return result.rows[0];             
    };
     
    async findByHash(hash){
        const query = 
            `SELECT * FROM api_keys
             WHERE key_hash = $1
             AND is_active = true;
            `
        
        const result = await pool.query(query, [hash]);
        return result.rows[0];
    };

    async findByApplication(application_id){
        const query = 
            `SELECT id, name, is_active, created_at, last_used_at FROM api_keys
             WHERE application_id = $1;
            `
        const result = await pool.query(query, [application_id]);
        return result.rows;
    };

    async delete(id){
        const query = 
            `DELETE FROM api_keys
             WHERE id = $1;
             RETURNING *;
            `

        const result = await pool.query(query, [id]);
        return result.rows[0];
    };
}

module.exports = new ApiKeyRepo();