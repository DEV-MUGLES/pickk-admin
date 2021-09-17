import React, {useState} from 'react';
import {Typography, Input, Button} from 'antd';
import styled from 'styled-components';

import Img from '@src/components/common/atoms/img';
import Space from '@src/components/common/atoms/space';
import {GREY} from '@src/common/constants/colors';
import UserService from '@src/lib/services/User';
import {User} from '@src/types/User';

const {Text} = Typography;
const {Search} = Input;

export type Phase0Props = {
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  setSelectedInfluencerData: React.Dispatch<any>;
};

export default function Phase0({
  setPhase,
  setSelectedInfluencerData,
}: Phase0Props) {
  const [influencerSearchResult, setInfluencerSearchResult] =
    useState<User[]>(null);
  const [query, setQuery] = useState(null);

  const handleSearch = async (value: string) => {
    value ? setQuery(value) : setQuery('전체');
    const influencers = await UserService.search(value);
    setInfluencerSearchResult(influencers);
  };

  const selectInfluencer = (id: number) => () => {
    setSelectedInfluencerData(
      influencerSearchResult.find((data) => data.id === id),
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
        {influencerSearchResult?.length === 0 && (
          <Text>검색 결과가 없습니다.</Text>
        )}
        {influencerSearchResult?.map((user) => (
          <SearchResultRow key={user.id}>
            <Space direction="ROW" />
            <Img
              src={user.profileImageUrl}
              circle={true}
              width="35px"
              height="35px"
            />
            <Space direction="ROW" level={1} />
            <Name ellipsis>{user.name}</Name>
            <SubscriberNumber>
              구독자 : {user.followersCount}명
            </SubscriberNumber>
            <Button
              type="primary"
              size="small"
              onClick={selectInfluencer(user.id)}
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
  border: 1px solid ${GREY[400]};
  border-radius: 4px;
  padding: 5px;
  width: 100%;
  margin-bottom: 12px;
`;

const Name = styled(Text)`
  width: 116px;
  margin-right: auto;
  color: ${GREY[800]};
`;

const SubscriberNumber = styled(Text)`
  width: 100px;
  margin-right: auto;
`;
