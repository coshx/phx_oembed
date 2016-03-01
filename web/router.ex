defmodule PhxOembed.Router do
  use PhxOembed.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PhxOembed do
    pipe_through :api

    #get "/", CardController, :show
    resources "/sites", SiteController, only: [] do
      resources "/cards", CardController, only: [:index]
    end
  end
end
