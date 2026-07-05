const pool = require("../db/postgres");
class PolicyRepo{
    async create(policy){
        const query = `
            INSERT INTO policies
            (plan, algorithm, capacity, refill_rate, window_size, request_limit, leak_rate)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        // we have written $1,$2.. cause it helps to prevent the SQL Injection attacks


        const values  = [
            policy.plan,
            policy.algorithm,
            policy.capacity,
            policy.refill_rate,
            policy.window_size,
            policy.request_limit,
            policy.leak_rate
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    }


    async findByPlan(plan){
        const result = await pool.query(
            "SELECT * FROM policies WHERE plan = $1",
            [plan]
        );
        return result.rows[0];
    }

    async findAll(){
        const result = await pool.query(
            "SELECT * FROM policies"
        );
        return result.rows;
    }
}

module.exports = new PolicyRepo();