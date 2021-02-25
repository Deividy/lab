defmodule Canvas do
  @defaults [ fg: "black", bg: "white", font: "Merrieweather" ]

  def draw_text(text, options \\ []) do
    options = Keyword.merge(@defaults, options)
    IO.puts("Drawing text #{inspect(text)}")
    IO.puts("Foreground: #{options[:fg]}")
    IO.puts("Background: #{Keyword.get(options, :bg)}")
    IO.puts("Font: #{Keyword.get(options, :font)}")
    IO.puts("Pattern: #{Keyword.get(options, :pattern, "solid")}")
    IO.puts("Style: #{inspect(Keyword.get_values(options, :style))}")
  end
end

Canvas.draw_text("heeey", fg: "red", style: "bold", style: "strike")

fellowship = [
  %{ name: 'Bilbo', age: 60 },
  %{ name: 'Frodo', age: 51 },
  %{ name: 'Aragorn', age: 88 }
]

IO.inspect(for folk = %{ age: age } <- fellowship, age < 60, do: folk)

defmodule HotelRoom do
  def book(%{ name: name, age: age }) when age > 55 do
    IO.puts("Need extra-long bed for #{name}")
  end

  def book(%{ name: name, age: age }) when age < 55 do
    IO.puts("Need low shower controls for #{name}")
  end

  def book(person) do
    IO.puts("Need regular bed for #{person.name}")
  end
end

fellowship |> Enum.each(&HotelRoom.book/1)

%{ 2 => state } = %{ 1 => :ok, 2 => :error }


some_data = %{ name: "foo", bar: "zaz", zaz: "sas" }
for key <- [ :name, :bar ] do
  %{ ^key => value } = some_data
  value
end
|> IO.inspect()

m = %{ a: 1, b: 2, c: 3 }
m1 = %{ m | b: "dos", c: "tres" }

m1 |> IO.inspect()
