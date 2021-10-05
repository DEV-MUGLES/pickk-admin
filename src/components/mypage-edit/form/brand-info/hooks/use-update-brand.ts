import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateBrandArgs} from '@pickk/common';

import {useMyJwtPayload} from '@src/common/hooks/apis';

const UPDATE_BRAND = gql`
  mutation updateBrand($id: Int!, $updateBrandInput: UpdateBrandInput!) {
    updateBrand(id: $id, updateBrandInput: $updateBrandInput) {
      id
      imageUrl
      description
    }
  }
`;

export const useUpdateBrand = () => {
  const {data} = useMyJwtPayload();
  const [update] = useMutation<
    Pick<Mutation, 'updateBrand'>,
    MutationUpdateBrandArgs
  >(UPDATE_BRAND);

  const updateBrand = async (imageUrl: string, description: string) => {
    await update({
      variables: {
        id: data.brandId,
        updateBrandInput: {
          imageUrl,
          description,
        },
      },
    });
  };

  return {updateBrand};
};
