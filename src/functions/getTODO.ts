import { document } from "src/utils/dynamodbClient";


export const handle = async (event) => {    
    const { id } = event.pathParameters;

    const response = await document.query({
        TableName: "todos",
        KeyConditionExpression: "user_id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    if(!response){
        return{
            statusCode: 400,
            body: JSON.stringify({
                message: "No Todo found or No user with this ID registered.",            
            })
        }
    }

    return { 
        statusCode: 200,
        body: JSON.stringify({
            message: "TODO List!",
            content: response,
        }),
        headers: {
            "Content-type": 'application/json',
        },
    };


}