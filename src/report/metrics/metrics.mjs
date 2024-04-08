import { EOL } from "node:os";
import { resultToTableObject } from "./result-to-table-object.mjs";
import { formatAsJSON } from "./format-as-json.mjs";
import { formatAsCSV } from "./format-as-csv.mjs";
import { formatAsText } from "./format-as-text.mjs";

const METRIC_WIDTH = 5;

function orderByNumber(pAttributeName) {
  return (pLeft, pRight) =>
    // eslint-disable-next-line security/detect-object-injection
    (pRight[pAttributeName] || 0) - (pLeft[pAttributeName] || 0);
}

function orderByString(pAttributeName) {
  return (pLeft, pRight) =>
    // eslint-disable-next-line security/detect-object-injection
    pLeft[pAttributeName].localeCompare(pRight[pAttributeName]);
}

/**
 *
 * @param {{modules: import("../../../types/cruise-result.mjs").IModule[]; folders: import("../../../types/cruise-result.mjs").IFolder[];}} pCruiseResult
 * @param {{orderBy: string; hideFolders: boolean; hideModules: boolean; experimentalStats: boolean;}} pReporterOptions
 * @returns {string}
 */
function transformMetricsToTable(
  { modules, folders },
  { orderBy, hideFolders, hideModules, outputType },
) {
  /** @type {import("./table-object.js").ITableObject} */
  const lObject = resultToTableObject(
    { modules, folders },
    {
      smallIntegerWidth: METRIC_WIDTH,
      largeIntegerWidth: METRIC_WIDTH + METRIC_WIDTH,
    },
  );
  let lComponents = lObject.data
    .filter(
      (pComponent) =>
        (!hideModules && pComponent.type === "module") ||
        (!hideFolders && pComponent.type === "folder"),
    )
    .sort(orderByString("name"))
    .sort(orderByNumber(orderBy || "instability"));
  if (outputType === "csv") {
    return formatAsCSV(lComponents, lObject.meta);
  }
  if (outputType === "json") {
    return formatAsJSON(lComponents, lObject.meta);
  }
  return formatAsText(lComponents, lObject.meta);
}

/**
 * returns stability metrics of modules & folders in an ascii table
 *
 * Potential future features:
 * - additional output formats (csv?, html?)
 *
 * @param {import('../../types/dependency-cruiser.js').ICruiseResult} pCruiseResult -
 * @param {import("../../types/reporter-options.js").IMetricsReporterOptions} pReporterOptions
 * @return {import('../../types/dependency-cruiser.js').IReporterOutput} -
 */
export default function metrics(pCruiseResult, pReporterOptions) {
  const lReporterOptions = pReporterOptions || {};
  if (pCruiseResult.folders) {
    return {
      output: transformMetricsToTable(pCruiseResult, lReporterOptions),
      exitCode: 0,
    };
  } else {
    return {
      output:
        `${EOL}ERROR: The cruise result didn't contain any metrics - re-running the cruise with${EOL}` +
        `       the '--metrics' command line option should fix that.${EOL}${EOL}`,
      exitCode: 1,
    };
  }
}
