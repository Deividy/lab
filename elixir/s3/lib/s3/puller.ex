defmodule S3.Puller do
  @base_cache_path "cache"

  def download_all_email_json(bucket, prefix) do
    ExAws.S3.list_objects(bucket, prefix: prefix)
    |> ExAws.request!()
    |> get_json_files_from_response()
    |> Enum.map(fn (filepath) ->
        download_file(bucket, filepath)
        |> parse_emails()
        |> write_emails(filepath)
        |> (fn
          (:ok) -> "Cache saved: #{@base_cache_path}/#{filepath}"
          ({ :error, :enoent }) -> "Path don't exist #{filepath}"
          ({ :error, code }) -> "Something wrong at #{filepath}, #{code}"
        end).()
    end)
  end

  def delete_s3_cached_files(bucket, prefix) do
    File.ls("#{@base_cache_path}/#{prefix}")
    |> (fn
        ({ :ok, files }) ->
          files
          |> Enum.map(&("#{prefix}/#{&1}"))
          |> delete_files(bucket)

        ({ :error, :enoent }) -> { :ok, count: 0 }
      end).()
  end

  defp delete_files(file_list, bucket, count \\ 0)
  defp delete_files([], _bucket, count), do: { :ok, count }
  defp delete_files([ head | tail ], bucket, count) do
    ExAws.S3.delete_object(bucket, head)
    |> ExAws.request()
    |> (fn
      ({ :ok, _ }) -> nil
      ({ :error, { :http_error, 404, _ }}) ->
        IO.puts("File #{head}, not found in #{bucket}.")
    end).()

    delete_files(tail, bucket, count + 1)
  end

  defp get_json_files_from_response(%{
    body: %{ contents: contents },
    headers: _,
    status_code: 200
  }) do
    Enum.filter(contents, fn (%{ key: key }) -> Regex.run(~r/.json$/, key) end)
    |> Enum.map(fn (%{ key: key }) -> key end)
  end

  defp write_emails(emails, path) do
    filepath = "#{@base_cache_path}/#{path}"

    # uncomment to fix enoent ;)
    # File.mkdir_p!(Path.dirname(filepath))
    File.write(filepath, Poison.encode!(emails))
  end

  defp download_file(bucket, path) do
    ExAws.S3.download_file(bucket, path, :memory)
    |> ExAws.stream!()
    |> Stream.map(&Poison.decode!/1)
    |> Enum.reduce([], &(&1 ++ &2))
  end

  defp parse_emails(emails) do
    Enum.uniq(emails)
    |> Enum.filter(&(EmailChecker.valid?(&1)))
  end
end

