import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const AuthorPageTemplate = ({ name, twitterHandle }) => {
	return (
		<section className='section'>
			{helmet || ''}
			<div className='container content'>
				<div className='columns'>
					<div className='column is-10 is-offset-1'>
						<h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
							{name}
						</h1>
						<p>{twitterHandle}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

AuthorPageTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.object,
};

const AuthorPage = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<BlogPostTemplate
				content={post.html}
				contentComponent={HTMLContent}
				description={post.frontmatter.description}
				helmet={
					<Helmet titleTemplate='%s | Blog'>
						<title>{`${post.frontmatter.title}`}</title>
						<meta
							name='description'
							content={`${post.frontmatter.description}`}
						/>
					</Helmet>
				}
				tags={post.frontmatter.tags}
				title={post.frontmatter.title}
			/>
		</Layout>
	);
};

AuthorPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
};

export default AuthorPage;

export const pageQuery = graphql`
	query AuthorByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				title
				description
			}
		}
	}
`;
