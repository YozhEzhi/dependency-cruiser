import { EOL } from "node:os";

/**
 * @param {import("./table-object.js").IData[]} pData
 * @param {import("./table-object.js").IMeta} pMetaData
 * @returns {string}
 */
export function formatAsCSV(pData, pMetaData) {
  // @TODO: magic to circumvent csv foot guns (commas in strings, quoting strings, ...)
  return Array.from(pMetaData.values())
    .map(({ title }) => title)
    .join(",")
    .concat(EOL)
    .concat(pData.map((pRow) => Object.values(pRow).join(",")).join(EOL))
    .concat(EOL);
}
