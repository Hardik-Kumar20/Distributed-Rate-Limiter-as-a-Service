// Methods we need 
// 1. create(),  2. findByHash(),  3. findByApplication(),  4. delete()

const pool = require("../db/postgres");

class ApiKeyRepo{
    async create(apiKey){
        const query = 
            `INSERT INTO api_keys (key_hash, application_id, name, isacitve)
             VALUES($1, $2, $3, true)
             RETURNING *;`
    };
     
    async findByHash(hash){
        const query = 
            `SELECT * FROM api_keys
             WHERE key_hash = $1;
             AND is_active = true;
            `
    };

    async findByApplication(application_id){
        const query = 
            `SELECT * FROM api_keys
             WHERE application_id = $1;
            `
    };


    async delete(id){
        const query = 
            `DELETE FROM api_keys
             WHERE id = $1;
             RETURNING *;
            `
    };
}