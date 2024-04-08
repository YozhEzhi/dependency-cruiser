export type ColumnFormatType = "string" | "integer" | "percent";
export interface IColumnMetaData {
  title: string;
  format: ColumnFormatType;
  width: string;
}
export type IMeta = Map<string, IColumnMetaData>;
export interface IData {
  name: string;
  moduleCount: number;
  afferentCouplings: number;
  efferentCouplings: number;
  instability: number;
  size: number;
  topLevelStatementCount: number;
}
export interface ITableObject {
  meta: IMeta;
  data: IData[];
}
