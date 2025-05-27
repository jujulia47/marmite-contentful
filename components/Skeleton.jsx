export default function Skeleton() {
  return (
    <section className="skeleton">
      <article className="s-banner"></article>
      <header className="s-header"></header>
      <article className="s-content"></article>
      <article className="s-content"></article>
      <article className="s-content"></article>

      <style jsx>
        {`
          .skeleton {
            max-width: 1200px
            margin: 20px auto;
          }
          .skeleton > div {
            background: #dbcc1a;
            border-radius: 4px;
            margin: 20px 0;
          }
          .s-banner {
            padding:12% 0;
          }
          .s-header {
            padding:15px 0;
            max-width: 500px
          }
          .s-content {
            padding:8px 0;
            max-width: 1000px
          }
        `}
      </style>
    </section>
  );
}
