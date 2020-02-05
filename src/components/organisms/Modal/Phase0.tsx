import React, {useState} from 'react';
import {Typography, Input, Button} from 'antd';
import styled from 'styled-components';

import Img from '@src/components/atoms/img';
import Space from '@src/components/atoms/space';
import Colors from '@src/components/atoms/colors';

const {Text} = Typography;
const {Search} = Input;

export type Phase0Props = {
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  influencerData: Array<{
    avatar: string;
    name: string;
    subscriberNumber: string;
  }>;
  setSelectedInfluencerData: React.Dispatch<any>;
};

export default function Phase0({
  setPhase,
  influencerData,
  setSelectedInfluencerData,
}: Phase0Props) {
  const [influencerSearchResult, setInfluencerSearchResult] = useState(null);
  const [query, setQuery] = useState(null);

  const allInfluencerData = influencerData;

  const handleSearch = (value: string) => {
    value ? setQuery(value) : setQuery('전체');
    setInfluencerSearchResult(
      allInfluencerData.filter(data => data.name.includes(value)),
    );
  };

  const selectInfluencer = (name: string) => () => {
    setSelectedInfluencerData(
      allInfluencerData.find(data => data.name === name),
    );
    setPhase(1);
  };

  return (
    <Wrapper>
      <Search placeholder="이름으로 검색" onSearch={handleSearch} enterButton />
      <Space level={1} />
      {query && (
        <QueryInfo>
          <Text strong>{query}</Text> 검색 결과
        </QueryInfo>
      )}
      <Space level={1} />
      <SearchResultWrapper>
        {influencerSearchResult && influencerSearchResult.length === 0 && (
          <Text>검색 결과가 없습니다.</Text>
        )}
        {influencerSearchResult &&
          influencerSearchResult.length !== 0 &&
          influencerSearchResult.map(item => (
            <SearchResultRow>
              <Space direction="ROW" />
              <Img src={item.avatar} circle={true} width="35px" height="35px" />
              <Space direction="ROW" level={1} />
              <Name ellipsis>{item.name}</Name>
              <SubscriberNumber>
                구독자 : {item.subscriberNumber}명
              </SubscriberNumber>
              <Button
                type="primary"
                size="small"
                onClick={selectInfluencer(item.name)}
                ghost>
                선택
              </Button>
              <Space direction="ROW" />
            </SearchResultRow>
          ))}
      </SearchResultWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 330px;
`;

const QueryInfo = styled(Text)`
  width: fit-content;
  margin-right: auto;
`;

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;
  overflow: auto;
`;

const SearchResultRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${Colors.RegularGrey};
  border-radius: 4px;
  padding: 5px;
  width: 100%;
  margin-bottom: 12px;
`;

const Name = styled(Text)`
  width: 116px;
  margin-right: auto;
  color: ${Colors.Black};
`;

const SubscriberNumber = styled(Text)`
  width: 100px;
  margin-right: auto;
`;
