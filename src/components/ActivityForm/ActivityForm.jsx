import { useForm } from "react-hook-form";

import React from "react";
import Button from "../Button/Button";
import {
  FormWrapper,
  SelectInput,
  TextInput,
  TimerWrapper,
} from "./ActivityForm.style";

const ActivityForm = ({ onAddItem }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    onAddItem({
      name: data.activityName,
      seconds: data.minutes * 60 + Number(data.seconds),
    });
  };

  return (
    <FormWrapper>
      <label>Activity</label>
      <TextInput
        {...register("activityName", { required: true, maxLength: 20 })}
      />
      <TimerWrapper>
        <label htmlFor="minutes">Minutes:</label>
        <SelectInput {...register("minutes")} name="minutes" id="minutes">
          {[...new Array(60)].map((item, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </SelectInput>
        <label htmlFor="seconds">Seconds:</label>
        <SelectInput {...register("seconds")} name="seconds" id="seconds">
          {[...new Array(60)].map((item, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </SelectInput>
      </TimerWrapper>
      <Button text="Add to workout" onClick={handleSubmit(onSubmit)} />
    </FormWrapper>
  );
};

export default ActivityForm;
