import { EOL } from "node:os";

/**
 * @param {import("./table-object.js").IData[]} pData
 * @param {import("./table-object.js").IMeta} pMetaData
 * @returns {string}
 */
export function formatAsJSON(pData, pMetaData) {
  const lReasonableIndent = 2;
  return JSON.stringify(pData, null, lReasonableIndent).concat(EOL);
}
