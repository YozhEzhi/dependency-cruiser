import { EOL } from "node:os";
import chalk from "chalk";
import { formatNumber, formatPercentage } from "../utl/index.mjs";

/**
 * @param {import("./table-object.js").IMeta} pMetaData
 * @returns {string}
 */
function compileHeader(pMetaData) {
  return chalk.bold(
    Array.from(pMetaData.values())
      .map(({ title, width, format }) =>
        format === "string"
          ? title.padEnd(width + 1)
          : title.padStart(width + 1),
      )
      .join(" "),
  );
}
/**
 * @param {import("./table-object.js").IMeta} pMetaData
 * @returns {string}
 */
function compileDemarcationLine(pMetaData) {
  return Array.from(pMetaData.values())
    .map(({ width }) => "-".repeat(width + 1))
    .join(" ");
}

/**
 * @param {import("./table-object.js").IData[]} pData
 * @param {import("./table-object.js").IMeta} pMetaData
 * @returns {string}
 */
function compileData(pData, pMetaData) {
  return pData
    .map((pRow) => {
      return Object.keys(pRow)
        .map((pKey) => {
          const lMeta = pMetaData.get(pKey);
          if (lMeta.format === "string") {
            // eslint-disable-next-line security/detect-object-injection
            return pRow[pKey].padEnd(lMeta.width + 1);
          }
          if (lMeta.format === "percent") {
            // eslint-disable-next-line security/detect-object-injection
            return formatPercentage(pRow[pKey]).padStart(lMeta.width + 1);
          }
          // eslint-disable-next-line security/detect-object-injection
          return Number.isInteger(pRow[pKey])
            ? // eslint-disable-next-line security/detect-object-injection
              formatNumber(pRow[pKey]).padStart(lMeta.width + 1)
            : "".padStart(lMeta.width + 1);
        })
        .join(" ");
    })
    .join(EOL);
}

/**
 * @param {import("./table-object.js").IData[]} pData
 * @param {import("./table-object.js").IMeta} pMetaData
 * @returns {string}
 */
export function formatAsText(pData, pMetaData) {
  return [compileHeader(pMetaData)]
    .concat(compileDemarcationLine(pMetaData))
    .concat(compileData(pData, pMetaData))
    .join(EOL)
    .concat(EOL);
}
