defmodule SumRecursively do
  def sum(0), do: 0
  def sum(n), do: n + sum(n - 1)
end

defmodule GcdModule do
  def gcd(x, 0), do: x
  def gcd(x, y), do: gcd(y, rem(x, y))
end

defmodule Chop do
  def guess(actual, actual.._min), do: "You found it #{actual}"
  def guess(actual, _min..actual), do: "You found it #{actual}"

  def guess(actual, _min..max) when max < actual, do: guess(actual, max..max * 2)
  def guess(actual, min.._max) when min > actual, do: guess(actual, min - 1..min)

  def guess(actual, min..max) do
    my_guess = div(min + max, 2)
    IO.puts("Is it #{my_guess}?")

    guess(actual, min..my_guess)
  end
end
