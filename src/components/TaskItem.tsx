import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { Task } from "./TasksList";
import trashIcon from '../assets/icons/trash/trash.png'

type TaskItemProps = {
    task: Task,
    index: number,
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => boolean;
}

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEdit() {
        setIsEditing(true)
    }

    function handleCancelEdit() {
        setTitle(task.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        if (!editTask(task.id, title)) setTitle(task.title);
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])
    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        value={title}
                        onChangeText={setTitle}
                        editable={isEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        onSubmitEditing={() => { handleSubmitEditing() }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        testID={`cancel-edit-${index}`}
                        style={{ paddingHorizontal: 12 }}
                        onPress={() => handleCancelEdit()}
                    >
                        <AntDesignIcon name="close" size={22} color={'#b2b2b2'} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        testID={`edit-${index}`}
                        style={{ paddingHorizontal: 12 }}
                        onPress={() => handleStartEdit()}
                    >
                        <AntDesignIcon name="edit" size={22} color={'#b2b2b2'} />
                    </TouchableOpacity>
                )}
                <View style={styles.iconDivisor} ></View>
                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{
                        paddingRight: 24,
                        paddingLeft: 12,
                        opacity: isEditing ? 0.2 : 1
                    }}
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconDivisor: {
        height: 24,
        width: 1,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})