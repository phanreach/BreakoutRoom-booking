import { User, X, Shield, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UseUpdateRoom from "./hook/use-update-room";
import UseUpdateRoomImage from "./hook/use-update-room-image";
import UseDeleteImage from "./hook/use-delete-image";
import { roomSchema, type RoomSchema } from "./lib/schema/room-schema";
import type { Room } from "../type/api";
import { Switch } from "./ui/switch";

type Props = {
  room: Room;
  onClose: () => void;
};

export default function EditRoom({ room, onClose }: Props) {
  const { mutate: mutateRoom, isPending: isUpdatingRoom } = UseUpdateRoom();
  const { mutate: mutateImages, isPending: isUploadingImages } =
    UseUpdateRoomImage();
  const { mutateAsync: deleteImage } = UseDeleteImage();

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

  const getImageIdFromUrl = (url: string) => {
    const match = url.match(/\/(\d+)(?:\.[^/]+)?(?:\?.*)?$/);
    if (!match) return null;
    const id = Number(match[1]);
    return Number.isNaN(id) ? null : id;
  };

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

      setExistingImages(room.images ?? []);
      setImages([]);
      setRemovedImageIds([]);
    }
  }, [room, reset]);

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files?.length) return;
    setImages((prev) => [...prev, ...Array.from(files)]);
    e.currentTarget.value = "";
  };

  const handleRemoveNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => {
      const removedUrl = prev[index];
      const imageId = getImageIdFromUrl(removedUrl);
      if (imageId != null) {
        setRemovedImageIds((ids) => [...ids, imageId]);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleClose = () => {
    onClose();
    reset();
    setImages([]);
    setExistingImages(room.images ?? []);
    setRemovedImageIds([]);
  };

  // Combined submit: update room data + images
  const onSubmit = (data: RoomSchema) => {
    // Update room info first
    mutateRoom(
      {
        roomId: room.id,
        name: data.name,
        description: data.description ?? "",
        capacity: data.capacity,
        floor: data.floor,
        isAvailable: data.isAvailable ?? false,
      },
      {
        onSuccess: async () => {
          // If user removed existing images, delete them first
          if (removedImageIds.length > 0) {
            await Promise.all(
              removedImageIds.map((imageId) =>
                deleteImage({ imageId }).catch(() => undefined),
              ),
            );
          }

          // Then upload new images (if any)
          if (images.length > 0) {
            mutateImages(
              { roomId: room.id, files: images },
              { onSuccess: () => handleClose() },
            );
          } else {
            handleClose();
          }
        },
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
                defaultValue={room.isAvailable ?? false}
                render={({ field: { value, onChange } }) => (
                  <Switch
                    checked={Boolean(value)}
                    onCheckedChange={(checked) => onChange(Boolean(checked))}
                  />
                )}
              />
            </div>

            {/* Images */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-black">Images</label>
              <div
                className="flex flex-wrap gap-2 mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500"
                onClick={() =>
                  document.getElementById("room-image-input")?.click()
                }
              >
                {existingImages.length > 0 || images.length > 0 ? (
                  <>
                    {existingImages.map((url, index) => (
                      <div
                        key={`existing-${index}-${url}`}
                        className="relative w-20 h-20 border rounded-lg overflow-hidden"
                      >
                        <img
                          src={url}
                          alt="existing"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveExistingImage(index);
                          }}
                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {images.map((file, index) => (
                      <div
                        key={`new-${index}-${file.name}`}
                        className="relative w-20 h-20 border rounded-lg overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNewImage(index);
                          }}
                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </>
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

          {/* Actions */}
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
              disabled={isUpdatingRoom || isUploadingImages}
              className="flex-1 bg-[#003366] hover:bg-[#014487] text-white rounded-xl py-2"
            >
              {isUpdatingRoom || isUploadingImages ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
