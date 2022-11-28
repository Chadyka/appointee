import DashboardLayout from '../../components/layout/DashboardLayout'
import { ProfileForm } from '../../components/ProfileForm'
import { useSession } from '../../utils/hooks/useSession'

export default function ProfilePage() {
  const { session } = useSession()

  if (!session) return null

  return (
    <DashboardLayout session={session}>
      <ProfileForm session={session} />
    </DashboardLayout>
  )
}
