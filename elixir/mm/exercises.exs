defmodule SumRecursively do
  def sum(0), do: 0
  def sum(n), do: n + sum(n - 1)
end

defmodule GcdModule do
  def gcd(x, 0), do: x
  def gcd(x, y), do: gcd(y, rem(x, y))
end
