defmodule PhxOembed.Router do
  use PhxOembed.Web, :router

  pipeline :oembed do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/oembed", PhxOembed do
    pipe_through :oembed

    resources "/sites", Oembed.SiteController, only: [] do
      get "/cards", Oembed.CardController, :show
    end
  end

  scope "/", PhxOembed do
    pipe_through :browser
    get "/", PageController, :index
  end

  scope "/api", PhxOembed do
    pipe_through :api
    scope "v1" do
      post      "/sessions",      Api.SessionController, :create
      delete    "/sessions",      Api.SessionController, :delete
      get       "/current_user",  Api.CurrentUserController, :show
      resources "/sites",         Api.SiteController, except: [:new, :edit] do
        resources "/cards",       Api.CardController, except: [:new, :edit]
      end
    end
  end
end
