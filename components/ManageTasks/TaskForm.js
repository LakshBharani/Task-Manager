import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../utility/date";
import { GlobalStyles } from "../../constants/styles";
import { useDarkMode } from "../../store/darkmode-context";

const TaskForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const { isDarkMode } = useDarkMode();

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const taskData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const estimatedTimeIsValid = !isNaN(taskData.amount) && taskData.amount > 0;
    const dateIsValid = taskData.date.toString() !== "Invalid Date";
    const descriptionIsValid = taskData.description.trim().length > 0;

    if (!estimatedTimeIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => {
        return {
          amount: {
            value: currInputs.amount.value,
            isValid: estimatedTimeIsValid,
          },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(taskData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text
        style={[
          styles.title,
          !isDarkMode && { color: GlobalStyles.lightColors.textColor },
        ]}
      >
        Your Task
      </Text>
      <View style={styles.inputsRow}>
        <Input
          label="Estimated Time (hours)"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Due Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={[styles.errorText]}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode={"flat"} onPress={onCancel} style={styles.button}>
          <Text style={!isDarkMode && {color: GlobalStyles.lightColors.gray500}}>Cancel</Text>
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.darkColors.error500,
    margin: 8,
  },
});
