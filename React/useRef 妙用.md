# useRef 妙用

## 例子1：监听组件动画结束

子组件

```tsx
import React, { useEffect } from "react";
import styles from "./UpLoading.module.css";
import classNames from "classnames";

interface UpLoadingProps {
  onFinished?: () => void;
}

const UpLoading: React.FC<UpLoadingProps> = ({ onFinished }) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.addEventListener("animationend", () => {
      onFinished?.();
    });
  }, []);

  return (
    <div
      ref={divRef}
      className={classNames("absolute left-0 top-0 bg-black opacity-30 w-full ", styles.uploading)}
    />
  );
};

export default UpLoading;
```

父组件

```tsx
const [shouldShowUpload, setShouldShowUpload] = useState<boolean>(false);

...
const onUploadFinish = () => {
    setShouldShowUpload(false);
    setShouldScanning(true);
};

...
{shouldShowUpload && <UpLoading onFinished={onUploadFinish} />}
```

