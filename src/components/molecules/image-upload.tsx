import React from 'react';
import {Upload, message, UploadProps} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

import {useUploadMultipleImages} from '@src/hooks/apis';

export type ImageUploadProps = {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  alt?: string;
};

function ImageUpload({
  imageUrl,
  setImageUrl,
  alt = 'image url',
}: ImageUploadProps) {
  const [upload, {loading}] = useUploadMultipleImages();

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    showUploadList: false,
    customRequest: async (options) => {
      const {file, onError, onSuccess} = options;
      await upload({
        variables: {
          uploadImageInput: {
            files: [file],
          },
        },
      })
        .then(({data}) => {
          onSuccess(data?.uploadMultipleImages[0], null);
        })
        .catch((error) => {
          onError(error);
        });
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setImageUrl(info.file.response);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 이미지 업로드에 성공했습니다!`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 이미지 업로드를 실패했습니다.`);
      }
    },
    maxCount: 1,
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (
    <Upload
      {...uploadProps}
      style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}
export default ImageUpload;
