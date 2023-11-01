---
title: VueUse源码
description: VueUse源码
layout: ../../../layouts/MainLayout.astro
---

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

```ts
// 用于获取当前的window对象，server下是undefined
export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined;
```

```ts
// 判断一个对象里面是否有指定的key
function containsProp(obj, ...props) {
  return props.some((k) => k in obj);
}
```

```ts
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

function createEventHook() {
  const fns = /* @__PURE__ */ new Set();
  const off = (fn) => {
    fns.delete(fn);
  };
  const on = (fn) => {
    fns.add(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return {
      off: offFn,
    };
  };
  const trigger = (param) => {
    return Promise.all(Array.from(fns).map((fn) => fn(param)));
  };
  return {
    on,
    off,
    trigger,
  };
}
```

### useFetch

```ts
function isFetchOptions(obj: object): obj is UseFetchOptions {
  return (
    obj &&
    containsProp(
      obj,
      "immediate",
      "refetch",
      "initialData",
      "timeout",
      "beforeFetch",
      "afterFetch",
      "onFetchError",
      "fetch",
      "updateDataOnError"
    )
  );
}
```

```ts
function headersToObject(headers: HeadersInit | undefined) {
  if (typeof Headers !== "undefined" && headers instanceof Headers)
    return Object.fromEntries([...headers.entries()]);
  return headers;
}
```

