## 注意事項
- 使用 Node.js (v18.14.2) 運行 index.js
- config 內的 uuid 可不用設置 若無設置每次運行皆會自動生成 若設置則會使用設置的 UUID
- 資料會重複 (多個來源) 需自行判斷

## 變數
#### raw_data
- 儲存接收到的資料 `Array`
```js
console.log(raw_data);
```
```json5
[{
	type      : "websocket", // 資料來源 ( websocket、p2p )
	verify    : true, // 資料完整性校驗 ( 是否被修改過 true=完整 false=無法確定 校驗對於網路品質要求較高 網路不佳容易遇到 false 的情況 )
	timestamp : 1679706364870, // 接收時間
	data      : { // 資料
		type       : "trem-eq",
		time       : 1679706345337,
		timestamp  : 1679706364870,
		number     : 5,
		data_count : 16,
		id         : 14068,
		report_id  : 254,
		list       : {
			"H-269-6126556-5": 1,
		},
		total_station : 93,
		alert         : true,
		cancel        : false,
		final         : false,
	},
}]
```

#### service_status
- 狀態記錄 `Object`
```js
console.log(service_status);
```
```json5
{
	websocket: {
		status: false, // 是否能夠從 WebSocket 獲取資料
	},
	p2p: {
		status     : false, // 是否能夠從 P2P 獲取資料
		upstream   : 0, // 已連接的上游節點數量
		downstream : 0, // 已連接的下游節點數量
	},
}
```

#### ready
- 是否初始化完成 `bool`
```js
console.log(ready);
```
```
true
```
