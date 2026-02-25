import { useQuery, useMutation } from '@tanstack/react-query';
import { shopManageService } from '../api/services/shopManageService';

/**
 * 태그(카테고리) 목록 조회 훅
 */
export const useShopManageTags = () => {
  return useQuery({
    queryKey: ['shop-manage-tags'],
    queryFn: () => shopManageService.getTags(),
  });
};

/**
 * 태그(카테고리) 생성 훅
 */
export const useCreateShopTag = () => {
  return useMutation({
    mutationFn: (name) => shopManageService.createTag(name),
    onSuccess: () => {
      alert('태그가 생성되었습니다.');
    },
    onError: (error) => {
      console.error('태그 생성 실패:', error);
      alert('태그 생성 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 생성 훅
 */
export const useCreateShopMenu = () => {
  return useMutation({
    mutationFn: ({ shopId, name, description, sortOrder }) =>
      shopManageService.createMenu(shopId, { name, description, sortOrder }),
    onSuccess: () => {
      alert('메뉴가 생성되었습니다.');
    },
    onError: (error) => {
      const status = error?.response?.status;
      if (status === 409) {
        alert('동일한 이름의 메뉴가 이미 존재합니다.');
        return;
      }
      console.error('메뉴 생성 실패:', error);
      alert('메뉴 생성 중 오류가 발생했습니다.');
    },
  });
};
