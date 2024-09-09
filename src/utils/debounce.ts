// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, delay = 5000) => {
  let timer: ReturnType<typeof setTimeout>;
    return (...args: unknown[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, delay);
    };
};
