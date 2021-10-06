import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Image, Input, message} from 'antd';
import {Item} from '@pickk/common';

import BaseForm from '@src/components/common/organisms/Form/base';
import ImageUpload from '@src/components/common/molecules/image-upload';
import ItemCategoryCascader from '@src/components/common/molecules/item-category-cascader';

import {useBoardContext} from '@src/common/contexts/Board';
import {useUpdateItem} from '@src/common/hooks/apis';

const {TextArea} = Input;

function ItemBaseInfoEditSection() {
  const {
    state: {selectedRowId, selectedData},
  } = useBoardContext();
  const selectedItem: Item = selectedData;
  const [imageUrl, setImageUrl] = useState<string>();
  const {updateItem, updateCategoryCache} = useUpdateItem();

  useEffect(() => {
    setImageUrl(null);
  }, [selectedRowId]);

  const handleSaveClick = async (value) => {
    const {
      imageUrl: _i,
      category: [majorCategoryId, minorCategoryId],
      ..._updateItemInput
    } = value;
    const itemId = selectedItem.id;
    const updateItemInput = {
      ..._updateItemInput,
      majorCategoryId,
      minorCategoryId,
      imageUrl: imageUrl?.[0] ?? selectedItem.imageUrl,
    };

    try {
      await updateItem({
        variables: {
          itemId,
          updateItemInput,
        },
        update: updateCategoryCache(itemId, updateItemInput),
      });
      message.success('아이템 정보를 수정했습니다!');
    } catch (error) {
      message.error('저장에 실패했습니다. err - ' + error);
    }
  };

  return (
    <Wrapper>
      <Col>
        <Image width={200} src={selectedItem?.imageUrl} />
      </Col>
      <Col style={{marginLeft: '1.6rem', flex: 1}}>
        <BaseForm
          FORM_ITEMS={{
            imageUrl: {
              label: '대표 이미지 수정',
              rules: [
                {
                  required: true,
                  message: '이미지가 비었습니다.',
                },
              ],
              CustomInput: () => (
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
              CustomInput: TextArea,
            },
            category: {
              label: '카테고리',
              rules: [
                {
                  required: true,
                  message: '카테고리를 선택해주세요.',
                },
              ],
              CustomInput: ItemCategoryCascader,
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
