import { useEffect, useState } from 'react'
import styles from './style.module.css'

export default function TestPage() {
  const [result, setResult] = useState();
  useEffect(function () {
    fetch("/api/thuong-hieu/").then(res => res.json()).then(data => {
      setResult(JSON.stringify(data, null, 4))
      console.log(data)
    })

  }, [])
  return (
    <>
      {result}
    </>
  )
}