import {FlattenInquiryDataType} from '@containers/inquiries/hooks';
import {
  generateExcelColumns,
  addDashToPhoneNumber,
  renderDateWithTime,
  getInquiryTypeDisplayName,
} from '@src/common/helpers';

import {inquiriesColumns} from './columns';

export const inquiriesExcelColumns =
  generateExcelColumns<FlattenInquiryDataType>(inquiriesColumns, {
    itemInfo: ({itemName}) => itemName,
    userPhoneNumber: ({userPhoneNumber}) =>
      addDashToPhoneNumber(userPhoneNumber),
    createdAt: ({createdAt}) => renderDateWithTime(createdAt),
    type: ({type}) => getInquiryTypeDisplayName(type) + '문의',
  });
