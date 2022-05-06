//上传文件到腾讯云
import TxOssx from '/@/utils/txoss';

export async function postFile(file: any) {
  return await TxOssx.instance().postFile(file);
}
