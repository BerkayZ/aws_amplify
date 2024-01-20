const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');


exports.handler = async (event) => {
    try {
        const method = event.httpMethod;
        const productId = event.pathParameters.productId;

        switch (method) {
            case 'GET':
                try {
                    const params = {
                        TableName: 'products',
                        Key: {
                            productId: productId,
                        },
                    };

                    const data = await dynamoDB.get(params).promise();

                    if (!data.Item) {
                        return {
                            statusCode: 404,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': '*',
                            },
                            body: JSON.stringify({
                                error: 'Product not found',
                            }),
                        };
                    }

                    return {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                        },
                        body: JSON.stringify(data.Item),
                    };
                } catch (error) {
                    console.error('Error fetching data from DynamoDB', error);

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

            case 'POST':
                try {
                    const requestBody = JSON.parse(event.body);

                    if (!requestBody.name || !requestBody.description || !requestBody.stock) {
                        return {
                            statusCode: 400,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': '*',
                            },
                            body: JSON.stringify({
                                error: 'One or more fields are empty',
                            }),
                        };
                    }

                    const newItem = {
                        productId: uuidv4(),
                        name: requestBody.name,
                        description: requestBody.description,
                        stock: requestBody.stock,
                        active: requestBody.active,
                    };

                    const params = {
                        TableName: 'products',
                        Item: newItem,
                    };

                    await dynamoDB.put(params).promise();

                    return {
                        statusCode: 201,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                        },
                        body: JSON.stringify(newItem),
                    };
                } catch (error) {
                    console.error('Error creating product in DynamoDB', error);

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

            case 'PUT':
                try {
                    const requestBody = JSON.parse(event.body);

                    if (!requestBody.name || !requestBody.description || !requestBody.stock) {
                        return {
                            statusCode: 400,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': '*',
                            },
                            body: JSON.stringify({
                                error: 'One or more fields are empty',
                            }),
                        };
                    }

                    const params = {
                        TableName: 'products',
                        Key: {
                            productId: productId,
                        },
                        UpdateExpression: 'SET #name = :name, #description = :description, #stock = :stock, #active = :active',
                        ExpressionAttributeNames: {
                            '#name': 'name',
                            '#description': 'description',
                            '#stock': 'stock',
                            '#active': 'active',
                        },
                        ExpressionAttributeValues: {
                            ':name': requestBody.name,
                            ':description': requestBody.description,
                            ':stock': requestBody.stock,
                            ':active': requestBody.active,
                        },
                        ReturnValues: 'ALL_NEW',
                    };

                    const data = await dynamoDB.update(params).promise();

                    return {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                        },
                        body: JSON.stringify(data.Attributes),
                    };
                } catch (error) {
                    console.error('Error updating product in DynamoDB', error);

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

            case 'DELETE':
                try {
                    const params = {
                        TableName: 'products',
                        Key: {
                            productId: productId,
                        },
                    };

                    await dynamoDB.delete(params).promise();

                    return {
                        statusCode: 204,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                        },
                        body: JSON.stringify({}),
                    };
                } catch (error) {
                    console.error('Error deleting product from DynamoDB', error);

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
