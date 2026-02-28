// Zero-dependency event emitter for toasts
type ToastType = 'success' | 'error' | 'info';
type Listener = (msg: string, type: ToastType) => void;

let _listener: Listener | null = null;

export const toast = {
  /** Internal — called by <Toaster> to register itself */
  _on(fn: Listener): () => void {
    _listener = fn;
    return () => { _listener = null; };
  },
  success: (msg: string) => _listener?.(msg, 'success'),
  error:   (msg: string) => _listener?.(msg, 'error'),
  info:    (msg: string) => _listener?.(msg, 'info'),
};
