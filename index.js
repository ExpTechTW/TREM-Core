const bytenode = require("bytenode");
const crypto = require("crypto");
const dgram = require("dgram");

const client = dgram.createSocket("udp4");

const EventEmitter = require("events").EventEmitter;
const event = new EventEmitter();

const public_key = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ/qsgBqnfO7Bk67n3Z0j92rtxYc8NWW
vAZy0SPdpha4gW7oc4kYp5onOIpyEJv6XjXvdA7WwHAAoQAItRonJZsCAwEAAQ==
-----END PUBLIC KEY-----`;

bytenode.runBytecodeFile("./client.jar");

event.on("data", (data) => {
	try {
		const md5_text = data.md5 ?? "";
		data.md5 = "";
		const md5 = crypto.createHash("md5");
		if (md5.update(JSON.stringify(data)).digest("hex") == crypto.publicDecrypt(public_key, Buffer.from(md5_text, "base64")).toString()) console.log(data);
	} catch (err) {
		log(`P2P Data Decrypt Error => ${err}`, 3);
	}
});

event.on("log", (data) => log(data.msg, data.type));

client.on("listening", () => {
	const address = client.address();
	log(`Client listening on ${address.address}:${address.port}`, 1);
});

// server_list => https://cdn.jsdelivr.net/gh/ExpTechTW/API@master/resource/server_list.json
// 可以用 fetch 去抓 因為 port 會變
// eslint-disable-next-line no-undef
init(client, event, {
	server_list: [
		"p2p-1.exptech.com.tw:1015",
	],
});

function log(msg, type = 1) {
	const _type = (type == 3) ? "Error" : (type == 2) ? "Warn" : "Info";
	const _msg = `[${_type}][${time_to_string()}]: ${msg}`;
	if (type == 3)
		console.log("\x1b[31m" + _msg + "\x1b[0m");
	else if (type == 2)
		console.log("\x1b[33m" + _msg + "\x1b[0m");
	else if (type == 1)
		console.log("\x1b[32m" + _msg + "\x1b[0m");
}

function time_to_string() {
	const utc = new Date();
	const now = new Date(utc.getTime() + utc.getTimezoneOffset() * 60000 + 28800000);
	let _Now = now.getFullYear();
	_Now += "/";
	if ((now.getMonth() + 1) < 10) _Now += "0" + (now.getMonth() + 1);
	else _Now += (now.getMonth() + 1);
	_Now += "/";
	if (now.getDate() < 10) _Now += "0" + now.getDate();
	else _Now += now.getDate();
	_Now += " ";
	if (now.getHours() < 10) _Now += "0" + now.getHours();
	else _Now += now.getHours();
	_Now += ":";
	if (now.getMinutes() < 10) _Now += "0" + now.getMinutes();
	else _Now += now.getMinutes();
	_Now += ":";
	if (now.getSeconds() < 10) _Now += "0" + now.getSeconds();
	else _Now += now.getSeconds();
	return _Now;
}