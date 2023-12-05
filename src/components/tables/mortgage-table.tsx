import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

const MortgagesTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">#3210</TableCell>
          <TableCell>Olivia Martin</TableCell>
          <TableCell>February 20, 2023</TableCell>
          <TableCell>$42.25</TableCell>
          <TableCell>Shipped</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#3209</TableCell>
          <TableCell>Ava Johnson</TableCell>
          <TableCell>January 5, 2023</TableCell>
          <TableCell>$74.99</TableCell>
          <TableCell>Paid</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#3204</TableCell>
          <TableCell>Michael Johnson</TableCell>
          <TableCell>August 3, 2022</TableCell>
          <TableCell>$64.75</TableCell>
          <TableCell>Unfulfilled</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#3203</TableCell>
          <TableCell>Lisa Anderson</TableCell>
          <TableCell>July 15, 2022</TableCell>
          <TableCell>$34.50</TableCell>
          <TableCell>Shipped</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default MortgagesTable
