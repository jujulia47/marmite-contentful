import Link from "next/link"
import Image from "next/image"

export default function RecipeCard({ recipe}) {
    const {title, slug, cookingTime, thumbnail} = recipe.fields
  console.log("recipe", recipe);
    console.log("thumbnail field", thumbnail.fields);
    
    return (
    //   <div>{recipe.fields.title}</div>
    <section>
        <article className="featured">
            {/* image - thumb*/}
            <Image 
                src={`https:${thumbnail.fields.file.url}`}
                // width={thumbnail.fields.file.details.image.width}
                // height={thumbnail.fields.file.details.image.height}
                width={480}
                height={530}
                
            />
        </article>
        <article className="content">
            <div className="info">
                <h4>{title}</h4>
                <p>Takes approx {cookingTime} min to make</p>
            </div>
            <div className="actions">
                <Link href={`/recipes/${slug}`}>
                    <span>cookie this</span>
                </Link>
            </div>
        </article>
        <style jsx>{`
        .card {
          transform: rotateZ(-1deg);
        }
        .content {
          background: #FFEBC9;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
          color: #753422
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #D79771;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          text-decoration: none;
        }
        .actions a {
          color: #FFEBC9;
          background: #753422;
          padding: 16px 24px;
          text-decoration: none;
        }
        .actions span {
          color: #FFEBC9;
          background: #753422;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </section>
    
    )
}