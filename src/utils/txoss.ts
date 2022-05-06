import * as SparkMD5 from 'spark-md5';
import { getTxToken } from '/@/api/sys/SysSetting';
import COS from 'cos-js-sdk-v5';

export default class TxOssx {
  private static _inst: TxOssx = new TxOssx();

  public static instance(): TxOssx {
    return TxOssx._inst;
  }

  private client?: any = null;
  config: any = {};

  private async updateConfig() {
    const data = await getTxToken();
    if (data != null && data.code == 200 && data.result != null) {
      const value = data.result;
      this.config = data.result;
      // const COS = require('cos-js-sdk-v5');
      this.client = new COS({
        // 必选参数
        getAuthorization: (options: any, callback: any) => {
          callback({
            TmpSecretId: value.tmpSecretId,
            TmpSecretKey: value.tmpSecretKey,
            SecurityToken: value.sessionToken,
            // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            StartTime: value.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: value.expireTime, // 时间戳，单位秒，如：1580000900
            ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
          });
        },
      });
      return;
    }
  }

  async postFile(file: any, progressFu?: any) {
    const MD5Url = await TxOssx.instance().md5FileSync(file);
    return await TxOssx.instance().postMultipartFile(
      file,
      (v: any) => {
        if (progressFu) {
          progressFu(parseFloat((v * 100).toFixed(2)));
        }
      },
      MD5Url,
    );
  }

  public async postMultipartFile(fileObj: File, progressCB: any, fileMd5?: any) {
    await this.updateConfig();
    if (fileMd5 == null) {
      fileMd5 = await this.md5FileSync(fileObj);
    }
    const url: any = await this.uploadFileImp(fileObj, fileMd5, progressCB);
    return url;
  }

  private async uploadFileImp(fileObj: File, fileMd5: string, progressCB: any) {
    let dirName = 'images/';
    if (TxOssx.isVideo(fileObj.name)) {
      dirName = 'video/';
    }
    const extname = fileObj.name;
    // const extname = path.extname(fileObj.name);
    const ossFileName = dirName + extname;
    try {
      const resultList = await this.client.uploadFile({
        Bucket: this.config.bucket /* 必须 */,
        Region: this.config.region /* 存储桶所在地域，必须字段 */,
        Key: this.config.key + ossFileName /* 必须 */,
        Body: fileObj,
        SliceSize: 1024 * 1024 * 5,
        onProgress: function (progressData: any) {
          if (progressCB) {
            progressCB(progressData.percent);
          }
        },
      });
      return 'http://' + resultList.Location;
    } catch (e) {}
    return '';
  }

  private static isVideo(fileName: string): boolean {
    if (fileName == null || fileName.length === 0) return false;
    const exts = ['.mp4', '.avi', '.ogg', '.mpg2', '.rmv', '.flv', '.wmi', '.ts'];
    const xf = fileName.toLocaleLowerCase();
    for (let i = 0; i < exts.length; i++) {
      if (xf.endsWith(exts[i])) return true;
    }
    return false;
  }

  //md5同步
  async md5FileSync(fileObj: File) {
    return await this.computeChecksumMd5(fileObj);
  }

  //md5校验
  private computeChecksumMd5(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // const chunkSize = 2097152; // Read in chunks of 2MB
      const chunkSize = 8192;
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();

      let cursor = 0; // current cursor in file

      fileReader.onerror = function (): void {
        reject('MD5 computation failed - error reading the file');
      };

      function processChunk(chunk_start: number): void {
        const chunk_end = Math.min(file.size, chunk_start + chunkSize);
        fileReader.readAsArrayBuffer(file.slice(chunk_start, chunk_end));
      }
      fileReader.onload = function (e: any): void {
        spark.append(e.target.result); // Accumulate chunk to md5 computation
        cursor += chunkSize; // Move past this chunk

        if (cursor < file.size) {
          processChunk(cursor);
        } else {
          resolve(spark.end());
        }
      };

      processChunk(0);
    });
  }
}
