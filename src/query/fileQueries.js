import { useMutation } from '@tanstack/react-query';
import { fileService } from '../services/fileService';

/**
 * 단일 파일 업로드 쿼리
 */
export const useUploadSingleFile = () => {
  return useMutation({
    mutationFn: (file) => fileService.uploadSingle(file),
  });
};

/**
 * 다중 파일 업로드 쿼리
 */
export const useUploadMultipleFiles = () => {
  return useMutation({
    mutationFn: (files) => fileService.uploadMultiple(files),
  });
};
