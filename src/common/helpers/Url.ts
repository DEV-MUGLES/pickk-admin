export const getTrackingViewUrl = (courierCode: string, trackCode: string) => {
  return `https://tracker.delivery/#/${courierCode}/${trackCode}`;
};
