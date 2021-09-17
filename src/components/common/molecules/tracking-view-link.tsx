import {Button} from 'antd';

import {getTrackingViewUrl} from '@src/common/helpers';

export type TrackingViewLinkProps = {
  label?: string;
  courierCode: string;
  trackCode: string;
};

function TrackingViewLink({
  label = '배송추적',
  courierCode,
  trackCode,
}: TrackingViewLinkProps) {
  return (
    <a href={getTrackingViewUrl(courierCode, trackCode)} target="_blank" rel="noreferrer">
      <Button size="small">{label}</Button>
    </a>
  );
}

export default TrackingViewLink;
