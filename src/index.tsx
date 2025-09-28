import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { getFeed } from "./lib/hacker-news";

const app = new Hono();

app.use(
  "*",
  jsxRenderer(({ children }) => {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
        </head>
        <body class="container">{children}</body>
      </html>
    );
  }),
);

app.get("/", async (c) => {
  const items = await getFeed();
  return c.render(
    <>
      {items?.map((entry) => {
        return (
          <details>
            <summary role="button" class="outline contrast">
              {entry.title}
            </summary>
            <article>
              <header>
                <a href={entry.link} target="_blank" rel="nofollow noopener">
                  Article
                </a>
                {" | "}
                <a
                  href={entry.comments}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  Comments
                </a>
              </header>
              Summary coming soon...
            </article>
          </details>
        );
      })}
    </>,
  );
});

app.notFound((c) => {
  return c.render(<h1>Not found - {c.req.path}</h1>);
});

app.onError((error, c) => {
  c.status(500);
  return c.render(<h1>Error - {error.message}</h1>);
});

export default app;