```ts
export function useFetch<T>(
  url: MaybeRefOrGetter<string>,
  ...args: any[]
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  // 判断当前浏览器环境下有没有AbortController对象(可控制取消fetch的请求)
  const supportsAbort = typeof AbortController === "function";

  let fetchOptions: RequestInit = {};
  let options: UseFetchOptions = {
    immediate: true,
    refetch: false,
    timeout: 0,
    updateDataOnError: false,
  };

  interface InternalConfig {
    method: HttpMethod;
    type: DataType;
    payload: unknown;
    payloadType?: string;
  }

  const config: InternalConfig = {
    method: "GET",
    type: "text" as DataType,
    payload: undefined as unknown,
  };

  if (args.length > 0) {
    // 如果有传递第二个参数，则用传递的配置对象和67行的默认options对象构造出一个配置对象
    if (isFetchOptions(args[0])) options = { ...options, ...args[0] };
    else fetchOptions = args[0];
  }

  // 如果参数大于两个
  if (args.length > 1) {
    // 直接当作配置对象合并到options对象里
    if (isFetchOptions(args[1])) options = { ...options, ...args[1] };
  }

  // fetch使用的是浏览器原生的fetch对象
  const { fetch = defaultWindow?.fetch, initialData, timeout } = options;

  // Event Hooks
  const responseEvent = createEventHook<Response>();
  const errorEvent = createEventHook<any>();
  const finallyEvent = createEventHook<any>();

  const isFinished = ref(false);
  const isFetching = ref(false);
  const aborted = ref(false);
  const statusCode = ref<number | null>(null);
  const response = shallowRef<Response | null>(null);
  const error = shallowRef<any>(null);
  const data = shallowRef<T | null>(initialData || null);

  // 是否可以取消的ref，根据当前环境下是否有AbortController构造函数，并且所在请求状态下，这样取消才有意义
  const canAbort = computed(() => supportsAbort && isFetching.value);

  let controller: AbortController | undefined;
  let timer: Stoppable | undefined;

  // 取消请求的方法
  const abort = () => {
    if (supportsAbort) {
      controller?.abort();
      controller = new AbortController();
      controller.signal.onabort = () => (aborted.value = true);
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal,
      };
    }
  };

  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading;
    isFinished.value = !isLoading;
  };
  // 调用封装后的setTimeout方法，返回一个timer对象
  // {
  //  isPending: readonly(isPending),
  //  start,
  //  stop,
  // }
  if (timeout) timer = useTimeoutFn(abort, timeout, { immediate: false });

  // 执行请求函数
  const execute = async (throwOnFailed = false) => {
    // 每次请求前先取消上一次请求
    abort();
    // 开启loading状态，以及把isFinished设置为false，isFinishe: 是指当前请求的状态是否已完成
    loading(true);
    // 重置参数
    error.value = null;
    statusCode.value = null;
    aborted.value = false;

    const defaultFetchOptions: RequestInit = {
      method: config.method,
      headers: {},
    };

    if (config.payload) {
      const headers = headersToObject(defaultFetchOptions.headers) as Record<
        string,
        string
      >;
      const payload = toValue(config.payload);
      // Set the payload to json type only if it's not provided and a literal object is provided and the object is not `formData`
      // The only case we can deduce the content type and `fetch` can't
      // 根据配置参数payloadType来决定请求接口的类型
      if (
        !config.payloadType &&
        payload &&
        Object.getPrototypeOf(payload) === Object.prototype &&
        !(payload instanceof FormData)
      )
        config.payloadType = "json";

      if (config.payloadType)
        headers["Content-Type"] =
          payloadMapping[config.payloadType] ?? config.payloadType;

      defaultFetchOptions.body =
        config.payloadType === "json"
          ? JSON.stringify(payload)
          : (payload as BodyInit);
    }

    let isCanceled = false;
    const context: BeforeFetchContext = {
      url: toValue(url),
      options: {
        ...defaultFetchOptions,
        ...fetchOptions,
      },
      cancel: () => {
        isCanceled = true;
      },
    };
    // 请求的前置处理：入参是context，出参也是context
    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context));

    // 如果是取消请求状态或者当前环境没有fetch对象时，则不做请求处理
    if (isCanceled || !fetch) {
      loading(false);
      return Promise.resolve(null);
    }

    // 请求响应的数据
    let responseData: any = null;

    if (timer) timer.start();

    return new Promise<Response | null>((resolve, reject) => {
      fetch(context.url, {
        ...defaultFetchOptions,
        ...context.options,
        headers: {
          ...headersToObject(defaultFetchOptions.headers),
          ...headersToObject(context.options?.headers),
        },
      })
        .then(async (fetchResponse) => {
          response.value = fetchResponse;
          statusCode.value = fetchResponse.status;
          // 根据配置对象的type来决定响应数据的格式
          responseData = await fetchResponse[config.type]();

          // see: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
          // 判断响应体是否响应正常，如果不正常则进catch处理
          if (!fetchResponse.ok) {
            data.value = initialData || null;
            throw new Error(fetchResponse.statusText);
          }

          if (options.afterFetch) {
            // 请求的后置处理
            ({ data: responseData } = await options.afterFetch({
              data: responseData,
              response: fetchResponse,
            }));
          }
          data.value = responseData;
          // 触发？目前还搞不懂这里的作用？ 2023-11-01
          responseEvent.trigger(fetchResponse);
          return resolve(fetchResponse);
        })
        .catch(async (fetchError) => {
          let errorData = fetchError.message || fetchError.name;

          if (options.onFetchError) {
            ({ error: errorData, data: responseData } =
              await options.onFetchError({
                data: responseData,
                error: fetchError,
                response: response.value,
              }));
          }

          error.value = errorData;
          if (options.updateDataOnError) data.value = responseData;

          errorEvent.trigger(fetchError);
          if (throwOnFailed) return reject(fetchError);

          return resolve(null);
        })
        .finally(() => {
          loading(false);
          if (timer) timer.stop();
          finallyEvent.trigger(null);
        });
    });
  };

  const refetch = toRef(options.refetch);
  // 根据配置对象的refetch来决定是否刷新请求
  watch([refetch, toRef(url)], ([refetch]) => refetch && execute(), {
    deep: true,
  });

  const shell: UseFetchReturn<T> = {
    isFinished,
    statusCode,
    response,
    error,
    data,
    isFetching,
    canAbort,
    aborted,
    abort,
    execute,

    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    // method
    get: setMethod("GET"),
    put: setMethod("PUT"),
    post: setMethod("POST"),
    delete: setMethod("DELETE"),
    patch: setMethod("PATCH"),
    head: setMethod("HEAD"),
    options: setMethod("OPTIONS"),
    // type
    json: setType("json"),
    text: setType("text"),
    blob: setType("blob"),
    arrayBuffer: setType("arrayBuffer"),
    formData: setType("formData"),
  };

  function setMethod(method: HttpMethod) {
    return (payload?: unknown, payloadType?: string) => {
      if (!isFetching.value) {
        config.method = method;
        config.payload = payload;
        config.payloadType = payloadType;

        // watch for payload changes
        if (isRef(config.payload)) {
          watch(
            [refetch, toRef(config.payload)],
            ([refetch]) => refetch && execute(),
            { deep: true }
          );
        }

        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          },
        } as any;
      }
      return undefined;
    };
  }

  function waitUntilFinished() {
    return new Promise<UseFetchReturn<T>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => resolve(shell))
        .catch((error) => reject(error));
    });
  }

  function setType(type: DataType) {
    return () => {
      if (!isFetching.value) {
        config.type = type;
        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          },
        } as any;
      }
      return undefined;
    };
  }

  if (options.immediate) Promise.resolve().then(() => execute());

  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    },
  };
}
```
