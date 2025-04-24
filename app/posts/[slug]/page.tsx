import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  return { title: post.title }
}

const convertAuthorToName = (author: string) => {
  return {
    "matv": "Mathew Varughese",
    "bibek": "Bibek Ghimire",
  }[author] || author
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  const Content = getMDXComponent(post.body.code)

  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-600">By {convertAuthorToName(post.author)}</p>
      </div>
      <div className="prose prose-lg">
        <Content />
      </div>
      {post.tags && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export default PostLayout
