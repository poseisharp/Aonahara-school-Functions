module.export = (statusCode, body) => {
	return{
		statusCode,
		body: JSON.stringify(body)
	}
}
