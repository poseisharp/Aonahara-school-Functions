const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  });
  const { username, discord_id, attendance } = JSON.parse(event.body);
  return client
    .query(
      q.Create(q.Collection("Students"), {
        data: {
          username: username,
          discord_id: discord_id,
          attendance: q.Ref(q.Collection("Attendance"), attendance),
        },
      })
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
