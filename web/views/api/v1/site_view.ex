defmodule PhxOembed.Api.SiteView do
  use PhxOembed.Web, :view

  def render("show.json", %{site: site}) do
    %{
      id: site.id,
      domain: site.domain,
      protocol: site.protocol
    }
  end

  def render("index.json", %{sites: sites}) do
    render_many(sites, PhxOembed.Api.SiteView, "show.json")
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end
end
