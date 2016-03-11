defmodule PhxOembed.Router do
  use PhxOembed.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/oembed", PhxOembed do
    pipe_through :api

    resources "/sites", SiteController, only: [] do
      get "/cards", CardController, :show
    end
  end

  scope "/", PhxOembed do
    pipe_through :browser
    get "/", PageController, :index
  end

  scope "/api", PhxOembed do
    pipe_through :api
    scope "v1" do
      post "/sessions", SessionController, :create
      delete "/sessions", SessionController, :delete
    end
  end
end
