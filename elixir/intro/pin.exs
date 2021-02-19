defmodule Greeter do
  def for(name, greeting) do
    fn
      ^name -> "#{greeting} #{name}"
      _ -> "Who are you?"
    end
  end
end

mr_speedy = Greeter.for("Speedy", "Hi, master")

IO.puts(mr_speedy.("Speedy"))
IO.puts(mr_speedy.("Deividy"))

