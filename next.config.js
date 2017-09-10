module.exports = {
  // This makes it possible to statically export your application,
  // just in case you don't have the ability to run Node on your production system.
  exportPathMap: () => ({
    '/': {page: '/'}
  })
}
