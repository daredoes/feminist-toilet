module.exports = {
	siteMetadata: {
		title: 'Feminist Toilet',
		description: "Toilets are the ultimate feminists. Tell me one person you know that doesn't shit. Exactly. Everyone has experiences with toilets. They are liminal spaces where society meets humanity - where we let our animal side out. I mean it's a bit weird what happens in those sanitary sanctuaries, and yet never talk about it. It's fucking earthly in there. I think what happens in toilets is beautiful. It is the place one can be most vulnerable. It is a safe space, a private place in a public world.\n Please enjoy these poems, prose pieces, essays, images, and artwork inspired by the toilet, our beloved porcelain deity. ",
	},
	mapping: {
		'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.name`,
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/img`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-relative-images',
						options: {
							name: 'uploads',
						},
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 2048,
						},
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: {
							destinationDir: 'static',
						},
					},
				],
				excerpt_separator: `<!-- end -->`,
			},
		},
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		'gatsby-plugin-purgecss', // must be after other CSS plugins
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
};
