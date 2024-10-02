
import sanPhamAPI from "./san-pham/index.mjs"
import cauHinhAPI from "./cauhinh/index.mjs"
import thuocTinhAPI from "./thuoctinh/index.mjs"

export async function handler(event) {
  try {
    switch (event.context["resource-path"]) {
      case "/cau-hinh":
        return await cauHinhAPI(event)
      case "/thuoc-tinh":
        return await thuocTinhAPI(event)
      case "/san-pham":
        return await sanPhamAPI(event);
      default:
        return { body: "not found path", event }
    }
  } catch (error) {
    return { body: "error", event, error }
  }
}




handler({
  "body-json": {},
  "params": {
    "path": {
    }
    , "querystring": {
    }
    , "header": {
    }
  },
  "stage-variables": {
  },
  "context": {
    "account-id": "873096019707",
    "api-id": "zd52ipcrb1",
    "api-key": "test-invoke-api-key",
    "authorizer-principal-id": "",
    "caller": "873096019707",
    "cognito-authentication-provider": "",
    "cognito-authentication-type": "",
    "cognito-identity-id": "",
    "cognito-identity-pool-id": "",
    "http-method": "GET",
    "stage": "test-invoke-stage",
    "source-ip": "test-invoke-source-ip",
    "user": "873096019707",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
    "user-arn": "arn:aws:iam::873096019707:root",
    "request-id": "79d92d1f-511c-4eae-b8f2-008d689bf880",
    "resource-id": "lc1pvnlly4",
    "resource-path": "/"
  }
}).then(console.log)