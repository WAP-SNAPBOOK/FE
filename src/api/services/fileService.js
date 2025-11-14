import axiosClient from '../axiosClient';

export const fileService = {
  /**
   * 단일 파일 업로드
   * @param {File} file
   */
  uploadSingle: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosClient.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },

  /**
   * 다중 파일 업로드
   * @param {File[]} files
   */
  uploadMultiple: async (files) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file); // 배열 명 그대로
    });

    const res = await axiosClient.post('/api/files/upload-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },
};
