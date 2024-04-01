/**
 * @interceptor如果返回true-调用传入的done函数----如果返回false-调用传入的canceled函数
 * **/
import { noop, isPromise } from './basic'

export type Interceptor = (
  ...args: any[]
) => Promise<boolean> | boolean | undefined | void;

export function callInterceptors(
  interceptor: Interceptor | undefined,
  {
    args= [],
    done,
    canceled,
    error,
  }: {
    args?: unknown[];
    done: () => void;
    canceled?: () => void;
    error?: () => void;
  }
) {
  if(interceptor) {
    const returnVal = interceptor.apply(null, args);

    if(isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if(value) {
            done();
          } else if(canceled) {
            canceled();
          }
        })
        .catch(error || noop)
    } else if(returnVal) {
      done();
    } else if(canceled) {
      canceled();
    }
  } else {
    done();
  }
}
