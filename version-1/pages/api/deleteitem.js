export default function handler(req, res) {
  const { id } = req.query;
  const mysql = require("mysql2");
  const pool = mysql.createPool(process.env.DATABASE_URL, {
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
  });
  console.log("Connected to Database");

  if (req.method === "DELETE") {
    //changing the date time according to database format
    // let dbTime = new Date(id).toLocaleTimeString("en-US", {
    //   timeZone: "UTC",
    //   hour12: false,
    //   month: "numeric",
    //   year: "numeric",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // });
    // let tempdbTime = new Date(dbTime);
    // let tempdbMonth =
    //   (tempdbTime.getMonth() + 1).toString().length === 1
    //     ? `0${(tempdbTime.getMonth() + 1).toString()}`
    //     : tempdbTime.getMonth() + 1;
    // let tempdbDate =
    //   tempdbTime.getDate().toString().length === 1
    //     ? `0${tempdbTime.getDate().toString()}`
    //     : tempdbTime.getDate();
    // let tempdbHours =
    //   tempdbTime.getHours().toString().length === 1
    //     ? `0${tempdbTime.getHours().toString()}`
    //     : tempdbTime.getHours();
    // let tempdbMinutes =
    //   tempdbTime.getMinutes().toString().length === 1
    //     ? `0${tempdbTime.getMinutes().toString()}`
    //     : tempdbTime.getMinutes();
    // let tempdbSeconds =
    //   tempdbTime.getSeconds().toString().length === 1
    //     ? `0${tempdbTime.getSeconds().toString()}`
    //     : tempdbTime.getSeconds();

    // let dbFormat = `${tempdbTime.getFullYear()}-${tempdbMonth}-${tempdbDate} ${tempdbHours}:${tempdbMinutes}:${tempdbSeconds}`;

    // pool.query(
    //   `delete from coordinates where dttm="${dbFormat}"`,
    //   function (err, results) {
    //     if (err) throw err;
    //     res.status(200).json({ message: "one record was deleted" });
    //     console.log("one record was deleted");
    //   }
    // );

    // use when hosting
    pool.query(
      `delete from coordinates where dttm="${id}"`,
      function (err, results) {
        if (err) throw err;
        res.status(200).json({ message: "one record was deleted" });
        console.log("one record was deleted");
      }
    );
  }
}
