import DashboardLayout from '../../components/layout/DashboardLayout'
import { useSession } from '../../utils/hooks/useSession'

export default function Dashboard() {
  const { session } = useSession()

  if (!session) {
    return <div>No session</div>
  }

  return (
    <DashboardLayout session={session}>
      <div className="grid w-full grid-cols-2 gap-12 rounded-xl border-4 border-zinc-600 p-6">
        <div className="col-span-2 w-full">
          <h2 className="text-2xl font-bold">
            Good afternoon, {session.user.email}
          </h2>
        </div>
        <div className="flex w-full items-center rounded-lg bg-zinc-50 p-6">
          cavalami
        </div>
        <div className="flex w-full items-center rounded-lg bg-zinc-50 p-6">
          ca
        </div>
        <div className="col-span-2 h-72 w-full rounded-lg bg-zinc-50">
          valami
        </div>
      </div>
    </DashboardLayout>
  )
}
