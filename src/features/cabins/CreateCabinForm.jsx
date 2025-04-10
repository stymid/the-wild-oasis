import { useForm } from "react-hook-form";
import { useRef } from "react";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import CustomToast from "../../ui/CustomToast";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const toastId = useRef(null);
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { isCreating, createCabin } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  function onValid(data) {
    toastId.current = toast.custom((t) => (
      <CustomToast t={t} message="your cabin is creating..." type="loading" />
    ));

    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log({ ...data, image });

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, editId },
        {
          onSuccess: () => {
            console.log("that was an edit not create");

            toast.custom((t) => (
              <CustomToast
                type="success"
                t={t}
                message="cabin successfully edited!"
              />
            ));
            reset();
            onCloseModal?.();
          },
          onError: (e) => {
            toast.custom((t) => (
              <CustomToast t={t} message={e.message} type="error" />
            ));
          },
          onSettled: () => {
            toast.dismiss(toastId.current);
          },
        }
      );
    } else
      createCabin(
        { ...data, image },
        {
          onSettled: () => {
            toast.dismiss(toastId.current);
          },
          onError: (e) => {
            toast.custom((t) => (
              <CustomToast t={t} message={e.message} type="error" />
            ));
          },
          onSuccess: () => {
            toast.custom((t) => (
              <CustomToast
                type="success"
                t={t}
                message="cabin created successfully!"
              />
            ));
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onInValid(error) {
    console.log(error);
  }
  const isWorking = isCreating || isEditing;
  return (
    <Form
      onSubmit={handleSubmit(onValid, onInValid)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label="Cabin Name">
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is requiered!",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is requiered!",
            min: { value: 1, message: "it is small" },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is requiered!",
            min: { value: 100, message: "it is small" },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is requiered!",
            validate: (value) => {
              return (
                +value <= +getValues().regularPrice ||
                "discount shuld be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.description?.message}
        label="Description for website"
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is requiered!",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          disabled={isWorking}
          accept="image/*"
          id="image"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          onClick={onCloseModal}
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button $variation="primary" disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
