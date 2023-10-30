---
title: VueUse源码
description: VueUse源码
layout: ../../../layouts/MainLayout.astro
---

VueUse 源码

### useFocus

用于监听 DOM 元素的 focus 事件，hook 会吐出一个响应式变量。

```ts
// MaybeElementRef是一个DOM类型
// UseFocusOptions是一个配置对象
// initialValue: 初始化时是否需要获取焦点(focus)
// focusVisible: 焦点是否可见
export function useFocus(
  target: MaybeElementRef,
  options: UseFocusOptions = {}
): UseFocusReturn {
  const { initialValue = false, focusVisible = false } = options;

  const innerFocused = ref(false);
  // unrefElement方法里面主要使用了unref，如果是ref对象，则返回.value的值，如果不是ref对象，则返回本身
  const targetElement = computed(() => unrefElement(target));
  // useEventListener用于用于订阅DOM事件
  useEventListener(targetElement, "focus", (event) => {
    if (
      !focusVisible ||
      (event.target as HTMLElement).matches?.(":focus-visible")
    )
      innerFocused.value = true;
  });
  // 监听失去焦点的逻辑，同步更新innerFocused变量时，如果用户修改的value跟当前的value一样时，则做不更新操作，否则手动调用DOM的focus/blur方法
  useEventListener(targetElement, "blur", () => (innerFocused.value = false));
  // 使用者修改focused响应式变量时，
  const focused = computed({
    get: () => innerFocused.value,
    set(value: boolean) {
      if (!value && innerFocused.value) targetElement.value?.blur();
      else if (value && !innerFocused.value) targetElement.value?.focus();
    },
  });

  watch(
    targetElement,
    () => {
      focused.value = initialValue;
    },
    // flush: "post" 配置，是在DOM更新后再执行此watch回调
    { immediate: true, flush: "post" }
  );

  return { focused };
}
```

### useFetch
