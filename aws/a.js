fetch("https://xacs2p7jn0.execute-api.ap-southeast-1.amazonaws.com/data/thuong-hieu", {
  method: "GET"
}).then(res => res.json()).then(data => {
  console.log(data)
})