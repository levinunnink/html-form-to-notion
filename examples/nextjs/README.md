This is a [Next.JS] example of the Notion Forms. Please refer to the [guide](https://github.com/levinunnink/html-form-to-notion) for more details on how to configure your Notion.

## Running the example

For the forms to function you need to update your envrionment variables:

- `NOTION_DB_ID` The ID of the Notion you wish to update.
- `NOTION_SECRET` The secret token from your Notion ingegration. (Must have been granted access to the DB for it to work).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
