module.exports = {
  siteMetadata: {
    title: "notes.salrahman.com",
    description: `Notes on code. My  second brain, by Sal Rahman.`,
    keywords: [],
    author: "Sal Rahman",
  },
  plugins: [
    {
      resolve: "gatsby-theme-code-notes",
      options: {
        contentPath: "notes",
        basePath: "/",
        gitRepoContentPath:
          "https://github.com/shovon/notes.salrahman.com/tree/master/notes/",
        showThemeInfo: true,
        showDescriptionInSidebar: true,
        openSearch: {
          siteShortName: `Sal's code notes`,
          siteUrl: "https://notes.salrahman.com",
          siteTags: "front-end",
          siteContact: "https://twitter.com/shovnr",
          siteDescription: "A place to jot down notes for my code",
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sal's Code Notes`,
        short_name: `CodeNotes`,
        description: `Notes on code. My second brain.`,
        start_url: `/`,
        background_color: `hsl(210, 38%, 95%)`,
        theme_color: `hsl(345, 100%, 69%)`,
        display: `standalone`,
        icon: `static/logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`, `/tag/*`],
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `notes.salrahman.com`,
        customDomain: `stats.salrahman.com`,
      },
    },
  ],
};
