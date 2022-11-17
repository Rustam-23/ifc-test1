import React, { createRef, useEffect, useState } from "react";
import { IfcContainer } from "./IfcContainer";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";

const IfcViewer = () => {
  const ifcContainer = createRef();
  const [viewer, setViewer] = useState();

  useEffect(() => {
    console.log("!@J#LJ#J!#");

    if (ifcContainer.current) {
      const container = ifcContainer.current;
      console.log(container);

      const ifcViewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
      ifcViewer.grid.setGrid(50, 20, new Color(0xcccccc), new Color(0xaaaaaa));
      ifcViewer.axes.setAxes(10);

      ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: true
      });
      setViewer(ifcViewer);
    }
  }, []);

  const ifcOnLoad = async (e) => {
    const file = e && e.target && e.target.files && e.target.files[0];
    if (file && viewer) {

      console.log(file);

      await viewer.IFC.loadIfc(file, true);
    }
  };
  
  return (
    <div>
      <input
        type="file"
        id="file"
        accept=".ifc"
        onChange={ifcOnLoad}
        style={{ display: "none" }}
      />
      <label htmlFor="file">Open file</label>
      <IfcContainer
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden"
        }}
      ref={ifcContainer}
      viewer={viewer}
      />
    </div>
  );
};

export default IfcViewer;