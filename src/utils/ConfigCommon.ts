//刷新配置数据信息
export function updateInfo(key: string, defaultValue: string, updateSchema: any) {
  updateSchema({
    field: key,
    defaultValue: defaultValue,
  });
}

//格式化文件大小
export function formatFileSize(fileSize: number) {
  return Math.round((fileSize / 1024 / 1024) * 100) / 100 > 1000
    ? Math.round((fileSize / 1024 / 1024) * 100) / 100 + 'G'
    : Math.round((fileSize / 1024 / 1024) * 100) / 100 + 'M';
}
