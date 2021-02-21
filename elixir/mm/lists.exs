defmodule IHaveAList do
  def len([]), do: 0
  def len([ _head | tail ]), do: 1 + len(tail)

  def map([], _fun), do: []
  def map([ head | tail ], func), do: [ func.(head) | map(tail, func) ]

  def add(list, number) do
    map(list, fn (n) -> n + number end)
  end

  def square(list), do: map(list, &(&1 * &1))

  def reduce([], value, _fun), do: value
  def reduce([ head | tail ], value, func) do
    reduce(tail, func.(head, value), func)
  end

  def mapsum([], _func), do: 0
  def mapsum([ head | tail ], func) do
    func.(head) + mapsum(tail, func)
  end

  defp maxn(a, b) when a > b, do: a
  defp maxn(a, b) when a < b, do: b

  def max([ x ]), do: x
  def max([ head | tail ]) do
    maxn(head, max(tail))
  end

  def caesar([], _n), do: []
  def caesar([ head | tail ], n)
  when head + n <= ?n do
    [ head + n | caesar(tail, n) ]
  end

  def caesar([ head | tail ], n) do
    [ head + n - 26 | caesar(tail, n) ]
  end
end

IO.puts(IHaveAList.caesar('ryvkve', 13))
