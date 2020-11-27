import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { client } from '@/lib/prismic'
import Prismic from 'prismic-javascript'
import { Document } from 'prismic-javascript/types/documents'
import PrismicDom from 'prismic-dom'

import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) { 
  
  return (
    <div>
      <SEO 
        title="DevCommerce, your story to Devs!" 
        image="boost.jpg"  
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Products</Title>

        <ul> 
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  // console.log(recommendedProducts.results[0].data.title)

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}