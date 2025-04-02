import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCabin from "../../services/apiCabins";
import toast from "react-hot-toast";
import CustomToast from "../../ui/CustomToast";
import { useRef } from "react";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm() {
  const toastId = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate } = useMutation({
    mutationKey: ["createCabin"],
    mutationFn: createCabin,
    onSuccess: () => {
      toast.custom((t) => (
        <CustomToast
          type="success"
          t={t}
          message="cabin created successfully!"
        />
      ));
      reset();
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (e) => {
      console.log(e);

      toast.custom((t) => (
        <CustomToast t={t} message={e.message} type="error" />
      ));
    },
    onSettled: () => {
      toast.dismiss(toastId.current);
    },
  });

  function onValid(data) {
    toastId.current = toast.custom((t) => (
      <CustomToast t={t} message="your cabin is creating..." type="loading" />
    ));
    // console.log({ ...data, image: data.image[0] });

    mutate({ ...data, image: data.image[0] });
  }
  function onInValid(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onValid, onInValid)}>
      <FormRow error={errors?.name?.message} label="Cabin Name">
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is requiered!",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          accept="image/*"
          id="image"
          {...register("image", {
            required: "This field is requiered!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button $variation="primary" disabled={isCreating}>
          Create Cabin
        </Button>
      </FormRow>
      {isCreating && <p>it is pending...</p>}
    </Form>
  );
}

export default CreateCabinForm;
