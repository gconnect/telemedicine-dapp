import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'
import { Buffer } from 'buffer';
import axios from "axios"

const styles = StyleSheet.create({
  table: {
    '@media (max-width: 575px)': {
      fontSize: '12px',
    }
  },
  title: {
    margin: '20px 0'
  }
})

export default function TransactionHistoryTable() {
  // const url = "https://indexer.testnet.algoexplorerapi.io/v2/transactions?limit=50&address=IQ7UESMB2RHOGCBXJP5S3KZUDLTSGSTKLPSS4DDFZHVXNYAZRBFYV4EWRM&sort=desc"
  const url = "https://indexer.testnet.algoexplorerapi.io/v2/transactions?limit=50&address="
  const address = localStorage.getItem("address")
  const [transactions, setTransactions] = useState([])
  const [set, setTest] = useState([])

  const getTransactionHistory = async () => {
   const response = await axios.get(`${url}${address}&sort=desc`)
   const data = response.data.transactions
   setTransactions(data)
  //  const innerTrans = data[0]["inner-txns"][0]['payment-transaction'].receiver
  //  console.log(innerTrans)
  let items = []
  data.forEach(item => {
    if (item.hasOwnProperty('inner-txns')) {
      item['inner-txns'].forEach(inner => {
        if (inner.hasOwnProperty('payment-transaction')) {
          items.push(inner['payment-transaction'])
        }
      })
    }
    
  })

  data.forEach(item => {
    if (item.hasOwnProperty('payment-transaction')) {
      items.push(item['payment-transaction'])
    }
  })


  setTest(items)
   return data
  }

  const base64ToString =(str) =>{
    if(str == null){
      return
    }else {
      return Buffer.from(str, 'base64').toString('ascii');
    }  
  }

  useEffect(() =>{
    getTransactionHistory()
  }, [])

  return(
      <div>
         <h4 className={css(styles.title)}>Transaction History</h4>
         <div class="table-responsive">
          <Table className={css(styles.table)} striped bordered hover  size="sm">
            <thead>
              <tr>
                <th>TxId</th>
                <th>Confirmed Round</th>
                <th>Mesage</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
            {transactions.map((item, index) =>
                <tr className={css(styles.table)}>
                <td>{item.id}</td>
                <td>{item['confirmed-round']}</td>
                <td>{base64ToString(item.note)}</td>
                <td>{item.sender}</td>
                <td>{item.sender}</td>
                </tr>              
              // {/* {  transactions[index]["inner-txns"][index]['payment-transaction'].map((inner) => <td>{inner.receiver}</td>)} */}
              // {/* {item['inner-txns'].map((trans) =>
              // <td>{trans['payment-transaction'].receiver}</td>
              // )} */}
            )}
            </tbody>
          </Table>
         </div>
      </div>
      
  )
}