import CreateUser from "../../components/create-user";
import { DeleteDialog } from "../../components/delete-dialog";
import EditUser from "../../components/edit-user";
import useDeleteUser from "../../components/hook/use-delete-user";
import useUsersQuery from "../../components/hook/use-users-query";
import UserTable from "../../components/user-table";
import type { User } from "../../type/api";
import { useState } from "react";

export default function UserManagement() {
  const { data: usersData, isLoading, error } = useUsersQuery();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userDelete, setUserDelete] = useState<User | null>(null);

  const { mutate: deleteUser, isPending } = useDeleteUser();

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between border-b bg-white p-6">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-sm text-gray-500">Manage system users</p>
          </div>

          <CreateUser />
        </div>

        <div className="p-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <p>Error loading users</p>;

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (user: User) => {
    setUserDelete(user);
    setDeleteOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between border-b bg-white p-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-sm text-gray-500">Manage system users</p>
        </div>

        <CreateUser />
      </div>

      <div className="p-6">
        <UserTable
          users={usersData || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {editingUser && (
        <EditUser user={editingUser} onClose={() => setEditingUser(null)} />
      )}

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete User"
        description={`Are you sure you want to delete "${userDelete?.fullName || "this user"}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        onConfirm={() => {
          if (userDelete) {
            deleteUser(userDelete.id, {
              onSuccess: () => {
                setDeleteOpen(false);
                setUserDelete(null);
              },
            });
          }
        }}
      />
    </div>
  );
}
