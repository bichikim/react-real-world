/**
 * configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* your site config here */
  plugins: [
    {
      options: {
        // defaults to "React"
        allExtensions: true,

        isTSX: true,
        // defaults to false
        jsxPragma: 'jsx', // defaults to false
      },
      resolve: 'gatsby-plugin-typescript',
    },
  ],
}
