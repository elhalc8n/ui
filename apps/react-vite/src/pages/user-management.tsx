import { useState } from 'react';
import { UserPlus, Shield, MoreHorizontal, Mail } from 'lucide-react';
import {
  DataTable,
  DataTableToolbar,
  GlassButton,
  GlassBadge,
  GlassModal,
  GlassInput,
  GlassSelect,
  GlassDropdown,
} from '@elhalc8n/ui';

export function UserManagement() {
  const [search, setSearch] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: '1', name: 'Alina Vance', email: 'alina@elhalc8n.dev', role: 'Administrator', status: 'Active', mfa: true },
    { id: '2', name: 'Marcus Chen', email: 'marcus@elhalc8n.dev', role: 'Editor', status: 'Active', mfa: true },
    { id: '3', name: 'Sophia Miller', email: 'sophia@elhalc8n.dev', role: 'Viewer', status: 'Pending', mfa: false },
    { id: '4', name: 'David Kim', email: 'david@elhalc8n.dev', role: 'Developer', status: 'Inactive', mfa: false },
    { id: '5', name: 'Elena Rostova', email: 'elena@elhalc8n.dev', role: 'Editor', status: 'Active', mfa: true },
  ]);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Editor');

  const handleAddUser = () => {
    if (!newName || !newEmail) return;
    setUsers((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: newName,
        email: newEmail,
        role: newRole,
        status: 'Active',
        mfa: false,
      },
    ]);
    setNewName('');
    setNewEmail('');
    setAddModalOpen(false);
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Full Name',
      sortable: true,
      cell: (row: typeof users[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{row.name}</div>
            <div className="text-[11px] text-slate-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'role', header: 'Access Role', sortable: true },
    {
      key: 'mfa',
      header: 'MFA Status',
      cell: (row: typeof users[0]) => (
        <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <Shield className={`w-3.5 h-3.5 ${row.mfa ? 'text-emerald-500' : 'text-slate-400'}`} />
          {row.mfa ? 'Enforced' : 'Disabled'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Account Status',
      cell: (row: typeof users[0]) => (
        <GlassBadge
          variant={
            row.status === 'Active'
              ? 'success'
              : row.status === 'Pending'
              ? 'warning'
              : 'default'
          }
          size="sm"
          withDot
        >
          {row.status}
        </GlassBadge>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right' as const,
      cell: (row: typeof users[0]) => (
        <GlassDropdown
          align="right"
          trigger={
            <GlassButton variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="w-4 h-4" />
            </GlassButton>
          }
          items={[
            { id: 'resend', label: 'Resend Invitation', icon: <Mail className="w-3.5 h-3.5" /> },
            'divider',
            {
              id: 'remove',
              label: 'Delete User',
              destructive: true,
              onClick: () => setUsers((prev) => prev.filter((u) => u.id !== row.id)),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            User & Team Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Control permissions, invite team members, and manage access roles.
          </p>
        </div>
        <GlassButton
          variant="primary"
          size="sm"
          onClick={() => setAddModalOpen(true)}
          iconLeft={<UserPlus className="w-3.5 h-3.5" />}
        >
          Invite Member
        </GlassButton>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        toolbar={
          <DataTableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search users by name, email, or role..."
          />
        }
      />

      {/* Add User Modal */}
      <GlassModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Invite New Team Member"
        description="Provide their email and assign an access level to grant portal access."
        footer={
          <>
            <GlassButton
              variant="outline"
              size="sm"
              onClick={() => setAddModalOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton
              variant="primary"
              size="sm"
              onClick={handleAddUser}
              iconRight={<Mail className="w-3.5 h-3.5" />}
            >
              Send Invite
            </GlassButton>
          </>
        }
      >
        <div className="space-y-4">
          <GlassInput
            label="Full Name"
            placeholder="e.g. Jane Doe"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <GlassInput
            label="Email Address"
            type="email"
            placeholder="jane@company.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <GlassSelect
            label="Assign Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            options={[
              { label: 'Administrator', value: 'Administrator' },
              { label: 'Editor', value: 'Editor' },
              { label: 'Viewer', value: 'Viewer' },
            ]}
          />
        </div>
      </GlassModal>
    </div>
  );
}

