# PhxOembed
[![Circle CI](https://circleci.com/gh/coshx/phx_oembed.svg?style=svg)](https://circleci.com/gh/coshx/phx_oembed)

This is an [oEmbed](http://oembed.com/) server built with the Phoenix web
framework. It supports multiple sites or domains, and returns responses in JSON
or xml. The default is JSON, but requests take an optional format parameter to
specify xml

## Site
Sites have domain and protocol attributes, the protocol defaults to "http". A
site has many Cards

## Card
Cards represent actual pages and hold most of the information returned. A Card
belongs to a Site.

## Paths
Requests for a card should be in the form of a GET request to
`sites/:site_id/card?url="https://example.com/cats"`

This maps to request for a Card belonging to a Site with id `site_id`. The
matching Card's path attribute would be "cats".
