import { User, X, Shield } from "lucide-react";
import { useEffect } from "react";
import UseUpdateRoom from "./hook/use-update-room";
import { roomSchema, type RoomSchema } from "./lib/schema/room-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { Room } from "../type/api";
import { Switch } from "./ui/switch";

type Props = {
  room: Room;
  onClose: () => void;
};

export default function EditRoom({ room, onClose }: Props) {
  const { mutate, isPending } = UseUpdateRoom();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RoomSchema>({
    resolver: zodResolver(roomSchema),
  });

  useEffect(() => {
    if (room) {
      reset({
        name: room.name,
        description: room.description,
        capacity: room.capacity,
        floor: room.floor,
        isAvailable: room.isAvailable,
      });
    }
  }, [room, reset]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: RoomSchema) => {
    mutate(
      {
        roomId: room.id,
        name: data.name,
        description: data.description ?? "",
        capacity: data.capacity,
        floor: data.floor,
        isAvailable: data.isAvailable ?? false,
      },
      {
        onSuccess: () => handleClose(),
      },
    );
  };

  const FormInput = ({ label, type = "text", icon, error, ...props }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold flex items-center gap-2">
        {icon}
        {label}
      </label>

      <input
        type={type}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#003366] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="border-b p-6 flex justify-between">
          <h2 className="text-2xl font-bold">Edit Breakout Room</h2>
          <button onClick={handleClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <FormInput
              label="Name"
              icon={<User className="w-4 h-4" />}
              {...register("name")}
              error={errors.name?.message}
            />

            <FormInput
              label="Description"
              {...register("description")}
              error={errors.description?.message}
            />

            <FormInput
              label="Capacity"
              type="number"
              icon={<User className="w-4 h-4" />}
              {...register("capacity", { valueAsNumber: true })}
              error={errors.capacity?.message}
            />

            <FormInput
              label="Floor"
              icon={<Shield className="w-4 h-4" />}
              {...register("floor")}
              error={errors.floor?.message}
            />

            <div className="flex items-center gap-3 mt-2">
              <span className="font-medium text-sm">Available</span>
              <Controller
                name="isAvailable"
                control={control}
                defaultValue={room.isAvailable ?? false} // important!
                render={({ field: { value, onChange } }) => (
                  <Switch
                    checked={Boolean(value)} // ensure boolean
                    onCheckedChange={(checked) => onChange(Boolean(checked))} // force boolean
                  />
                )}
              />
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
              className="flex-1 bg-[#003366] hover:bg-[#014487] text-white rounded-xl py-2"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
