import { useEffect, useRef } from "react";
import { useMapContext } from "./MapContext";

import { useMapEffect } from "./mapUtils";

export function Polyline(props: google.maps.PolylineOptions) {
  const polyline = useRef<google.maps.Polyline>();
  const { map } = useMapContext();
  useEffect(() => {
    if (!polyline.current) {
      const path = google.maps.geometry.encoding.decodePath(
        "kq{dIqmrx@c@@wAP@qAAk@KmDLaDnAaUT{FXuABAFAFGFS@UCWIMOGMDEH}Ao@yDaCuGgEaC}AcAg@i@I_@@_@FqEj@qC^u@DoAEo@WoCgC}DaEiBaBsAsAk@i@eAu@wAq@aBg@YQcA_AaAuAc@aA{@}Bg@cAi@g@iAm@m@c@[S{Ak@i@WqAe@eGqBcAm@aAu@oN}KmKgIqI{GiCqBu@]i@KoBQkGa@wAIi@A}@FkLpCiLnCwS`F_H~AkBVk@?gBSs@Wm@]][q@q@aAuAmAqCoA_Da@y@o@s@}@o@iAa@UzA_@jAwB|CYh@Kf@AdB@fBC\\c@fEIVUXUFQC}@]_Ac@aBiA_@Wu@W_@Ew@@iAD]O[w@g@qBKOOGS@m@DcF^gAJ{Bb@iLxCoA\\{Bn@@g@?s@GsCKcKQ}PGkIcGn@gFd@{SlB}NlAcIr@c@Db@EjBQnCUjHm@d[qCvBS~CYO}@qCyOeAaGqAwHoIoBn@o`@b@g]XyOF}EtBgCx@cAv@}@RSLMe@eBSs@}A{FkAkEsBuH}BaIkCgJe@kB\\YJ[PaAhAkJt@_GnBiPd@aC`@eBVwBdA}H`@cEf@mIj@yJHyD?gAAyDOkDWsDg@iEg@yCqAcF}AiE{A{CaA}A}AkBoBgBeDkByDaAuF{AeJeCwDw@gASWGaEMIGa@C?ICGGKIEC?[i@IEWmCa@uEcAcN[_Fq@qHsCwTkDqWyBeP_AwGcBuKkC}Oc@cE[oGQyDq@oRKqDGw@Bm@Q{G?a@UmFc@oLCi@Gw@XMl@WNGl@Wt@]vBcAxFkCdPuHjCuAnBsAlBqBbBaCvAoCfAuCz@_Dt@qDtAmJxAeKp@sDx@oDhCoJnGeUrCeK|B_JtGkX`GsVxG{X~BuJv@iDx@iEn@sER{BH_AP{EDqHCoCWcGSaD@a@MyB@CDI@I@YGUKMCAYuBGUqF{q@@_@ScCFY?YIWGIECScCKSsEoj@IuAAqCNgBPaA^sAXu@b@s@hDcEbCwCjGsHDAvAuABBFBLAJMFUAYGSKKO@C@w@oAU_@SUuHiOwDsHkPs[sIwPiFaKGCg@cAmFmKcOmYcBaDCOsAmCwBkEoF_KuGmM{BkE{@sA}@cBwBoEo@cB}@gDkBuHiBwHs@cDaAiFe@yCo@wF_CsS]uCMkARuBXyBr@iCNY^aBd@iANQPGCU[i@Q_@GMc@iAIw@FeA`@eAj@w@^m@J}@G}@Ug@a@_@uCoBf@yILkGCcJB{C?sBJkAFSPOVEDA@UAw@IIMSKq@U[U?u@IE?"
      );
      polyline.current = new google.maps.Polyline({ ...props, map, path });
      return () => {
        polyline.current?.setMap(null);
        polyline.current = undefined;
      };
    }
  }, []);

  useMapEffect(() => {
    if (polyline.current) {
      polyline.current.setOptions(props);
    }
  }, [polyline.current, props]);

  return null;
}
