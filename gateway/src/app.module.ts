import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLRequest } from 'apollo-server-core'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        context: ({ req }) => ({ headers: req.headers }),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'purchases', url: 'http://localhost:3333/graphql' },
            { name: 'classroom', url: 'http://localhost:3334/graphql' },
          ],
        }),
        buildService: ({ url }) =>
          new RemoteGraphQLDataSource({
            url,
            willSendRequest({
              request,
              context,
            }: {
              request: GraphQLRequest
              context: Record<string, any>
            }) {
              request.http.headers.set('authorization', context?.headers?.authorization)
            },
          }),
      },
    }),
  ],
})
export class AppModule {}