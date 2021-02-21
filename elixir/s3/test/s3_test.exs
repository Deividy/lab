defmodule S3Test do
  use ExUnit.Case
  doctest S3

  test "greets the world" do
    assert S3.hello() == :world
  end
end
