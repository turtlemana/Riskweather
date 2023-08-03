//MySql Connection via connection pool
import mysql from 'mysql2/promise';
import { Client } from 'ssh2';
import fs from 'fs';

interface QueryParams {
  query: string;
  values?: (string | number | boolean | Date | null)[];
};
// const sshPrivateKeyPath = process.env.BASTION_PATH;

// if (!sshPrivateKeyPath) {
//     throw new Error("BASTION_PATH is not defined in .env");
// }

// const sshConfig = {
//   host: process.env.BASTION_HOST,
//   port: Number(process.env.BASTION_PORT),
//   username: process.env.BASTION_USERNAME,
//   privateKey: fs.readFileSync(sshPrivateKeyPath)
// };
// const tunnel = new Client();
// let pool:any;

// tunnel.on('ready', () => {

//       pool = mysql.createPool({
//         host: '127.0.0.1',
//         port: 3307,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD,
//         // database: process.env.MYSQL_DATABASE,
//         waitForConnections: true,
//         connectionLimit: 20,
//         queueLimit: 0,
//       });
//     }).on('error', (err) => {
//     console.error('SSH connection error:', err);
// }).connect(sshConfig);
const pool = mysql.createPool(
  {
    host: process.env.MYSQL_HOST,
    port: 3306,
    waitForConnections: true,
    // database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: 20,
    queueLimit: 0,

  }
)


export default async function executeQuery({ query, values }: QueryParams): Promise<any> {
  if (!pool) {
    throw new Error("DB Pool is not initialized.");
  }
  const conn = await pool.getConnection();

  try {
    const [results, fields] = await conn.execute(query, values);
    return results;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

// process.on('exit', () => {
//   tunnel.end();
// });
// MySql connection

// import mysql from 'serverless-mysql';
// const db = mysql({
//   config: {
//     host: process.env.MYSQL_HOST,
//     port: 3306,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD
//   }
// });
// export default async function executeQuery({ query, values }:any) {
//   try {
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }

