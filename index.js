/* eslint-disable no-undef */
const WebSocket = require("ws");
const bytenode = require("bytenode");
const crypto = require("crypto");
const dgram = require("dgram");
const fetch = require("node-fetch");
const fs = require("fs");
const client = dgram.createSocket("udp4");
bytenode.runBytecodeFile("./server.jar");

(async () => {
	console.log(await init({
		WebSocket,
		fetch,
		crypto,
		client,
		config: {
			uuid: null,
		},
	}));
})();


// 接收資料 [地震預警、地震報告、震度速報、近即時震度、PWS、海嘯警報、海嘯資訊]
// raw_data | 接收到的資料
// service_status | 狀態 (true==連接)
// ready | 是否初始化完成

setInterval(() => {
	if (raw_data.length) {
		const data = raw_data.shift();
		console.log(data);
		fs.writeFile(`./${data.timestamp}.json`, JSON.stringify(data), () => void 0);
	}
}, 0);