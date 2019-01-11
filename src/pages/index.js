import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;

		return (
			<Layout>
				<section className='section'>
					<div className='container'>
						<div className='content'>
							<h1 className='title-font has-text-centered has-text-weight-bold is-size-1'>The Toilet Papers</h1>
						</div>
						{posts.map(({ node: post }) => (
							<div
								className='content postContent'
								key={post.id}
							>
								<p className="post-info">
									<Link className='has-text-primary' to={post.fields.slug}>
										{post.frontmatter.title}
									</Link>
									<span> &bull; </span>
									{post.frontmatter.author && (
										<Link
											className='has-text-secondary'
											to={post.frontmatter.author.fields.slug}
										>
											{post.frontmatter.author.frontmatter.name}{' '}
										</Link>
									)}
									{post.frontmatter.author && <span> &bull; </span>}
									<small>{post.frontmatter.date}</small>
								</p>
								<p className="post">
									{post.frontmatter.description || post.excerpt}
									<br />
									<br />
									<Link className='button is-small' to={post.fields.slug}>
										Keep Reading →
									</Link>
								</p>
							</div>
						))}
					</div>
				</section>
			</Layout>
		);
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
};

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" }, image: { eq: null } } }
		) {
			edges {
				node {
					id
					excerpt(pruneLength: 400)
					fields {
						slug
					}
					frontmatter {
						title
						templateKey
						date(formatString: "MMMM DD, YYYY")
						description
						author {
							fields {
								slug
							}
							frontmatter {
								name
							}
						}
					}
				}
			}
		}
	}
`;
