"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});
class Storage {
    constructor(db) {
        this.db = db;
    }
    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.query(query, params, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.rows);
                }
            });
        });
    }
    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.query(query, params, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.rowCount === 0 ? undefined : res.rows[0]);
                }
            });
        });
    }
    run(query, params) {
        return new Promise((resolve, reject) => {
            this.db.query(query, params, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = new Storage(pool);
