import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { Logo } from 'components/Header'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  const Content = getMDXComponent(post.body.code)

  return (
    <div>
      <article className="pb-8 pt-10 mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {/* <p className="text-sm text-gray-600">By {convertAuthorToName(post.author)}</p> */}
          <time dateTime={post.date} className="mb-1 text-sm text-gray-600">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div className="prose prose-lg">
          <Content />
        </div>
        {/* {post.tags && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )} */}
      </article>
      <footer className="flex justify-center mt-2 py-8 border-t border-gray-200 text-gray-900">
        <Logo />
      </footer>
    </div>
  )
}

export default PostLayout
