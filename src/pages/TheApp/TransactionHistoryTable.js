import { Table } from "react-bootstrap"

export default function TransactionHistoryTable() {
  return(
      <div>
         <h4>Transaction History</h4>
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Time</th>
              <th>Message</th>
              <th>Txn Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td>0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td>14th Aug, 2022</td>
              <td>Migrain Headache</td>
              <td>436hBbe6ECc9105B2d703498D8490470255196f</td>
            </tr>
          </tbody>
        </Table>
      </div>
      
  )
}