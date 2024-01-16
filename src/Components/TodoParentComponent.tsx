import { Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoListComponent from "./TodoListComponent";

export interface ITODOListItem {
    id: string;
    text: string;
    comleted: boolean;
}

function TodoParentComponent() {
    const didMount = useRef(false);
    const [list, setList] = useState<ITODOListItem[]>(localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list") as string) : []);
    const [todoText, setTodoText] = useState<string>("");
    const [updateId, setUpdateId] = useState<string | null>(null);

    useEffect(() => {
        console.log("useEffect that updates list");
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        console.log("Local storage updated!");
        localStorage.setItem("list", JSON.stringify(list));
    }, [list])

    function handleTODOAction(): void {
        if (!updateId) {
            if (todoText.trim() !== "") {
                const isDuplicate = list.find(el => el.text === todoText);
                if (!isDuplicate) {
                    setList(old => ([
                        ...old,
                        {
                            comleted: false,
                            id: uuidv4(),
                            text: todoText
                        }
                    ]));
                    setTodoText("");
                }
            }
        }
        else {
            const newTodos = list.map((todo) => {
                if (todo.id === updateId) {
                    return { ...todo, text: todoText };
                }
                return todo;
            });
            setList(newTodos);
            setTodoText("");
            setUpdateId(null);
        }
    }

    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    }

    const handleTodoActionClick = (e: React.MouseEvent) => {
        handleTODOAction();
    }

    const handleTodoCheckboxChange = (id: string, checked: boolean) => {
        const newTodos = list.map((todo) => {
            if (todo.id === id) {
                return { ...todo, comleted: checked };
            }
            return todo;
        });
        setList(newTodos);
    }

    const handleDeleteTodo = (id: string) => {
        const newTodos = list.filter((todo) => todo.id !== id);
        setList(newTodos);
        setUpdateId(null);
    }

    const handleTodoInputKeyUp = (e: React.KeyboardEvent) => {
        if (e.code === "Enter") {
            handleTODOAction();
        }
    }

    const handleTodoEditClick = (id: string) => {
        setUpdateId(id);

        const searchedElement = list.find(el => el.id === id);
        setTodoText(searchedElement ? searchedElement.text : "<NOT FOUND>");
    }

    return (
        <div className="TodoComponent">
            <div style={{ display: "flex", justifyContent: "center", columnGap: "10px" }}>
                <TextField
                    id="outlined-basic"
                    label="Enter what to do..."
                    variant="outlined"
                    value={todoText}
                    onChange={handleTodoChange}
                    onKeyUp={handleTodoInputKeyUp}
                />
                <Button
                    variant="contained"
                    onClick={handleTodoActionClick}>{updateId ? "Update TODO" : "Add TODO"}</Button>
            </div>

            <TodoListComponent onDelete={(id) => handleDeleteTodo(id)} onEdit={(id) => handleTodoEditClick(id)} onCheck={(id, checked) => handleTodoCheckboxChange(id, checked)} list={list} />

        </div >
    )
}

export default TodoParentComponent;