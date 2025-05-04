
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "src/features/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "src/shared/graphql-client/api/": {
      preset: "client",
      plugins: ["typescript-react-apollo"],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false
      }
    }
  }
};

export default config;
