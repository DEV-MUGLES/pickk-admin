export enum OrderStatus {
  Pending = '결제 대기',
  Paid = '결제 완료',
  Placed = '발송 준비',
  Shipping = '발송 완료',
  Delivered = '배송 완료',
  Cancelled = '취소 완료',
  Failed = '주문 실패',
  Confirmed = '구매 확정',
}

export enum ClaimStatus {
  RefundRequested = '반품 요청',
  Refunded = '반품 완료',
  ExchangeRequested = '교환 요청',
  Exchanged = '교환 완료',
  CancelRequested = '취소 요청',
  Cancelled = '취소 완료',
}
