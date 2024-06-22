require('dotenv').config();
const { TimestreamQueryClient, QueryCommand } = require('@aws-sdk/client-timestream-query');
const { fromIni } = require('@aws-sdk/credential-provider-ini');

// Load environment variables from .env file
const dbName = process.env.dbName || 'replaceme';
const tableName = process.env.tableName || 'replaceme';
const profileName = process.env.profile;
const rows = process.env.rows || '1';
const endpointURL = process.env.endpointURL;

console.log("Environment Variables:");
console.log("dbName:", dbName);
console.log("tableName:", tableName);
console.log("profileName:", profileName);
console.log("rows:", rows);
console.log("endpointURL:", endpointURL);

const queryString = `SELECT * FROM "${dbName}"."${tableName}" LIMIT ${rows}`;

const client = new TimestreamQueryClient({
    region: 'eu-west-1',
    endpoint: endpointURL,
    credentials: fromIni({ profile: profileName })
});

async function main() {
    try {
        const command = new QueryCommand({
            QueryString: queryString
        });

        const queryResponse = await client.send(command);

        if (queryResponse.Rows && queryResponse.Rows.length > 0) {
            queryResponse.Rows.forEach(row => {
                let rowString = '';
                row.Data.forEach(datum => {
                    if (datum.ScalarValue) {
                        rowString += `${datum.ScalarValue} `;
                    } else {
                        rowString += 'NULL ';
                    }
                });
                console.log(rowString.trim());
            });
        } else {
            console.log('No rows returned.');
        }
    } catch (error) {
        console.log('Error object:', error);
        console.log(`Error querying Timestream: ${error.message}`);
    }
}

main();
