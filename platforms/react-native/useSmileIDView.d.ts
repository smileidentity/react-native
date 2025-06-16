interface SmileIDProps {
    onResult?: (event: {
        nativeEvent: {
            error: any;
            result: any;
        };
    }) => void;
    [key: string]: any;
}
export declare const useSmileIDView: (viewName: string, props: SmileIDProps) => import("react").MutableRefObject<any>;
export {};
//# sourceMappingURL=useSmileIDView.d.ts.map