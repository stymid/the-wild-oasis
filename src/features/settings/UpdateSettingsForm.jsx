import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useEditSetting";
import useSetting from "./useSetting";

function UpdateSettingsForm() {
  const {
    isLoadingSetting,
    setting: {
      brekfastPrice,
      maxBookingLength,
      maxGuestPerBooking,
      minBookingLength,
    } = {},
  } = useSetting();
  const { isPending, updateSetting } = useUpdateSetting();

  function handleUpdate(name, value) {
    if (!value) return;
    updateSetting({ [name]: value });
  }
  if (isLoadingSetting) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isPending}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate("minBookingLength", e.target.value)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isPending}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate("maxBookingLength", e.target.value)}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isPending}
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdate("maxGuestPerBooking", e.target.value)}
          type="number"
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isPending}
          defaultValue={brekfastPrice}
          onBlur={(e) => handleUpdate("brekfastPrice", e.target.value)}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
