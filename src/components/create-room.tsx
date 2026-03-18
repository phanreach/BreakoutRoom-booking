import { User, UserPlus, X, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import UseRoomMutation from "./hook/use-room-mutation";
import { roomSchema, type RoomSchema } from "./lib/schema/room-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UseRoomImageMutation, {
  type ImagePayload,
} from "./hook/use-room-image-mutation";

export default function CreateRoom() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { mutate: createRoom, isPending } = UseRoomMutation();
  const { mutate: uploadImages, isLoading: isUploading } =
    UseRoomImageMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomSchema>({
    resolver: zodResolver(roomSchema),
  });

  const handleClose = () => {
    setOpen(false);
    reset();
    setImages([]);
  };

  const onSubmit = (data: RoomSchema) => {
    createRoom(
      { ...data, isAvailable: true },
      {
        onSuccess: (room) => {
          if (images.length > 0) {
            images.forEach((file) => {
              const payload: ImagePayload = {
                roomId: room.id,
                images: file,
              };
              uploadImages(payload);
            });
          }
          handleClose();
        },
      },
    );
  };

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages((prev) => [...prev, ...filesArray]);
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const FormInput = ({
    label,
    type = "text",
    placeholder,
    icon,
    error,
    ...props
  }: {
    label: string;
    type?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    error?: string;
  } & ReturnType<typeof register>["ref"] &
    any) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-black flex items-center gap-2">
        {icon}
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder || label}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-white font-semibold px-4 py-3 rounded-2xl shadow-lg hover:bg-[#24456f] bg-[#003366]"
      >
        <UserPlus className="w-5 h-5" />
        Create Breakout Room
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="border-b p-6 flex justify-between">
              <h2 className="text-2xl font-bold">Create Breakout Room</h2>
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
                  icon={<Shield className="w-3.5 h-3.5" />}
                  {...register("floor")}
                  error={errors.floor?.message}
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-black">Images</label>
                  <div
                    className="flex flex-wrap gap-2 mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500"
                    onClick={() =>
                      document.getElementById("room-image-input")?.click()
                    }
                  >
                    {images.length > 0 ? (
                      images.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 border rounded-lg overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-32 text-gray-400">
                        <p>Click or drag images here to upload</p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      id="room-image-input"
                      className="hidden"
                      onChange={handleAddImages}
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
                  disabled={isPending || isUploading}
                  className="flex-1 bg-[#003366] hover:bg-[#014487] text-white rounded-xl py-2 disabled:bg-gray-300"
                >
                  {isPending || isUploading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
