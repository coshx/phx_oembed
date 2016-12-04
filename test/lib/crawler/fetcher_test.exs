# Unit test for the url fetcher component of the crawler library

defmodule PhxOembed.Crawler.FetcherTest do
  use ExUnit.Case
  alias PhxOembed.Crawler.Fetcher


  test "should return an html string" do
    test_html = ~s"""
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\r
<html>\r
<head>\r
<title>Test HTML File</title>\r
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />\r
</head>\r
<body>\r
\r
<p>This is a very simple HTML file.</p>\r
\r
</body>\r
</html>\r
    """
    fetched = Fetcher.fetch_url("http://www.brainjar.com/java/host/test.html")
    assert test_html == fetched
  end
end
