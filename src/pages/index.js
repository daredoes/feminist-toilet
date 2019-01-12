import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;
		const { title, description } = data.site.siteMetadata;

		return (
			<Layout>
				<section className='section'>
					<div className='container'>
						<div className='content is-marginless'>
							<div className='post has-text-centered'>{description}</div>
						</div>
						{posts.map(({ node: post }) => (
							<div
								className='content postContent is-marginless columns'
								key={post.id}
							>
								{post.frontmatter.image && (
									<div className='column image-holder'>
										<figure className='image'>
											<img className="post-image" src={post.frontmatter.image.publicURL} />
										</figure>
									</div>
								)}
								<div className='column'>
									<p className="post-header is-marginless">
									<Link className='' to={post.fields.slug}>
											{post.frontmatter.title}
										</Link></p>
									
									{post.frontmatter.description && <p className="post">
										{post.frontmatter.description}
									</p>}
									<p className="post-info">
									<span>By </span>
										{post.frontmatter.author ? (
											<Link
												className='has-text-secondary'
												to={post.frontmatter.author.fields.slug}
											>
												{post.frontmatter.author.frontmatter.name}{' '}
											</Link>
										): <span>Anonymous</span>}
									</p>
								</div>
								
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
		site: PropTypes.object,
	}),
};

export const pageQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title,
				description,
			}
		}
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
						image {
							publicURL
						}
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
