import { List, ListItem, IconButton, Checkbox, ListItemText } from "@mui/material";
import { ITODOListItem } from "./TodoParentComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ITodoListComponentProps {
    list: ITODOListItem[];
    onEdit: (id: string) => void;
    onCheck: (id: string, checked: boolean) => void;
    onDelete: (id: string) => void;
}

function TodoListComponent(props: ITodoListComponentProps) {
    return (
        <List>
            {
                props.list.map(el => {
                    return (
                        <ListItem
                            key={el.id}
                            component="a"
                            href="#simple-list"
                            secondaryAction={
                                <div style={{ display: "flex", justifyContent: "center", columnGap: "10px" }}>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => props.onEdit(el.id)}
                                        disabled={el.comleted}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <Checkbox
                                        edge="end"
                                        onChange={(e, checked) => props.onCheck(el.id, checked)}
                                        checked={el.comleted}
                                        inputProps={{ 'aria-labelledby': el.id }}
                                    />
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => props.onDelete(el.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            }>
                            <ListItemText primary={el.text} />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default TodoListComponent;