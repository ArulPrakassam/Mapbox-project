export default function handler(req, res) {
  let { lat, long } = req.query;
  const mysql = require("mysql2");
  const pool = mysql.createPool(process.env.DATABASE_URL, {
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
  });
  console.log("Connected to Database");
  lat = parseFloat(lat);
  long = parseFloat(long);
  if (req.method === "GET") {
    if (lat && long && typeof lat === "number" && typeof long === "number") {
      pool.query(`insert into coordinates (lat,long) values(${lat},${long})`);
      res.status(201).json({
        coordinates: { lat, long },
        message: "value added to the record",
      });
      console.log(`lat:${lat},long:${long} added to the record`);
    } else {
      res.status(200).json({
        error: "check the url",
        message: "value not added to the record",
      });
    }
  }
}
