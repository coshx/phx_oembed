const Pages = {

  signIn: () => { return("/sign_in") },

  sites: () => { return("/sites") },

  site: (siteId) => { return("/sites/" + siteId) },

  card: (siteId, cardId) => { return("/sites/" + siteId + "/cards/" + cardId) }
}

export default Pages;
