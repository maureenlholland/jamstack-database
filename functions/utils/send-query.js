require('dotenv').config();
const axios = require('axios');

// in this particular case, we don't need the extra stuff apollo offers (ie caching)
// this is an abstraction so we don't have to rewrite the logic for multiple serverless functions
module.exports = async (query, variables) => {
    const result = await axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.FAUNA_SERVER_SECRET}`
        },
        data: {
            query,
            variables,
        }
    });

    return result.data;
};

