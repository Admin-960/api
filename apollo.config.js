// Front
require('dotenv/config')

module.exports = {
	service: {
		endpoint: {
			url: process.ebv.GRAPHQL_SERVER_URL || 'http://localhost:4200/graphql',
			skipSSLValidation: true
		}
	}
}
