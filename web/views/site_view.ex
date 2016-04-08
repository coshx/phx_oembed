defmodule PhxOembed.SiteView do
  use PhxOembed.Web, :view

  def render("show.json", %{site: site}) do
    %{
      domain: site.domain,
      protocol: site.protocol
    }
  end

  def render("index.json", %{sites: sites}) do
    render_many(sites, PhxOembed.SiteView, "show.json")
  end
end
