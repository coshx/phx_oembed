defmodule PhxOembed.Router do
  use PhxOembed.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PhxOembed do
    pipe_through :api

    resources "/sites", SiteController, only: [] do
      get "/cards", CardController, :show
    end
  end
end
