const faundb = require('faunadb'), q = faunadb.query
exports.handler = async function(event, context){
    return{
        statusCode: 200,
        body: JSON.stringify("Hello Aonahara!")
    }
}
console.log("Hello Aonahara!");
