export const getLoginPage = () => "/vilagszep/mesetar/login";

export const getAppBarPage = () => "/vilagszep/mesetar/app";

export const getHomePage = () => "/vilagszep/mesetar/app/otthon";

export const getSearchedStoriesPage = (search) => search ? `/vilagszep/mesetar/app/mesek/${search}` : `/vilagszep/mesetar/app/mesek/:search`;

export const getFavouritesPage = () => "/vilagszep/mesetar/app/kedvencek";

export const getStoryPage = (publicId) => publicId ? `/vilagszep/mesetar/app/mese/${publicId}` : `/vilagszep/mesetar/app/mese/:publicId`

export const getUsersForAdminPage = () => "/vilagszep/mesetar/app/admin/felhasznalok";

export const getStoriesForAdmin = () => "/vilagszep/mesetar/app/admin/mesek";

export const getFilteredAndSearchedStoriesPage = (filter, search) => filter ? `/vilagszep/mesetar/app/mesek/filter/${filter}/search/${search}` : `/vilagszep/mesetar/app/mesek/filter/:filter/search/:search`