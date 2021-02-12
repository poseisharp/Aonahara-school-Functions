const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  });

  console.log(event.body);

  const { date, kelas, unformatedDate, weekNumber, year } = JSON.parse(
    event.body
  );

  return client
    .query(
      q.Create(q.Collection("Attendance"), {
        data: {
          date: date,
          class: q.Ref(q.Collection("Classes"), kelas),
          unformatedDate: unformatedDate,
          weekNumber: weekNumber,
          year: year,
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
