defmodule Duper.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      Duper.Results,
      { Duper.PathFinder, "." }
    ]

    opts = [strategy: :one_for_one, name: Duper.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
