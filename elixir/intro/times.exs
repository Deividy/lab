defmodule Times do
  def double(n) do
    n * 2
  end

  def triple(n), do: n * 3

  def crazy(n1, n2), do: (
    IO.puts(n1)
    IO.puts(n2)
  )

  def quadruple(n) do
    Times.double(n) * Times.double(n)
  end
end

defmodule Times2, do: (def double(n), do: n * 2)
