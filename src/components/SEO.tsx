import Head from 'next/head'

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = true
}: SEOProps) {
  const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| DevCommerce' : ''}`
  const pageImage = image ? `${process.env.SITE_URL}/${image}` : null;

  
  return (
    <Head>
      <title>{pageTitle}</title>
    
      { description && <meta name='description' content={description}/>}
      { pageImage && <meta name='image' content={pageImage}/>}
      
      { !shouldIndexPage && <meta name="robots" content="noindex, nofollow"/>}
    
      // link to others meta tags 
      // https://gist.github.com/diego3g/fa876d6f954390c656e490e538e8953f#file-metatags-html-L17
    </Head>
  )
}