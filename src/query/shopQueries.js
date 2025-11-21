import { useQuery } from '@tanstack/react-query';
import { shopLinkService } from '../api/services/shopLinkService';

/**
 * shopId 로 매장 정보 조회
 * @param {number} shopId
 * @returns {UseQueryResult<{shopId:number, shopName:string}>}
 */
export const useShopInfoById = (shopId) => {
  return useQuery({
    queryKey: ['shopInfo', shopId],
    queryFn: () => shopLinkService.getShopInfo(shopId),
    enabled: !!shopId, // shopId 있을 때만 실행
  });
};
