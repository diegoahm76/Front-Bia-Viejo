import { useEffect } from "react";
import { Axios } from "axios";

function UseEditUnidadMedida(props) {
  useEffect(() => {
   return edit();
  });
  const edit = async () => {
    return  await Axios({
      method: "PUT",
      url: `https://backend-bia-beta-production.up.railway.app/api/almacen/unidades-medida/update/${props.id_unidad_medida}/`,
      data: { props },
    }).then(response => {
       console.log(response.data)
    }).catch(err=>{
        console.error(err)

    });

  };
}

export {UseEditUnidadMedida};
