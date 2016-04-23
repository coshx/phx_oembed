const Pages = {

  signIn: () => { return("/sign_in") },

  sites: () => { return("/sites") },

  site: (siteId) => { return("/sites/" + siteId) }
}

export default Pages;
