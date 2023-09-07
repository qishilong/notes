# 注意 promie 执行顺序和任务状态

1. `Promise` 的状态一旦在任意一个任务中被敲定，则后续任务的状态不可更改
2. `Promise` 的执行顺序不仅是顺序执行，也和任务状态有关

例子：

```tsx
onClick={() =>
            okFn(
              form.getFieldsValue().className,
              String(moment(form.getFieldsValue().startTime).valueOf()),
              String(moment(form.getFieldsValue().endTime).valueOf()),
              teachingClassAuthorizationType,
              false,
              !!classLogoId ? classLogoId : undefined,
              isHasCheck,
              classIds,
              isNeedClassId,
            ).then(() => {	// 如果当前这个任务被判断为成功，则后续任务可继续调用，当前任务状态为成功
              message.success('操作成功');
              setIsShow(false);
              setQuestion(() => uuidv4());
              dispatch({
                type: 'createAndUpdateTeachingClass/handleSelectedAndSearchedClassData',
              });
              form.setFieldsValue({
                className: '',
                startTime: '',
                endTime: '',
              });
            }, () => {	// 如果在这里任务被判断为失败，则后续任务不可调用，任务状态已经被判断为失败
              setIsShow(true);
              message.error('操作失败');
            })
          }
```

如果某个任务状态失败后，还想要继续当前 `promise` 的执行，可以使用 `promise.prototype.finally()` 方法最后执行一次下一个任务