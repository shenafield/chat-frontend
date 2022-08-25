import { io, Socket } from "socket.io-client";

export class Message {
    content: string;
    author: string;

    constructor({content, author}: {content: string, author:  string}) {
        this.content = content;
        this.author = author;
    }
}