import type React from "react";
import type { Todo } from "@/lib/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTask }) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 mb-1 rounded-md hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <p
          className={`text-base truncate ${
            todo.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {todo.title}
        </p>
        <span className="text-xs text-muted-foreground ml-auto shrink-0">
          {todo.inserted_at}
        </span>
      </div>
      <Checkbox
        className="h-4 w-4 ml-2 shrink-0"
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
      />
      <Trash2
        className="h-4 w-4 ml-2 shrink-0 cursor-pointer"
        onClick={() => deleteTask(todo.id)}
      />
    </div>
  );
};

export default TodoItem;
