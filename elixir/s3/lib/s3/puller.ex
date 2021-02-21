defmodule S3.Puller do
  @base_cache_path "cache"

  def list_all(bucket, prefix) do
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

