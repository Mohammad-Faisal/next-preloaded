'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Badge } from '../ui/badge'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import { Button } from '../ui/button'
import { useDeleteAgentMutation, useGetAgents } from '@/data/hooks/useAgentsClient'
import { Agent } from '@/data/clients/agentsClient'
import { ActiveStatusEnum, ApprovalStatusEnum } from '@/constants/enums'
import AgentApprovalStatusForm from '@/components/forms/dashboard/agent/approval-status-form'
import AgentActiveStausForm from '@/components/forms/dashboard/agent/active-status-form'
import Link from 'next/link'
import { DownloadIcon } from 'lucide-react'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import ViewDetailsDialog from '../dialogs/view-details-dialog'

export default function AgentsTable() {
  const { mutate: deleteAgent, isPending } = useDeleteAgentMutation()

  const columns: ColumnDef<Agent>[] = [
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Applied At" />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
    },
    {
      accessorKey: 'agency',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Agency Name" />,
      cell: ({ row }) => {
        const agency = row.original.agency
        if (agency) {
          return <span>{agency}</span>
        }
        return <span>Not Provided</span>
      }
    },
    {
      accessorKey: 'contactNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Number" />
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      id: 'activeStatus',
      header: 'Active Status',
      cell: ({ row }) => {
        const activeStatus = row.original.activeStatus
        if (row.original.approvalStatus !== ApprovalStatusEnum.APPROVED) {
          return <Badge variant="secondary">-</Badge>
        }
        if (activeStatus === ActiveStatusEnum.ACTIVE) {
          return <Badge className={`bg-teal-400 text-black hover:bg-teal-600`}>Active</Badge>
        }
        return <Badge className={`bg-rose-400 text-black hover:bg-rose-600`}>Inactive</Badge>
      }
    },
    {
      id: 'approvalStatus',
      header: 'Approved Status',
      cell: ({ row }) => {
        const approvalStatus = row.original.approvalStatus
        if (approvalStatus === ApprovalStatusEnum.APPROVED) {
          return <Badge className={`bg-teal-400 text-black hover:bg-teal-600`}>Approved</Badge>
        }
        return <Badge className={`bg-red-400 text-black hover:bg-red-600`}>Not Approved</Badge>
      }
    },
    {
      id: 'locations',
      header: 'Locations',
      cell: ({ row }) => {
        const locations = row.original.locations
        return (
          <ViewDetailsDialog
            title="Locations"
            description="Locations where agent is available."
            anchor={<Button variant="outline">View Locations</Button>}
            data={locations}
          />
        )
      }
    },
    {
      id: 'realEstateLicense',
      header: 'Real Estate License',
      cell: ({ row }) => {
        const documentLink = row.original.documents[0].url
        return (
          <Link href={documentLink}>
            <Button className="flex items-center">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </Link>
        )
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="space-x-2">
          {row.original.approvalStatus === ApprovalStatusEnum.APPROVED && (
            <ConfirmActionDialog
              title="Update Status"
              anchor={<Button variant={'secondary'}>Update Active Status</Button>}
              content={<AgentActiveStausForm data={row.original} />}
            />
          )}
          {row.original.approvalStatus === ApprovalStatusEnum.NOT_APPROVED && (
            <ConfirmActionDialog
              title="Are you sure you want to approve this agent?"
              anchor={<Button>Approve Agent</Button>}
              content={<AgentApprovalStatusForm data={row.original} />}
            />
          )}
        </div>
      )
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <ConfirmDeleteDialog onDelete={() => deleteAgent(row.original.id)} isLoading={isPending} />
        </div>
      )
    }
  ]

  const { loading, data } = useGetAgents()

  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
