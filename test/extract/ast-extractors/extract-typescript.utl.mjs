import extractTypescript from "#extract/ast-extractors/extract-typescript-deps.mjs";
import { getASTFromSource } from "#extract/parse/to-typescript-ast.mjs";

export default (pTypesScriptSource, pExoticRequireStrings = []) =>
  extractTypescript(
    getASTFromSource({ source: pTypesScriptSource }),
    pExoticRequireStrings,
  );
