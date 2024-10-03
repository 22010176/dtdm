import { useEffect, useState } from 'react'
import styles from './style.module.css'

import axios from 'axios'
import { apiRoute } from '../../api_param';

export default function TestPage() {
  const [result, setResult] = useState();

  useEffect(function () {
    // axios({
    //   baseURL: "https://zd52ipcrb1.execute-api.ap-southeast-1.amazonaws.com/data/thuoc-tinh?table=hedieuhanh",
    //   method: "GET"
    // }).then(console.log)
    axios.get("https://zd52ipcrb1.execute-api.ap-southeast-1.amazonaws.com/data/thuoc-tinh?table=hedieuhanh")
      .then(console.log)
    // fetch("https://zd52ipcrb1.execute-api.ap-southeast-1.amazonaws.com/data/thuoc-tinh?table=hedieuhanh", {
    //   "headers": {
    //     "Content-Type": "application/json",
    //     "sec-ch-ua": "\"Microsoft Edge\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"Windows\"",
    //   },
    //   "body": null,
    //   "method": "GET"
    // }).then(res => res.json()).then(data => {
    //   setResult(JSON.stringify(data, null, 4))
    //   console.log(data)
    // })

  }, [])
  console.log(import.meta.env)
  return (
    <>
      {result}
    </>
  )
}