import React, {Component} from 'react';
import {
  PageWrapperKeyboardAvoidingView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView,
  TextInput,
  BlueButton,
  ButtonText,
  Picker
} from '../../styles';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

export default function AddTaskInput(props) {
  return (
    <PageWrapperKeyboardAvoidingView>
      <HeaderText>Add a new task</HeaderText>
      <LabelText>What are you going to do?</LabelText>
      <TextInput
        placeholder="Go to the gym"
        placeholderColor="#c4c3cb"
        onChange={props.handleNameChange}
        defaultValue={props.name}
      />
      <LabelText>What category does it belong to?:</LabelText>
      <Picker
        selectedValue={props.category}
        onValueChange={props.handleCategoryChange}
        mode='dropdown'
      >
        <Picker.Item label="Exercise" value="Exercise" />
        <Picker.Item label="Chores" value="Chores" />
        <Picker.Item label="Social" value="Social" />
      </Picker>

      <BlueButton
        underlayColor="white"
        onPress={props.handleSubmit}
      >
        <ButtonText>Add</ButtonText>
      </BlueButton>
    </PageWrapperKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20
  },
  subheadText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '800',
    textAlign: 'center'
  },
  formView: {
    flex: 1
  },
  textInput: {
    height: 50,
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 5,
    padding: 10,
    borderColor: '#AAE56B',
    backgroundColor: '#fafafa',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 400,
    alignSelf: 'center'
  },
  button: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#2DD1B0',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  addTaskButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: 'yellow',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  buttonText: {
    fontSize: 24,
    color: '#111'
  },
  taskText: {
    fontSize: 20,
    // fontFamily: 'Helvetica'
  }
});
