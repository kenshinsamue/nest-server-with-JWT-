import {IsNotEmpty, IsString} from "class-validator";

export class userDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    password:string;

}