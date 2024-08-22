import"./Fonthead.css"


const Fonthead = () => {

  return (
    <div className="font">
       <div className="fontheade">
        <div className="lettre">
          <i>100% pur ambodiroara</i>
          <h1>Rhum Arrangé Noblesse</h1>
          <h2>Vita  Malagasy</h2>
          <i>Ny fahasalamana no adivarotra</i>
        </div>
        <img src="./image/FB_IMG_17138946933175100.jpg" alt="" className="image"/>
       </div>
        <div className="ronde">
            <div className="pourcentage">
            <span className="moyen">40%</span>
            <span className="moyen">41%</span>
            <span className="moyen">42%</span>
            <span className="moyen">43%</span>
            <span className="moyen">44%</span>
            </div>
            <i className="rhum">Taux d'alcool regulierment pour la chanté</i>
             
        </div>
     </div>
  )
}

export default Fonthead