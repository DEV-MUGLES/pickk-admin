import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Image, Input, message} from 'antd';
import {Item} from '@pickk/common';

import BaseForm from '@src/components/common/organisms/Form/base';
import ImageUpload from '@src/components/common/molecules/image-upload';
import ItemCategoryCascader from '@components/common/molecules/form-inputs/item-category-cascader';

import {useUpdateItem} from './hooks';

const {TextArea} = Input;

type ItemBaseInfoEditSectionProps = {
  selectedItem: Item;
};

function ItemBaseInfoEditSection({selectedItem}: ItemBaseInfoEditSectionProps) {
  const [imageUrl, setImageUrl] = useState<string>();

  const {updateItem} = useUpdateItem();

  useEffect(() => {
    setImageUrl(null);
  }, [selectedItem.id]);

  const handleSaveClick = async ({
    name,
    category,
  }: {
    imageUrl: string;
    name: string;
    category: [number, number];
  }) => {
    const [majorCategoryId, minorCategoryId] = category;

    try {
      await updateItem(selectedItem.id, {
        imageUrl: imageUrl?.[0] ?? selectedItem.imageUrl,
        name,
        majorCategoryId,
        minorCategoryId,
      });
      message.success('아이템 정보를 수정했습니다!');
    } catch (error) {
      message.error('저장에 실패했습니다. err - ' + error);
    }
  };

  return (
    <Wrapper>
      <Col>
        <Image width={200} src={selectedItem.imageUrl} alt="상품이미지" />
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
                  imageUrl={imageUrl ?? selectedItem.imageUrl}
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
              selectedItem.majorCategory?.id,
              selectedItem.minorCategory?.id,
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
