import { Socket } from "node:net";
import readline from "node:readline";
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const socket = new Socket();
const prompt = ">> ";
const END = [ "end", "quit", "exit", "logout" ];

socket.connect({
	host: "127.0.0.1",
	port: 3000
});

socket.on("connect", () => {
	console.log("Connected to the server!");
});

socket.on("data", (data) => {
	console.log("[server]" + data);
});

rl.on("line", (line) => {
	socket.write(line);
	if(END.includes(line)){
		socket.end();
	}
});

socket.on("close", () => {
	console.log("Disconnected from server");
	process.exit(0);
});
