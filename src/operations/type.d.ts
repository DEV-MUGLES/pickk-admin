import {DocumentNode, OperationTypeNode} from 'graphql';

export type OperationType = {
  gql: DocumentNode;
  dataName: string;
};
