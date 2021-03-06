import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView,
  TopHeaderText,
  TopHeader
} from '../../styles';
import {
  AsyncStorage
} from 'react-native';
import {newTask} from '../../api/TaskRoute';
import AddTaskInput from '../../screens/tasks/AddTaskInput';
import {addTaskThunk} from '../../store/user';
import TasksHeader from './TasksHeader';


class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: 'Exercise',
      id: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  async handleSubmit(evt) {
    const { navigate } = this.props.navigation;
    evt.preventDefault();
    const userKey = await AsyncStorage.getItem('userKey');
    await newTask(userKey, this.state);
    this.props.addTaskDispatcher(this.state);
    this.setState({ name: '', category: 'Exercise' });
    navigate('TaskList');
  }

  handleCategoryChange = category => {
    this.setState({ category: category });
  };

  handleNameChange = event => {
    let name = event.nativeEvent.text;
    this.setState({ name: name });
  };

  componentDidMount() {
    const test = this.props.user.incompleteTasks.length;
    let tasksArr = this.props.user.incompleteTasks;
    let newTaskId = test ? tasksArr[tasksArr.length-1].id + 1 : 0;
    this.setState({id: newTaskId})
  }

  render() {
    return (
      <PageWrapperView>
        <TopHeader>
          <TopHeaderText>Add A New Task</TopHeaderText>
          <TasksHeader />
        </TopHeader>
          <AddTaskInput
            handleSubmit={this.handleSubmit}
            handleCategoryChange={this.handleCategoryChange}
            handleNameChange={this.handleNameChange}
            name={this.state.name}
            category={this.state.category}
          />
      </PageWrapperView>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    addTaskDispatcher: (task) => dispatch(addTaskThunk(task))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (AddTask);
