require('dotenv').config();
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event, context) =>{
    const client = new faunadb.Client({
        secret: process.env.FAUNA_SECRET
    })

    const data = JSON.parse(event.body)
    console.log("Invoked", data)

    return client.query(q.Create(q.Ref()))


}
