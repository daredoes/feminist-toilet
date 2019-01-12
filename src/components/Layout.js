import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          
          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png"/>
          <link rel="manifest" href="/img/site.webmanifest"/>
          <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#5bbad5"/>
          <link rel="shortcut icon" href="/img/favicon.ico"/>
          <meta name="msapplication-TileColor" content="#9f00a7"/>
          <meta name="msapplication-config" content="/img/browserconfig.xml"/>
          <meta name="theme-color" content="#ffffff"/>>

	        <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.png" />
        </Helmet>
        <Navbar />
        <div>{children}</div>
      </div>
    )}
  />
)

export default TemplateWrapper
