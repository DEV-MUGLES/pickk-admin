import base from './Api';
import {PlacementPreview, Placement, Filter} from '@src/types';
import {message} from 'antd';

const getPreviewList = (): Promise<PlacementPreview> =>
  base(true)
    .get('/partner/placements/preview/')
    .then((res) => res.data);

const getList = (filter: Filter): Promise<Placement[]> =>
  base(true)
    .get('/partner/placements/', {
      params: filter,
    })
    .then((res) => res.data);

const place = (ids: number[]) =>
  base(true)
    .post('/partner/placements/place/', {ids})
    .then((res) => {
      const {requested, success} = res.data;
      if (requested === 0) {
        message.error(`변경된 데이터가 없습니다.`);
      } else if (requested === success) {
        message.success(
          `발주확인 완료되었습니다. - 요청 : ${requested} / 성공 : ${success}`,
        );
      } else {
        message.error(
          `일부 품목이 적용되지 않았습니다. - 요청 : ${requested} / 성공 : ${success}`,
        );
      }
    })
    .catch((err) => message.error('실패했습니다. - ' + err));

const cancel = async (id: number) => {
  return base(true)
    .post(`/partner/placements/${id}/cancel/`)
    .then(() => {
      message.success(`취소 완료되었습니다.`);
    })
    .catch((err) => {
      if (!err.response || err.response.status !== 400) {
        const {detail} = err.response.data;
        message.error(detail);
        return;
      }
      message.error('실패했습니다. - ' + err);
    });
};

const PlacementService = {
  getPreviewList,
  getList,
  place,
  cancel,
};

export default PlacementService;
