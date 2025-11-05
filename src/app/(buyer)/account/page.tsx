import { OrganizationProfileCard } from '@/components/accounts/OrganizationProfileCard';

export default function AccountsPage() {
  return (
    <div className="container font-sans px-10 py-8 space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization profile, team access, and platform settings
        </p>
      </div>
      <div className='max-w-[50%]'>
      <OrganizationProfileCard />

      </div>
      
      {/* Domain Allow List and other cards hidden for MVP */}
    </div>
  );
}
