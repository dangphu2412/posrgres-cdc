
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: "src/features/**/*.gql",
  ignoreNoDocuments: true,
  hooks: {},
  generates: {
    'src/shared/graphql/models.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        useTypeImports: true, // Important for import compatibility
        scalars: {
          DateTime: 'string', // 👈 Fixes the 'any' issue
        },
      },
    },
    "src/shared/graphql/operations.tsx": {
      preset: 'import-types',
      presetConfig: {
        typesPath: './models', // Relative path to types.ts (without extension)
      },
      plugins: [
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        reactApolloVersion: 3,
        gqlImport: '@apollo/client#gql', // Keeps the gql masking
        useTypeImports: true,
      },
    },
  }
};

export default config;
