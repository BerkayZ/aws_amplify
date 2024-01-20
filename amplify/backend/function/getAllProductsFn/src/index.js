const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const method = event.httpMethod;

        switch (method) {
            case 'GET':
                try {
                    const scanParams = {
                        TableName: 'products',
                    };

                    const scanResult = await dynamoDB.scan(scanParams).promise();

                    return {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                        },
                        body: JSON.stringify({
                            items: scanResult.Items,
                            totalItems: scanResult.Count,
                        }),
                    };
                } catch (error) {
                    console.error('Error fetching products from DynamoDB', error);

                    return {
                        statusCode: 500,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                        },
                        body: JSON.stringify({
                            error: 'Internal Server Error',
                        }),
                    };
                }
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify('Invalid HTTP method'),
                };
        }
    } catch (error) {
        console.error('Error processing request', error);

        return {
            statusCode: 500,
            body: JSON.stringify('Internal Server Error'),
        };
    }
};
