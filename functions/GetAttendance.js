const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  });
  const getClassId = (path) => {
    return path.match(/([^\/]*)\/*$/)[0];
  };

  const getAttendance = (path) => {
    return path.match(/([^\/]*)\/([^\/]*)*$/)[1];
  };
  const classId = getClassId(event.path);
  const attendance = getAttendance(event.path);
  return client
    .query(
      q.Get(
        q.Match(q.Index("attendance_by_date_and_class"), attendance, classId)
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
