import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
// import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) { 
  async function handleSum() {
    const math = (await import('../lib/math')).default
    alert(math.sum(3, 5))
  }
  
  return (
    <div>
      <section>
        <h1>Products</h1>

        <ul> 
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  console.log(fullUrl)
  const response = await fetch(fullUrl)
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts
    }
  }
}