import DashboardLayout from '../../components/layout/DashboardLayout'
import { useSession } from '../../utils/hooks/useSession'

export default function Settings() {
  const { session } = useSession()

  return <DashboardLayout session={session}>Settings</DashboardLayout>
}
