'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { DataTableRowActions } from './data-table/data-table-row-actions'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

export default function MortgagesTable() {
  return (
    <DataTable
      columns={columns}
      data={
        [
          {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
          },
          {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
          },
          {
            id: 'a1b2c3d4',
            amount: 150,
            status: 'completed',
            email: 'john@example.com',
          },
          {
            id: 'e5f6g7h8',
            amount: 75,
            status: 'rejected',
            email: 'jane@example.com',
          },
          {
            id: 'i9j0k1l2',
            amount: 200,
            status: 'pending',
            email: 'alex@example.com',
          },
          {
            id: 'm3n4o5p6',
            amount: 50,
            status: 'completed',
            email: 'sam@example.com',
          },
          {
            id: 'q7r8s9t0',
            amount: 120,
            status: 'pending',
            email: 'emily@example.com',
          },
          {
            id: 'u1v2w3x4',
            amount: 80,
            status: 'rejected',
            email: 'david@example.com',
          },
          {
            id: 'y5z6a7b8',
            amount: 180,
            status: 'completed',
            email: 'lisa@example.com',
          },
          {
            id: 'c9d0e1f2',
            amount: 60,
            status: 'pending',
            email: 'chris@example.com',
          },
          {
            id: 'g3h4i5j6',
            amount: 90,
            status: 'completed',
            email: 'sara@example.com',
          },
          {
            id: 'k7l8m9n0',
            amount: 110,
            status: 'pending',
            email: 'peter@example.com',
          },
          {
            id: 'o1p2q3r4',
            amount: 70,
            status: 'rejected',
            email: 'anna@example.com',
          },
          {
            id: 's5t6u7v8',
            amount: 130,
            status: 'completed',
            email: 'michael@example.com',
          },
        ] as Payment[]
      }
    />
  )
}
