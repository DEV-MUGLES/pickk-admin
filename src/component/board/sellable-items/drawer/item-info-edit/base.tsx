import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useMutation} from '@apollo/client';
import {Image, Input, message} from 'antd';

import BaseEditForm from '@src/components/organisms/Form/base';
import ImageUpload from '@src/components/molecules/image-upload';
import ItemCategoryCascader from '@src/components/molecules/cascader/item-category';

import {useBoardContext} from '@src/contexts/Board';
import {Items_items} from '@src/operations/__generated__/Items';
import {UPDATE_ITEM_MUTATION} from '@src/operations/item/mutation';
import {
  UpdateItem,
  UpdateItemVariables,
} from '@src/operations/__generated__/UpdateItem';

const {TextArea} = Input;

function ItemBaseInfoEditSection() {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();
  const selectedItem: Items_items = selectedData;
  const [imageUrl, setImageUrl] = useState<string>();
  const [updateItem] = useMutation<UpdateItem, UpdateItemVariables>(
    UPDATE_ITEM_MUTATION.gql,
  );

  useEffect(() => {
    setImageUrl(null);
  }, [selectedRowId]);

  const handleSaveClick = (value) => {
    const {
      imageUrl: _i,
      category: [majorCategoryId, minorCategoryId],
      ...updateItemInput
    } = value;
    updateItem({
      variables: {
        itemId: selectedItem.id,
        updateItemInput: {
          ...updateItemInput,
          majorCategoryId,
          minorCategoryId,
          imageUrl: imageUrl ?? selectedItem.imageUrl,
        },
      },
    })
      .then(() => {
        message.success('아이템 정보를 수정했습니다!');
        reload();
      })
      .catch(() => {
        message.success('저장에 실패했습니다.');
      });
  };

  return (
    <Wrapper>
      <Col>
        <Image width={200} src={selectedItem?.imageUrl} />
      </Col>
      <Col style={{marginLeft: '1.6rem', flex: 1}}>
        <BaseEditForm
          FORM_ITEMS={{
            imageUrl: {
              label: '대표 이미지 수정',
              rules: [
                {
                  required: true,
                  message: '이미지가 비었습니다.',
                },
              ],
              Component: () => (
                <ImageUpload
                  imageUrl={imageUrl ?? selectedItem?.imageUrl}
                  setImageUrl={setImageUrl}
                  alt="대표 이미지"
                />
              ),
            },
            name: {
              label: '상품명',
              rules: [
                {
                  required: true,
                  message: '상품명을 입력해주세요.',
                },
              ],
              Component: TextArea,
            },
            category: {
              label: '카테고리',
              rules: [
                {
                  required: true,
                  message: '카테고리를 선택해주세요.',
                },
              ],
              Component: ItemCategoryCascader,
            },
          }}
          onSaveClick={handleSaveClick}
          defaultValue={{
            ...selectedItem,
            category: [
              selectedItem?.majorCategory?.id,
              selectedItem?.minorCategory?.id,
            ],
          }}
          wrapperCol={{}}
          buttonAlign="right"
        />
      </Col>
    </Wrapper>
  );
}

export default ItemBaseInfoEditSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
