const pool = require("../src/api//db/postgres");

async function testConnection() {
    try{
        const result = await pool.query("SELECT NOW()");

        console.log("Connected to postgreSQL");
        console.log(result.rows[0]);

        await pool.end();
    } catch (error){
        console.error("Conncetion failed");
        console.error(error);
    }
}

testConnection();