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

## 例子2：保存函数

事件

```tsx
const { run } = useRequest(
    (body: string) => {
      return fetch(`${API_PREFIX}/v3/quiz/evaluations-questions/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      }).catch(() => {
        message.error({
          content: "提交失败，请检查网络",
          duration: 2
        });
      });
    },
    {
      manual: true
    }
  );
```

Ref 保存

```tsx
const rateOneRef = useRef(run);
```

调用执行

```tsx
const onRemarkChange = (criteriaIndex: number) => {
    const ratingKey = questionData?.scores?.[criteriaIndex].rating_key;
    rateOneRef.current(
      JSON.stringify({
        task_id: questionData.task_id,
        user_id: userId,
        question_id: questionData.question_id,
        rating_key: ratingKey,
        rating_value: rateValueArr[criteriaIndex],
        feedback: feedbackTextArr[criteriaIndex]
      })
    );
    // 更新进度
    setEvaluationProgress({
      question_index: index,
      criteriaIndex
    });
  };
```

## 例子3：解决 useEffect 依赖问题

ref 保存

```tsx
const curTaskIndexRef = useRef(curTaskIndex);
```

useEffect 使用 ref 保存的值

```tsx
// 在这个 useEffect 中，在做 if 判断时使用到了 curTaskIndex 值，但是通过 Ref 保存，可以不用在 useEffect 中依赖这个值
useEffect(() => {
    if (!reqLoading && !props.recall && listRef?.current && evaluationData.length) {
      humanEvaluationStore.set(evaluationProgressIndex, curTaskIndexRef.current);
    }
  }, [reqLoading, props.recall, evaluationData]);	// 此处没有依赖这个值
```

