import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function taskAlreadyExists(newTitle: string): boolean {
    const tasksWithSameTitlte = tasks.find((item) => item.title == newTitle)
    if (tasksWithSameTitlte) {
      Alert.alert('Task já Cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome', [{ text: 'Ok' }], { cancelable: true })
      return true
    }
    return false
  }

  function handleAddTask(newTaskTitle: string) {
    if (taskAlreadyExists(newTaskTitle)) return;

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedList = tasks.map((item) => {
      return item.id == id ? {
        ...item,
        done: !item.done
      } : item
    })
    setTasks(updatedList)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover Item',
      'Tem certeza que você deseja remover esse item?', [
      {
        text: 'No',
        onPress: () => { }
      }, {
        text: 'Yes',
        onPress: () => {
          setTasks(oldState => oldState.filter((item) => item.id != id))
        }
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string): boolean {
    if (taskAlreadyExists(taskNewTitle)) return false;

    const editedList = tasks.map((item) => {
      return item.id == taskId ? {
        ...item,
        title: taskNewTitle
      } : item
    })
    setTasks(editedList)
    return true;
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})