import { ModifierArg } from '../base';
import { SnapOptions, SnapState } from './pointer';
export declare type SnapSizeOptions = Pick<SnapOptions, 'targets' | 'offset' | 'endOnly' | 'range'>;
declare function start(arg: ModifierArg<SnapState>): any;
declare function set(arg: any): void;
declare const snapSize: {
    start: typeof start;
    set: typeof set;
    defaults: Pick<SnapOptions, "offset" | "endOnly" | "targets" | "range">;
};
export default snapSize;
