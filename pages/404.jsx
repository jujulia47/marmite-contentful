import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);
  
  return (
    <section className="not-found">
      <h1>404</h1>
      <h2>Ooops! That page cannot be found :/</h2>
      <p>
        Redirecting to the <Link href="/">Home page</Link> for more marmite
        godness...
      </p>

      <style jsx>
        {`
          .not-found {
            background: #753422;
            padding: 30px;
            box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
            transform: rotateZ(-1deg);
          }

          h1 {
            font-size: 3em;
            color: #FFEBC9;
          }

          h2, p,
          p < a {
            color: #FFEBC9;
          }
        `}
      </style>
    </section>
  );
}
