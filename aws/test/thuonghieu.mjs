import thuongHieuRoute from "../thuonghieu/index.mjs"

thuongHieuRoute({
  "body-json": {
    "action": "update",
    "data": {
      "ma": "0ce0ac9f-41fa-4a31-8ffa-1b2fa47529ba",
      "ten": "eeddd",
      "trangThai": 33
    }
  },
  "context": {
    "http-method": "POST"
  }
}, null).then(console.log)