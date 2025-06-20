/**
 * Generic native props type for all SmileID views.
 * This eliminates duplication across view files.
 *
 * @template T - The specific request type for the view's config
 */
export type NativeProps<T> = {
  config: [T];
  onSmileIDResult?: (event: any) => void;
  onSmileIDError?: (event: any) => void;
};
