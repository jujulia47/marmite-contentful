import { createClient } from "contentful"
import Image from "next/image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Skeleton from "@/components/Skeleton"
import { redirect } from "next/dist/server/api-utils"


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})


//pega o caminho
export const getStaticPaths = async() => {
  const res = await client.getEntries({
    content_type: 'recipe'
  })

  const paths = res.items.map(item => {
    return {
      params: {
        slug: item.fields.slug
      } //context object
    }
  })

  return {
    paths: paths,
    fallback: true
  }
}

//pega o conteúdo de cada caminho
// Depois que o Next.js roda a função de cima, ela gera os diferentes caminhos e páginas e para cada um desses caminho ela roda a próxima função (ou seja, se tem três caminho vai rodar a próxima função 3x)
// Cada vez que essa próxima função roda, ela passa um context object, e nesse context object tem um params property que vai contem o slug, porque é o objeto do retorno da função de cima.
// Então params.slug vai nos passar o atual slug da receita em particular e com isso conseguimos limitar a requisição para apenas pegar o item daquele slug preperty
//Em vez de passar context no parametro, desestruturar o params property do context object  

//Para pegar uma receita baseada no valor de um campo, adicionamos uma segunda propriedade dentro do getEntries entre asapas
//'fields.slug' ou fields.qualquer campo que queiramos retornar (to match)

export async function getStaticProps({params}) { //acessar o slug por aqui agora, desestruturado 
  const { items } = await client.getEntries({
    content_type: "recipe",
    'fields.slug': params.slug //assim que conseguimos limitar o que vem do contentful. Dizemos que queromos o slug ou qualquer outro campo to match o valor de params.slug
    //Se várias entradas corresponder a esse valor, será retornadas todas. mas no caso sabemos que é único esse valor 
    // Isso ainda retorna um array
  })

  if(!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // Retornar um objeto para que possamos injetar as props dentro do componente
  // Queremos injetar uma recepe prop => que será items, mas lembrando que items é um array, precisa passar a posição
  return {
    props: {
      recipe: items[0],
    },
    revalidate: 1
  }
}


//o que vamos exibir na página
//Desestruturar e passar recipe direto
export default function RecipeDetails({recipe}) {

  if(!recipe) return < Skeleton/>

  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields
  console.log("recipe page", recipe);
  
  return (
    <section>
      <article className="banner">
        <Image 
        className="img"
          src={`https:${featuredImage.fields.file.url}`}
          // width={featuredImage.fields.file.details.image.width}
          // height={featuredImage.fields.file.details.image.width}
          width={1200}
          height={600}
        />
        <h2>{title}</h2>
      </article>

      <article className="info">
        <p>Take about: {cookingTime} mins to cook.</p>
        <h3>Ingredients:</h3>

        {ingredients.map(ing => (
          <span key={ing}>{ing}</span>
        ))}
      </article>

      <article className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </article>

      <style jsx>
        {`
          h2,h3 {
            text-transform: uppercase;
          }
          .img {
            object-fit: cover;
          }
          .banner h2 {
            margin: 0;
            background: #FFEBC9;
            display: inline-block;
            padding: 20px;
            position: relative;
            top: -60px;
            left: -10px;
            transform: rotateZ(-1deg);
            box-shadow: 1px 3px 5px rgba(0,0,0.1);
            color: #753422;
          }
          .info p {
            margin: 0;
          }

          .info span:after {
            content: ", ";
          }

          .info span:last-child::after {
            content: ".";
          }
        `}
      </style>
      
    </section>
  )
}