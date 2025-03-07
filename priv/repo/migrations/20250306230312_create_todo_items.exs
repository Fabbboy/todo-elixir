defmodule Todo.Repo.Migrations.CreateTodoItems do
  use Ecto.Migration

  def change do
    create table(:todos, primary_key: false) do
      add :id, :integer, primary_key: true, autoincrement: true
      add :title, :string, null: false
      add :completed, :boolean, default: false, null: false

      timestamps()
    end
  end
end
