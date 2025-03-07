import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import axios from "axios";

type Props = {
    addTodo: (title: string) => void;
};

const AddModal: React.FC<Props> = ({ addTodo }) => {
  const [open, setOpen] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) return;

    setIsSubmitting(true);
 
    await addTodo(newTodoTitle);
    setNewTodoTitle("");
    setOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>
            Create a new todo by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createTodo}>
          <div className="py-4">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="mt-1"
              placeholder="Enter todo title"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !newTodoTitle.trim()}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export default AddModal;