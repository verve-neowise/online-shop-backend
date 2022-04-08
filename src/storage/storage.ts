import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE!,
    ssl: { 
        rejectUnauthorized: false 
    }
})

class Storage {

    constructor(private db: Pool) {
    }

    all<T>(query: string, params: any[] = []) {
        return new Promise<T[]>((resolve, reject) => {
            this.db.query(query, params, (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res.rows)
                }
            })
        })
    }

    get<T>(query: string, params: any[] = []) {
        return new Promise<T>((resolve, reject) => {
            this.db.query(query, params, (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res.rowCount === 0 ? undefined : res.rows[0])
                }
            })
        })
    }

    run(query: string, params: any[]) {
        return new Promise<void>((resolve, reject) => {
            this.db.query(query, params, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve()
                }
            })
        })
    }
}

export default new Storage(pool)