const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./types");
const { resolvers } = require("./resolvers");
const {accessLogger, errorLogger} = require("../lib/logger")(__filename)


const myPlugin = {
    requestDidStart(requestContext) {
        // accessLogger.info('Request started!');

        return {
            parsingDidStart(requestContext) {
                accessLogger.info('Parsing started!');

                return (err) => {
                    if (err) {
                        errorLogger.error(err);
                    }
                }
            },
            validationDidStart(requestContext) {
                errorLogger.error('Validation started!');

                return (errs) => {
                    if (errs) {
                        errs.forEach(err => errorLogger.error(err));
                    }
                }
            },
            executionDidStart() {
                return (err) => {
                    if (err) {
                        errorLogger.error(err);
                    }
                }
            }
        }
    }
}


module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [myPlugin],
    context: ({ req }) => ({ req }),
});

