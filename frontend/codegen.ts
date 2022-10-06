import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://countries.trevorblades.com/graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/graphql/generated': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true
      }
    }
  }
}

export default config
