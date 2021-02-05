const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  });
  const { attendanceRef, studentRef } = JSON.parse(event.body);
  return client
    .query(
      q.Create(q.Collection("Relations"), {
        data: {
          studentRef: q.Ref(q.Collection("Students"), studentRef),
          attendanceRef: q.Ref(q.Collection("Attendance"), attendanceRef),
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
