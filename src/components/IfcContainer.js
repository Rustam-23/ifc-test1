import React, { forwardRef } from "react";

const IfcContainer = forwardRef((props, ref) => {

  const viewer = props.viewer;

  const ifcOnClick = async (event) => {
    if (viewer) {
      const result = await viewer.IFC.pickIfcItem(true);
      if (result) {
          const props = await viewer.IFC.getProperties(result.modelID, result.id, false);
          console.log(props);
          const type = viewer.IFC.loader.ifcManager.getIfcType(result.modelID, result.id);
          console.log("type", type);
      }
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "80vw",
          height: "80vh",
          overflow: "hidden"
        }}
        className="ifcContainer"
        ref={ref}
        onDoubleClick={ifcOnClick}
        onMouseMove={viewer && (() => viewer.IFC.selector.prePickIfcItem())}>
      </div>
    </>
  );
});

export { IfcContainer };