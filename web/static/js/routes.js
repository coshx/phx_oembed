const Routes = {

  session: () => { return("/api/v1/sessions"); },

  currentUser: () => { return("/api/v1/current_user"); },

  sites: () => { return("/api/v1/sites"); },

  cards: (siteId) => { return(Routes.sites() + "/" + siteId + "/cards") }
};

export default Routes;
