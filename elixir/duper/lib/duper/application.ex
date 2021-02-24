defmodule Duper.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      Duper.Results,
      { Duper.PathFinder, "/Users/deividy/dev/lab/elixir/duper" },
      Duper.WorkerSupervisor,
      { Duper.Gatherer, 1 }
    ]

    opts = [strategy: :one_for_all, name: Duper.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
