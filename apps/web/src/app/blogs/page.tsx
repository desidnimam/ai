import type { Metadata, ResolvingMetadata } from "next";
import { BlogFilteredPosts } from "@/components/mdx/filtered-posts";
import PageTitle from "@/components/mdx/page-title";
import site from "@/config/site";
import { getAllBlogPosts } from "@/lib/mdx";

export const runtime = "edge";
const title = "Blog - Ali Imam";
const description =
  "My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a full-stack developer from Hong Kong, I started learning web development as a hobby in December 2023. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me.";

interface BlogPageProps {
  params: Record<string, never>;
  searchParams: Record<string, never>;
}

export const generateMetadata = async (
  _: BlogPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {};

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}/blogs`,
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${site.url}/blogs`,
      title,
      description,
    },
  };
};

const BlogPage = () => {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto my-40 max-w-5xl px-6">
      <PageTitle
        title="Blogs"
        description={`I started writing articles in December 2023, mainly about graphic Design and
        sharing knowledge. I have written a total of ${posts.length} articles on
        my blogs. You can search for articles by title in the search box below.`}
      />
      <BlogFilteredPosts posts={posts} />
    </div>
  );
};

export default BlogPage;
