import DashboardLayout from '../../components/layout/DashboardLayout'
import { useSession } from '../../utils/hooks/useSession'

export default function Analytics() {
  const { session } = useSession()

  return <DashboardLayout session={session}>Analytics</DashboardLayout>
}
