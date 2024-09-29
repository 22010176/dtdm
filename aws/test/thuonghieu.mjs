import thuongHieuRoute from "../thuonghieu/index.mjs"
import { v4 } from "uuid"

thuongHieuRoute({
  "body-json": {
    "action": "update",
    "data": {
      "ma": "0cc96f04-7610-4776-b663-d8f7e2baef2c",
      "ten": "eeddd",
      "trangThai": 33
    }
  },
  "context": {
    "http-method": "POST"
  }
}, null).then(console.log)

thuongHieuRoute({
  "body-json": {
    "action": "delete",
    "data": {
      "ma": "0cc96f04-7610-4776-b663-d8f7e2baef2c",
      "ten": "eeddd",
      "trangThai": 33
    }
  },
  "context": {
    "http-method": "POST"
  }
}, null).then(console.log)

thuongHieuRoute({
  "body-json": {
    "action": "insert",
    "data": {
      "ma": v4(),
      "ten": "eeddd",
      "trangThai": 33
    }
  },
  "context": {
    "http-method": "POST"
  }
}, null).then(console.log)