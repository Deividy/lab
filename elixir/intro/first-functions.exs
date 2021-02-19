handle_open = fn
  { :ok, file } -> "Read data: #{IO.read(file, :line)}"
  { _, error } -> "Error: #{:file.format_error(error)}"
end

IO.puts(handle_open.(File.open("FOO")))
IO.puts(handle_open.(File.open("intro/hello.exs")))
IO.puts('\n');

test = fn
  { :ok } -> "All good man"
  { :error } -> "Something definitely wrong"
  { :warning, message } -> "Hello #{message}"
  a -> "What #{a}"
end

IO.puts(test.({ :ok }))
IO.puts(test.({ :error }))
IO.puts(test.({ :warning, "FUUUUU" }))
IO.puts(test.("Doideira"))
IO.puts('\n');

exercise1 = fn
  0, 0, _ -> "FizzBuzzzzzzzz"
  0, _, _ -> "Fizz"
  _, 0, _ -> "Buzz"
  _, _, n -> n
end

IO.puts(exercise1.(0, 0, 5));
IO.puts(exercise1.(0, 5, 5));
IO.puts(exercise1.(1, 0, 5));

exercise2 = fn
  n -> exercise1.(rem(n, 3), rem(n, 5), n)
end

Enum.each(10..16, fn n -> IO.puts(exercise2.(n)) end)

IO.puts('\n');
IO.puts('\n');

greeter = fn
  name -> (fn greeting -> "Hello #{name}, #{greeting}" end)
end

deividy_greeter = greeter.("Deividy")
IO.puts(deividy_greeter.("como vas?"))

add_n = fn n -> (fn other -> n + other end) end

add_two = add_n.(2)
add_seven = add_n.(7)

IO.puts('\n')
IO.puts(add_two.(4))
IO.puts(add_seven.(9))

prefix = fn pfx -> (fn name -> "#{pfx} #{name}" end) end

mrs = prefix.("Mrs")
IO.puts(mrs.("Smith, Constantine"))
IO.puts(prefix.("TMJ").("MANO VEIO"))


times_2 = fn n -> n * 2 end
apply = fn fun, value -> fun.(value) end

IO.puts(apply.(times_2, 6))
IO.puts(apply.((fn a -> a * 12 end), 6))

IO.puts('\n');
IO.puts('\n');

list = [ 1, 2, 3, 4, 5 ]
Enum.map list, (fn el -> IO.puts(el * el + 3) end)

IO.puts('\n');

add_one = &(&1 + 1)
IO.puts(add_one.(6))
IO.puts(add_one.(419))

square = &(&1 * &1)
IO.puts(square.(8))


# cool
IO.puts('\n')
IO.puts(inspect(speak = &(IO.puts(&1))))
IO.puts(inspect(rnd = &(Float.round(&1, &2))))
IO.puts(inspect(rnd = &(Float.round(&2, &1))))


IO.puts('\n')

divrem = &{ div(&1, &2), rem(&1, &2) }
divrem.(13, 5)

concat = &("#{&1} #{&2}")
IO.puts(concat.("hi", "bar"))

match_end = &~r/.*#{&1}$/
IO.puts("\n")
IO.puts("cat" =~ match_end.("t") and "All good")
IO.puts("cat" =~ match_end.("!") or "Not matched")


IO.puts("\n")
IO.puts(inspect(l = &length/1))
IO.puts(inspect(len = &Enum.count/1))
IO.puts(inspect(m = &Kernel.min/2))

IO.puts("\n")
Enum.map [ 1, 2, 3 ], &(IO.puts(&1 + 100))
Enum.map [ 1, 2, 3 ], &(IO.puts(&1 * 1))
IO.puts("\n")
Enum.map [ 1, 2, 3 ], &(IO.puts(&1 <= 2 && "OK" || "NOT"))

IO.puts("\n")

Enum.map [ 1, 2, 3, 4 ], &(IO.puts(&1 + 2))
IO.puts("\n")
Enum.map [ 1, 2, 3, 4 ], &(IO.inspect(&1))
