import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export const AuthorPageTemplate = ({ name, twitterHandle, posts }) => {
	console.log(posts);
	return (
		<section className='section'>
			<div className='container content'>
				<div className='columns'>
					<div className='column is-10 is-offset-1'>
						<h1 className='title-font is-size-2 has-text-weight-bold is-bold-light'>
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
	twitterHandle: PropTypes.string,
	name: PropTypes.string,
};

const AuthorPage = ({ data }) => {
	const { markdownRemark: author, blogPosts } = data;

	return (
		<Layout>
			<AuthorPageTemplate
				name={author.frontmatter.name}
				twitterHandle={author.frontmatter.twitterHandle}
				posts={blogPosts}
			/>
		</Layout>
	);
};

AuthorPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
		blogPosts: PropTypes.object,
	}),
};

export default AuthorPage;

export const pageQuery = graphql`
	query AuthorByID($id: String!) {
		blogPosts: allMarkdownRemark(
			filter: {
				frontmatter: { templateKey: { eq: "blog-post" }, author: { ne: null } }
			}
		) {
			edges {
				node {
					id
					frontmatter {
						title
						author {
							id
							frontmatter {
								name
							}
						}
					}
				}
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				name
				twitterHandle
			}
		}
	}
`;
