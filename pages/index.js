import { createClient } from "contentful"
import RecipeCard from '../components/RecipeCard'

export async function getStaticProps(params) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({
    content_type: "recipe",
  })

  return {
    props: {
      recipes: res.items,
    },
  }
}

export default function Recipes({ recipes }) {
  console.log(recipes, "recipes");
  
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />

        // <div key={recipe.sys.id} className="recipe-card">
        //   <h2>{recipe.fields.title}</h2>
        //   {/* <img
        //     src={`https:${recipe.fields.image.fields.file.url}`}
        //     alt={recipe.fields.title}
        //   />
        //   <p>{recipe.fields.description}</p> */}
        // </div>
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
        
        `}
      </style>
    </div>
  )
}