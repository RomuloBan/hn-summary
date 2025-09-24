import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

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
        <body>
          <header>Wow Renderer!</header>
          <div>{children}</div>
        </body>
      </html>
    );
  }),
);

app.get("/", (c) => {
  return c.render(<h1>Hello Hono!</h1>);
});

export default app;
