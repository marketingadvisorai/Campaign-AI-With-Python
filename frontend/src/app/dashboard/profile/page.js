import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Profile | Campaign AI Platform',
};

const ProfileSettings = dynamic(() => import('@/components/profile/ProfileSettings'), { ssr: false });

export default function ProfilePage() {
  return <ProfileSettings />;
}
