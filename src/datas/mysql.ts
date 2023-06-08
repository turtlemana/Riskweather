//MySql Connection via connection pool
import mysql from 'mysql2/promise';

interface QueryParams  {
  query: string;
  values?: (string | number | boolean | Date | null)[];
};

const pool=mysql.createPool(
  {
    host: process.env.MYSQL_HOST,
    port:3306,
    waitForConnections:true,
    // database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit:10,
    queueLimit:0,
    
  }
)


export default async function executeQuery({ query, values }: QueryParams): Promise<any> {
  const conn =await pool.getConnection();

  try {
    const [results,fields]=await conn.execute(query,values);
    return results;
  } catch(err){
    throw err;
  } finally {
    conn.release()
  }
};




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

