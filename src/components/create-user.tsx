import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, User, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUserMutation from "./hook/use-user-mutation";
import {
  createUserSchema,
  type CreateUserSchema,
} from "./lib/schema/user-schema";

type UserFormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  error?: string;
};

function UserFormInput({
  label,
  type = "text",
  icon,
  error,
  ...props
}: UserFormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-black flex items-center gap-2">
        {icon}
        {label}
      </label>
      <input
        type={type}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function CreateUser() {
  const [open, setOpen] = useState(false);
  const { mutate: createUser, isPending } = useUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: "USER",
      enabled: true,
      password: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
    reset({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
      enabled: true,
    });
  };

  const onSubmit = (data: CreateUserSchema) => {
    createUser(
      {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password ?? "",
        role: data.role,
        enabled: data.enabled,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-white font-semibold px-4 py-3 rounded-2xl shadow-lg hover:bg-[#24456f] bg-[#003366]"
      >
        <UserPlus className="w-5 h-5" />
        Create User
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="border-b p-6 flex justify-between">
              <h2 className="text-2xl font-bold">Create User</h2>
              <button type="button" onClick={handleClose}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-4">
                <UserFormInput
                  label="Full Name"
                  icon={<User className="w-4 h-4" />}
                  {...register("fullName")}
                  error={errors.fullName?.message}
                />

                <UserFormInput
                  label="Email"
                  type="email"
                  icon={<User className="w-4 h-4" />}
                  {...register("email")}
                  error={errors.email?.message}
                />

                <UserFormInput
                  label="Phone"
                  icon={<User className="w-4 h-4" />}
                  {...register("phone")}
                  error={errors.phone?.message}
                />

                <UserFormInput
                  label="Password"
                  type="password"
                  icon={<Shield className="w-4 h-4" />}
                  {...register("password")}
                  error={errors.password?.message}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-black">Role</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                      {...register("role")}
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                    {errors.role && (
                      <p className="text-sm text-red-500">
                        {errors.role.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-black">Status</p>
                      <p className="text-sm text-gray-500">Enable this user</p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#003366]"
                      {...register("enabled")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 border-t p-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 border rounded-xl py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-[#003366] hover:bg-[#014487] text-white rounded-xl py-2 disabled:bg-gray-300"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
