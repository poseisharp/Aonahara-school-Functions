const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  });
  const getId = (path) => {
    return path.match(/([^\/]*)\/*$/)[0];
  };

  const attendanceId = getId(event.path);
  return client
    .query(
      q.Get(
        q.Match(
          q.Index("relation_by_attendances"),
          q.Ref(q.Collection("Attendance"), `${attendanceId}`)
        )
      )
    )
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
