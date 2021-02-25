defmodule Guard do
  def what_is(x) when is_integer(x) and x > 420 do
    what_is(x - 1)
  end

  def what_is(x) when is_integer(x) and x == 420 do
    what_is("Deividy")
  end

  def what_is(x) when is_number(x) do
    IO.puts("#{x} is a number, ma man")
  end

  def what_is(x) when x === "Deividy" do
    IO.puts("HAIL MASTER")
  end

  def what_is(x) when is_bitstring(x) do
    IO.puts("#{x} is a boring bitstring")
  end
end

defmodule Factorial do
  def of(0), do: 1
  def of(n) when is_integer(n) and n > 0 do
    n * of(n - 1)
  end
end

defmodule DefaultParamsIsCool do
  def i_guess(p1, p2 \\ "Hiiii") do
    IO.puts("#{p1}, #{p2}")
  end

  def i_guess(p1, p2) do
    IO.puts("#{p1}, #{p2}")
  end

  def another_example(p1, p2 \\ 123) do
    IO.inspect([ p1, p2 ])
  end

  def another_example(p1, 99) do
    IO.puts("you SAID 99?")
  end
end

defmodule StillTestingDefaultParams do
  def func(p1, p2 \\ 123)
  def func(p1, p2) when is_list(p1) do
    "You said #{p2} with a list"
  end

  def func(p1, p2) do
    "you passed in #{p1} and #{p2}"
  end
end
