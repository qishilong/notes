# Upload 组件

>   多文件上传判断和控制

**上传前控制**

```tsx
const beforeUploadFn = (file: UploadFile, fileList: UploadFile[]): Promise<any> | boolean => {
    if (uploadArr.length === fileList.length - 1) {
      return new Promise((resolve, reject) => {
        // 判断是否是同一类型文件
        for (let i = 1, len = fileList.length; i < len; i++) {
          const curName = fileList[i].name.substring(fileList[i].name.lastIndexOf(".") + 1).trim();
          const lastName = fileList[i - 1].name
            .substring(fileList[i - 1].name.lastIndexOf(".") + 1)
            .trim();

          if (curName !== lastName) {
            message.info("暂时仅支持上传同一类型文件，请重新选择～");
            uploadArr = [];
            return false;
          }
        }

        if (fileList.length > 1) {
          setUploadProps(() => {
            uploadProps.maxCount = 5;
            uploadProps.name = "files";
            uploadProps.action = `${API_PREFIX}/v1/dp/multifile/upload`;
            return { ...uploadProps };
          });
        }

        // 判断当前文件大小是否支持上传
        const supportSizeFn = (arr: UploadFile[], maxSize: number) => {
          arr.forEach((item, index) => {
            if (item.size! > maxSize) {
              arr.splice(index, 1);
              message.info(`暂时仅支持单个文件大小不超过15MB，${item.name} 文件过大，请重新选择～`);
            }
          });
          return arr;
        };

        if (fileList.length > 5) {
          const data = fileList.slice(0, 5);
          message.info("暂时仅支持每次最多上传5个文件～");
          const arr = supportSizeFn(data, FILE_MAX_SIZE);
          resolve(arr);
          uploadArr = [];
          return;
        } else {
          const arr = supportSizeFn(fileList, FILE_MAX_SIZE);
          resolve(arr);
          uploadArr = [];
        }
      });
    } else {
      uploadArr.push(file);
    }
    return true;
};
```

**上传组件**

```tsx
import {
    ...
    Upload,
    UploadFile,
    type UploadProps,
    ...
} from "antd";

...

const { Dragger } = Upload;

...

<Dragger
    {...uploadProps}
    accept={`${Object.keys(supportFileData)
      .map((item) => `.${item}`)
      .join(",")}`}
    beforeUpload={beforeUploadFn}
    onChange={(info) => {
      const { status, name } = info.file;
      if (status === "done") {
        const fileType = name.substring(name.lastIndexOf(".") + 1);
        setFileTypeData(supportFileData[fileType]);
        const fileId = get(info, "file.response.data.0.file_id");
        message.success(`${name} 上传成功！`);
        setUploadFileId([fileId, ...uploadFileId]);
        setUploadSucId([fileId, ...uploadSucId]);
      } else if (status === "error") {
        message.error(`${name} 文件上传失败.`);
        const fileId = get(info, "file.response.data.0.file_id");
        setUploadErrId([fileId, ...uploadErrId]);
      }
      if (uploadSucId.length + uploadErrId.length === info.fileList.length) {
        setUploadProps({
          multiple: true,
          name: "file",
          maxCount: 1,
          method: "POST",
          action: `${API_PREFIX}/v1/dp/file/upload`
        });
      }
    }}>
...
</Dragger>
```

**上传文件控制**

```tsx
// 上传文件数组
let uploadArr: UploadFile[] = [];

...

// 最大文件
const FILE_MAX_SIZE = 1024 * 1024 * X;

// 上传文件 ID 控制
const [uploadErrId, setUploadErrId] = useState<string[]>([]);
const [uploadSucId, setUploadSucId] = useState<string[]>([]);

// 上传组件统一配置
const [uploadProps, setUploadProps] = useState<UploadProps>({
    multiple: true,
    name: "file",
    maxCount: 1,
    method: "POST",
    action: "xxxxxxxxxx"
});
```

