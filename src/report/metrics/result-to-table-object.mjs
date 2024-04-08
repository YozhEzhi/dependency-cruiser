function getMetricsFromFolder({
  name,
  moduleCount,
  afferentCouplings,
  efferentCouplings,
  instability,
  experimentalStats,
}) {
  const lReturnValue = {
    name,
    type: "folder",
    moduleCount,
    afferentCouplings,
    efferentCouplings,
    instability,
  };
  if (experimentalStats) {
    lReturnValue.size = experimentalStats.size;
    lReturnValue.topLevelStatementCount =
      experimentalStats.topLevelStatementCount;
  }
  return lReturnValue;
}

/**
 *
 * @param {import("../../../types/cruise-result.mjs").IModule} param0
 * @returns
 */
function getMetricsFromModule({
  source,
  dependents,
  dependencies,
  instability,
  experimentalStats,
}) {
  const lReturnValue = {
    name: source,
    type: "module",
    moduleCount: 1,
    afferentCouplings: dependents.length,
    efferentCouplings: dependencies.length,
    instability,
  };
  if (experimentalStats) {
    lReturnValue.size = experimentalStats.size;
    lReturnValue.topLevelStatementCount =
      experimentalStats.topLevelStatementCount;
  }
  return lReturnValue;
}

function metricsAreCalculable(pModule) {
  return Object.hasOwn(pModule, "instability");
}

function componentIsCalculable(pComponent) {
  return (
    Number.isInteger(pComponent.moduleCount) && pComponent.moduleCount > -1
  );
}

/**
 *
 * @param {{modules: import("../../../types/cruise-result.mjs").IModule[]; folders: import("../../../types/cruise-result.mjs").IFolder[];}} param0
 * @param {smallIntegerWidth:number; largeIntegerWidth: number} param1
 * @returns {import("./table-object").ITableObject}
 */
// eslint-disable-next-line max-lines-per-function
export function resultToTableObject(
  { modules, folders },
  { smallIntegerWidth, largeIntegerWidth },
) {
  const lReturnValue = {
    meta: new Map([
      ["name", { width: 0, title: "name", format: "string" }],
      ["type", { width: 6, title: "type", format: "string" }],
      [
        "moduleCount",
        {
          width: smallIntegerWidth,
          title: "N",
          format: "integer",
        },
      ],
      [
        "afferentCouplings",
        {
          width: smallIntegerWidth,
          title: "Ca",
          format: "integer",
        },
      ],
      [
        "efferentCouplings",
        {
          width: smallIntegerWidth,
          title: "Ce",
          format: "integer",
        },
      ],
      [
        "instability",
        {
          width: smallIntegerWidth,
          title: "I (%)",
          format: "percent",
        },
      ],
      [
        "size",
        {
          width: largeIntegerWidth,
          title: "size",
          format: "integer",
        },
      ],
      [
        "topLevelStatementCount",
        {
          width: smallIntegerWidth,
          title: "#tls",
          format: "integer",
        },
      ],
    ]),
    data: [],
  };
  lReturnValue.data = folders
    .map(getMetricsFromFolder)
    .concat(modules.filter(metricsAreCalculable).map(getMetricsFromModule))
    .filter(componentIsCalculable);

  const lMaxNameWidth = lReturnValue.data
    .map(({ name }) => name.length)
    .concat(lReturnValue.meta.get("name").title.length)
    .sort((pLeft, pRight) => pLeft - pRight)
    .pop();
  lReturnValue.meta.get("name").width = lMaxNameWidth;

  return lReturnValue;
}
