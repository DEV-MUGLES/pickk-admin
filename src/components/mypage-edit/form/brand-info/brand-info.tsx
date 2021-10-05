import {useState} from 'react';
import {message} from 'antd';

import BaseForm from '@src/components/common/organisms/Form/base';
import ImageUpload from '@src/components/common/molecules/image-upload';

import {useMeSellerBrandInfo, useUpdateBrand} from './hooks';

function BrandInfoForm() {
  const {data: defaultValue} = useMeSellerBrandInfo();
  const {updateBrand} = useUpdateBrand();

  const [imageUrl, setImageUrl] = useState<string>();

  const handleSaveClick = async ({description}: {description: string}) => {
    try {
      await updateBrand(
        imageUrl?.[0] ?? defaultValue?.brand?.imageUrl,
        description,
      );
      message.success('저장되었습니다.');
    } catch (error) {
      message.error('저장에 실패했습니다. err - ' + error);
    }
  };

  return (
    <BaseForm
      defaultValue={defaultValue?.brand}
      FORM_ITEMS={{
        imageUrl: {
          label: '프로필 이미지',
          CustomInput: () => (
            <ImageUpload
              imageUrl={imageUrl ?? defaultValue?.brand?.imageUrl}
              setImageUrl={setImageUrl}
              alt="대표 이미지"
            />
          ),
        },
        description: {
          label: '브랜드 소개문구',
          rules: [
            {
              required: true,
              message: '브랜드 소개문구를 입력해주세요.',
            },
            {
              max: 100,
              message: '최대 100자까지 입력가능합니다.',
            },
          ],
        },
      }}
      style={{marginTop: '0.8rem'}}
      onSaveClick={handleSaveClick}
    />
  );
}

export default BrandInfoForm;
