defmodule PhxOembed.Plugs.Authorization do
  require Logger
  import Plug.Conn

  def init(default), do: default

  def call(conn, _) do
    conn |> authorize(conn.private[:phoenix_controller], conn.private[:phoenix_action])
  end

  defp authorize(conn, PhxOembed.Api.SiteController, :show) do
    conn |> authorize_by_resource
  end

  defp authorize(conn, PhxOembed.Api.SiteController, :index) do
    assign(conn, :authorization_performed, true)
  end

  defp authorize(conn, PhxOembed.Api.SiteController, :create) do
    assign(conn, :authorization_performed, true)
  end

  defp authorize(conn, PhxOembed.Api.CardController, :create) do
    conn |> authorize_by_resource
  end

  defp authorize(conn, PhxOembed.Api.CardController, :index) do
    conn |> authorize_by_resource
  end

  defp authorize(conn, PhxOembed.Api.CardController, :update) do
    conn |> authorize_by_resource
  end

  defp authorize(conn, PhxOembed.Api.CardController, :delete) do
    conn |> authorize_by_resource
  end

  defp authorize(conn, _, _) do
    conn
    |> assign(:authorization_performed, true)
    |> put_status(:forbidden)
    |> halt
  end

  defp authorize_by_resource(conn) do
    if (conn.assigns[:user].id == conn.assigns[:authorizing_resource].user_id) do
      assign(conn, :authorization_performed, true)
    else
      conn
      |> assign(:authorization_performed, true)
      |> put_status(:forbidden)
      |> halt
    end
  end
end
