import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Button, Input, message, Space, Typography} from 'antd';

import {useBoardContext} from '@src/contexts/Board';
import {UPDATE_PRODUCT_MUTATION} from '@src/operations/item/mutation';
import {
  UpdateProduct,
  UpdateProductVariables,
} from '@src/operations/__generated__/UpdateProduct';

const {Text} = Typography;

function StockEditColumn({id, defaultValue}) {
  const {
    action: {reload},
  } = useBoardContext();
  const [isEditable, setIsEditable] = useState(false);
  const [stock, setStock] = useState<number>(defaultValue);

  const [updateProduct] = useMutation<UpdateProduct, UpdateProductVariables>(
    UPDATE_PRODUCT_MUTATION.gql,
  );

  const handleChange = ({target: {value}}) => {
    const newStock = parseInt(value || '0', 10);
    if (Number.isNaN(newStock)) {
      return;
    }

    setStock(newStock);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    updateProduct({
      variables: {
        id: id,
        updateProductInput: {
          stock,
        },
      },
    })
      .then(() => {
        setIsEditable(false);
        reload();
      })
      .catch(() => {
        message.error('재고 수정에 실패했습니다.');
      });
  };

  const handleCancle = () => {
    setStock(defaultValue);
    setIsEditable(false);
  };

  return (
    <>
      {isEditable ? (
        <Input value={stock} onChange={handleChange} size="small" />
      ) : (
        <Text>{stock} 개</Text>
      )}
      <Space style={{display: 'flex', marginTop: '0.4rem'}}>
        <Button
          onClick={isEditable ? handleSaveClick : handleEditClick}
          size="small"
          type={isEditable ? 'primary' : 'default'}>
          {isEditable ? '저장' : '수정'}
        </Button>
        {isEditable && (
          <Button onClick={handleCancle} size="small">
            취소
          </Button>
        )}
      </Space>
    </>
  );
}

export default StockEditColumn;
