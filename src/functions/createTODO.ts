import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuidv4 } from 'uuid';

interface ICreateTODO{
    title: string;
    deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
    const {id} = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateTODO;
    
    const response = await document.put({
        TableName: "todos",
        Item: {
            id: uuidv4(),
            user_id: id,
            title,
            deadline: new Date(deadline),
            done: false
        }
    }).promise();

    return { 
        statusCode: 201,
        body: JSON.stringify({
            message: "TODO Created!",
            content: response,
        }),
        headers: {
            "Content-type": 'application/json',
        },
    };
};