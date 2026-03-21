import { PenBox, ShieldCheck, Trash2, UserRound } from "lucide-react";
import type { User } from "../type/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Props = {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
};

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="px-4 py-3">USER</TableHead>
              <TableHead className="px-4 py-3">EMAIL</TableHead>
              <TableHead className="px-4 py-3">PHONE</TableHead>
              <TableHead className="px-4 py-3">ROLE</TableHead>
              <TableHead className="px-4 py-3">STATUS</TableHead>
              <TableHead className="px-4 py-3">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-500 py-4"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {u.fullName ? u.fullName.charAt(0).toUpperCase() : "N"}
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {u.fullName || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">ID #{u.id}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3">{u.email || "N/A"}</TableCell>

                  <TableCell className="px-4 py-3">{u.phone || "N/A"}</TableCell>

                  <TableCell className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {u.role === "ADMIN" ? (
                        <ShieldCheck className="h-3.5 w-3.5" />
                      ) : (
                        <UserRound className="h-3.5 w-3.5" />
                      )}
                      {u.role}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        u.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {u.enabled ? "Active" : "Disabled"}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => onEdit?.(u)}
                      title="Edit"
                      className="p-2 rounded-lg hover:bg-blue-50 text-primary transition"
                    >
                      <PenBox size={18} />
                    </button>

                    <button
                      onClick={() => onDelete?.(u)}
                      title="Delete"
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
