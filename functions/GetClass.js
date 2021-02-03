const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  });
  const getTime = (path) => {
    return path.match(/([^\/]*)\/*$/)[0];
  };

  const getName = (path) => {
    return path.match(/([^\/]*)\/([^\/]*)*$/)[1];
  };
  const name = getName(event.path);
  const time = getTime(event.path);
  console.log(name, time);
  return client
    .query(q.Get(q.Match(q.Index("class_by_name"), name, time)))
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
