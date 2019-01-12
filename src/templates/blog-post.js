import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const BlogPostTemplate = ({
	content,
	contentComponent,
	description,
	image,
	tags,
	title,
	helmet,
	author,
}) => {
	const PostContent = contentComponent || Content;

	return (
		<section className='section'>
			{helmet || ''}
			<div className='container content'>
				<div className='columns'>
					<div className='column is-10 is-offset-1'>
						<h1 className='title-font is-size-2 has-text-weight-bold is-bold-light'>
							{title}
						</h1>
						{author && (
							<h4 className='post-info is-size-5 has-text-weight-bold is-bold-light'>
								By{' '}
								<Link to={author.fields.slug}>{author.frontmatter.name}</Link>
							</h4>
						)}
						<hr/>
						{image && (
								<div className=''>
									<div className=''>
										<p className='post has-text-centered'>{description}</p>
									</div>
									<div className='image-holder'>
										<figure className='image'>
											<img className="post-image" src={image.publicURL} />
										</figure>
									</div>
									
								</div>
								)}
						<PostContent content={content} className="post" />
						{tags && tags.length ? (
							<div style={{ marginTop: `4rem` }}>
								<h4>Tags</h4>
								<ul className='taglist'>
									{tags.map(tag => (
										<li key={tag + `tag`}>
											<Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
										</li>
									))}
								</ul>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<BlogPostTemplate
				content={post.html}
				contentComponent={HTMLContent}
				description={post.frontmatter.description}
				image={post.frontmatter.image}
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
				author={post.frontmatter.author}
			/>
		</Layout>
	);
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
				image {
					publicURL
				}
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
`;
