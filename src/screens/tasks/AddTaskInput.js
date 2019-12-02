import React, {Component} from 'react';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView
} from '../../styles';
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  Picker,
  AsyncStorage
} from 'react-native';

export default function AddTaskInput(props) {
  return (
    <KeyboardAvoidingView style={styles.formView}>
      <Text style={styles.subheadText}>New Task</Text>
      <LabelText>About Me:</LabelText>
      <TextInput
        placeholder={props.bio}
        placeholderColor="#c4c3cb"
        style={styles.textInput}
        onChange={props.handleBioChange}
        defaultValue={props.bio}
      />

      <TouchableHighlight
        style={styles.button}
        underlayColor="white"
        onPress={props.handleSubmit}
      >
        <Text style={styles.buttonText}>Update Bio</Text>
      </TouchableHighlight>
    </KeyboardAvoidingView>
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
    fontSize: 20
    // fontFamily: 'Helvetica'
  }
});
