import {useState} from 'react';
import styled from 'styled-components';
import {Button, Checkbox, Divider, List, Spin, Tooltip, Typography} from 'antd';
import {QuestionCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {GREY} from '@src/components/atoms/colors';

const {Text} = Typography;

function SellPriceEditSection() {
  const [isCrawlChecked, setIsCrawlChecked] = useState(false);

  const handleCrawlCheckboxChange = ({target: {checked}}) => {
    setIsCrawlChecked(checked);
  };

  return (
    <Wrapper>
      <Row>
        <Text>
          1. 크롤링 연동가로 가격 설정
          <Tooltip
            placement="bottom"
            title="공식홈페이지 크롤링 가격으로 판매가를 설정합니다.">
            <QuestionCircleOutlined
              style={{marginLeft: '0.2rem', color: GREY[600]}}
            />
          </Tooltip>
        </Text>
        <CrawlCheckbox
          checked={isCrawlChecked}
          onChange={handleCrawlCheckboxChange}
        />
        {!isCrawlChecked && (
          <Text style={{marginLeft: '0.8rem', color: GREY[600]}}>
            수동설정가격 적용중 ✅
          </Text>
        )}
      </Row>
      <Divider />
      <Row style={{justifyContent: 'space-between'}}>
        <Text>2. 가격 수동 설정</Text>
        <Button icon={<PlusOutlined />}>가격 추가</Button>
      </Row>
      <ManualPriceList
        bordered
        dataSource={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]}
        renderItem={({id}) => <List.Item key={id}># {id}</List.Item>}>
        {false && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )}
      </ManualPriceList>
    </Wrapper>
  );
}

export default SellPriceEditSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.4rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CrawlCheckbox = styled(Checkbox)`
  margin-left: 0.8rem;
`;

const ManualPriceList = styled(List)`
  height: 12rem;
  margin-top: 0.8rem;
  overflow: auto;
`;
