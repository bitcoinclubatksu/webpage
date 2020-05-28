This repository contains the current source code for [Bitcoin Club at KSU's official webpage](https://bitcoinclubatksu.github.io).

### Running the project locally

If you wish to utilize this code for development, you can install dependencies and run the project in development mode with:

```bash
cd webpage
npm install
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.

### Running tests

You can run end-to-end tests via:

# Console:

```bash
cd webpage
npm install
npm run dev
npm run cy:run
```

# For an interative e2e session:

```bash
cd webpage
npm install
npm run dev
npm run cy:open
```

I've used [Cypress](https://www.cypress.io) to write end-to-end tests. Please check out their documentation(https://docs.cypress.io) for more references.

## Bugs and feedback

If you encounter any issues while browsing or running the code. Please create an issue over at [Bitcoin Club at KSU webpage issue tracker](https://github.com/bitcoinclubatksu/webpage/issues) with an appropriate tag.
Also, sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues) if you face a framework related issue.

## Final words

I had fun creating this webpage with [Sapper](https://github.com/sveltejs/sapper) and [Svelte](https://github.com/sveltejs/svelte), please do check them out for some more inspiration for your next web application.

