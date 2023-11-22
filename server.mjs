import { Server } from "node:net";

const server = new Server();
const END = [ "end", "quit", "exit", "logout" ];

let connections = {
	
};

server.on("connection", (socket) => {
	// Obtener dirección del cliente:
	const clientInfo = socket.remoteAddress + ":" + socket.remotePort;
	socket.setEncoding("UTF-8");
	
	if(!clients[clientInfo]){
		clients[clientInfo] = socket;
	}
	console.log("New connection from", clientInfo);
	socket.on("data", (data) => {
		if(END.includes(data)){
			socket.end();
			return;
		}
		console.log("[" + clientInfo + "] -> " + data);
		Object.values(clients).forEach((clientSocket) => {
			if(clientSocket !== socket){
				clientSocket.write("[" + clientInfo + "] -> " + data);
			}
		});
	});
	socket.on("close", () => {
		console.log("Disconnected from [" + clientInfo + "]");
		delete clients[clientInfo];
	});
});

server.listen({
	host: "127.0.0.1",
	port: 3000,
	exclusive: true
}, () => {
	console.log("Server at", server.address()?.address + ":" + server.address()?.port);
});
