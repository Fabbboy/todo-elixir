import { Card, CardContent } from "@/components/ui/card";
import { Todo } from "@/lib/task";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
};

const TodoItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <Card className="bg-neutral-800 text-neutral-100 p-4 mb-4">
      <CardContent className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4 items-center">
          <p className="text-lg font-normal">{todo.title}</p>
          <p className="text-sm font-normal">{todo.inserted_at}</p>
        </div>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
        />
      </CardContent>
    </Card>
  );
};

export default TodoItem;
