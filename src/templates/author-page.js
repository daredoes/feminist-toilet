import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export const AuthorPageTemplate = ({ name, twitterHandle }) => {
	return (
		<section className='section'>
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
	twitterHandle: PropTypes.string,
	name: PropTypes.string,
};

const AuthorPage = ({ data }) => {
	const { markdownRemark: author } = data;

	return (
		<Layout>
			<AuthorPageTemplate
				name={author.frontmatter.name}
				twitterHandle={author.frontmatter.twitterHandle}
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
				name
				twitterHandle
			}
		}
	}
`;
