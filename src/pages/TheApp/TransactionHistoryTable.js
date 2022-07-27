import { Table } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'

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
  return(
      <div>
         <h4 className={css(styles.title)}>Transaction History</h4>
         <div class="table-responsive">
          <Table className={css(styles.table)} striped bordered hover  size="sm">
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
              <tr className={css(styles.table)}>
                <td>0x5734fBbe0x5734fBbe0x5734fBbe0x5734fBbe...</td>
                <td>0x5734fBbe0x5734fBbe0x5734fBbe0x5734fBbe...</td>
                <td>14th Aug, 2022</td>
                <td>Migrain Headache</td>
                <td>436hBbeCc90x5734fBbe0x5734fBbe0x5734fBbe...</td>
              </tr>
            </tbody>
          </Table>
         </div>
      </div>
      
  )
}