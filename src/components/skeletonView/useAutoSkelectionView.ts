import { computed, onMounted, reactive, ref } from "vue";
import type { UnwrapRef } from "vue";

type TApiFun<TData, TParams extends Array<any>> = (
    ...params: TParams
) => Promise<TData>;

/* 定义可自定义的默认状态 */
export type SkeletonStatus = "loading" | "success";

export interface IUseAutoSkeletonViewProps<TData, TParams extends any[]> {
    apiFun: TApiFun<TData, TParams>;// 调用接口api
    placeholderResult?: TData; // 骨架屏用到的占位数据
    queryInMount?: boolean; // 在父组件挂载时自动调用接口，默认true
    initQueryParams?: TParams; // 调用接口用到的参数
    transformDataFun?: (data: TData) => TData; // 接口请求完成后，转换数据
    updateParamsOnFetch?: boolean; // 手动调用接口后，更新请求参数
    defaultStatus?: SkeletonStatus; // 默认骨架屏组件状态
    onSuccess?: (data: any) => void; // 接口调用成功的回调
    isEmpty?: (data: TData) => boolean; // 重写骨架屏判空逻辑
}

export type IAutoSkeletonViewResult<TData, TParams extends any[]> = UnwrapRef<{
    execute: TApiFun<TData, TParams>;
    result: TData | null;
    retry: () => Promise<TData>;
    loading: boolean;
    status: SkeletonStatus | "error";
    getField: (key: string) => any;
    bindProps: {
        result: TData | null;
        status: SkeletonStatus | "error";
        errorMsg: string;
        placeholderResult?: TData;
        isEmpty?: (data: TData) => boolean;
    };
    bindEvents: {
        retry: () => Promise<TData>;
    };
}>;

export function useAutoSkeletonView<TData = any, TParams extends any[] = any[]>(
    prop: IUseAutoSkeletonViewProps<TData, TParams>
): IAutoSkeletonViewResult<TData, TParams> {
    const {
        apiFun,
        defaultStatus = "loading",
        placeholderResult,
        isEmpty,
        initQueryParams = [],
        transformDataFun,
        onSuccess,
        updateParamsOnFetch = true,
        queryInMount = true,
    } = prop;

    const status = ref<SkeletonStatus | "error">(defaultStatus);

    const result = ref<TData | null>(null);

    const placeholder = ref<TData | undefined>(placeholderResult);

    const errorMsg = ref("");

    const lastFetchParams = ref<TParams>(initQueryParams as TParams);

    const executeApiFun: TApiFun<TData, TParams> = (...params: TParams) => {
        if (updateParamsOnFetch) {
            lastFetchParams.value = params;
        }

        status.value = "loading";

        return apiFun(...params)
            .then((res) => {
                let data: any = res;
                if (transformDataFun) {
                    data = transformDataFun(res);
                }
                placeholder.value = data;
                result.value = data;
                status.value = "success";
                onSuccess && onSuccess(data);
                return res;
            })
            .catch((e) => {
                console.error("--useAutoSkeletonView--", e);
                status.value = "error";
                errorMsg.value = e.message;
                throw e;
            });
    };

    function retry() {
        return executeApiFun(...(lastFetchParams.value as TParams));
    }

    onMounted(() => {
        if (queryInMount && defaultStatus === "loading") {
            executeApiFun(...(initQueryParams as TParams));
        }
    });

    const loading = computed(() => {
        return status.value === "loading";
    });

    function getField(key: string) {
        if (status.value !== "success") {
            return "";
        }
        if (result.value) {
            // @ts-ignore
            return result.value[key];
        }
        return "";
    }

    return reactive({
        execute: executeApiFun,
        result: result,
        retry,
        loading,
        status,
        getField,
        bindProps: {
            result: result,
            status,
            errorMsg,
            placeholderResult: placeholder,
            isEmpty,
        },
        bindEvents: {
            retry: retry,
        },
    });
}
