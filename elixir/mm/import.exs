defmodule OneExample do
  def func1 do
    List.flatten([1, [ 2, 3 ], 4 ])
  end

  def func2 do
    import List, only: [ flatten: 1 ]
    flatten([ 5, [ 6, 7 ], 8 ])
  end
end

defmodule Appender do
  def append_number(list, number), do: list ++ [ number ]
end

defmodule Summer do
  def sum_list(list), do: Enum.reduce(list, &(&1 + &2))
end

defmodule ExampleTwo do
  import Summer, only: [ sum_list: 1 ]
  alias Appender, as: A

  def add_five_and_sum(list) do
    A.append_number(list, 5) |> sum_list
  end
end

defmodule AttributesExample do
  @me "deividy"
  def first, do: @me

  @me "speedy"
  def second, do: @me
end

IO.puts(is_atom(IO))
IO.puts(to_string(IO))
IO.puts(:"Elixir.IO" === IO)

IO.puts(123)
:"Elixir.IO".puts(123)

speedy_io = IO
speedy_io.puts(123)

IO.puts([ 99, 97, 116 ])
