//https://cetesb.sp.gov.br/ar/padroes-de-qualidade-do-ar/

function generateIndex(sensorData: SensorInfo[], type: string) {

  let indice = null, quality = null;
  let color = 'grey';
  let description = null;
  let media = 0;
  let count = 0;
  let somaValue = 0;
  const currentDate = Date.now();

  const calcAverage = (time: number | Date) => {
    sensorData.forEach(item => {
      const itemDate = new Date(item.time);    
      if (itemDate >= time) {
        somaValue += Number(item.value);
        count++;
      }
    });
    media = somaValue / count;
  }  
  
    switch(type){
      case "air_quality_co"://monóxido de carbono   
      calcAverage(new Date(currentDate - 28800000));
      media = somaValue / count;
      
        if (0 <= media && media < 4.5) {
          indice = calculateIndex(0, 100, 0, 4.5, media);
        } else if (4.5 <= media && media < 9) {
          indice = calculateIndex(0, 100, 4.5, 9, media);
        } else if (9 <= media && media < 15) {
          indice = calculateIndex(100, 200, 9, 15, media);
        } else if (15 <= media && media < 30) {
          indice = calculateIndex(200, 300, 15, 30, media);
        } else if (30 <= media && media < 40) {
          indice = calculateIndex(300, 400, 30, 40, media);
        } else if (40 <= media && media < 50) {
          indice = calculateIndex(400, 500, 40, 50, media);
        }

        if(indice)
        if(0<=indice && indice<=9){
          color = "green"; description = "Não apresenta riscos a nenhum grupo."; quality = "Boa";
        }else
        if(9<indice && indice<=11){
          color = "yellow"; description = "Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar sintomas como tosse seca e cansaço. A população, em geral, não é afetada. "; 
          quality = "Moderada";
        }else
        if(11<indice && indice<=13){
          color = "orange"; description = "Toda a população pode apresentar sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta. Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar efeitos mais sérios na saúde. "; 
          quality = "Ruim";
        }else
        if(13<indice && indice<=15){
          color = "red"; description = "Toda a população pode apresentar agravamento dos sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta e ainda falta de ar e respiração ofegante. Efeitos ainda mais graves à saúde de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas)."; 
          quality = "Muito Ruim";
        }else
        if(15<indice){
          color = "purple"; description = "Toda a população pode apresentar sérios riscos de manifestações de doenças respiratórias e cardiovasculares. Aumento de mortes prematuras em pessoas de grupos sensíveis."; 
          quality = "Péssima";
        }
        break;

      case "air_quality_no2"://dióxido de nitrogênio
      calcAverage(new Date(currentDate - 3600000));
        media = somaValue / count;
      
        if (0 <= media && media < 100) {
          indice = calculateIndex(0, 100, 0, 100, media);
        } else if (100 < media && media < 320) {
          indice = calculateIndex(100, 200, 100, 320, media);
        } else if (320 < media && media < 1130) {
          indice = calculateIndex(200, 300, 320, 1130, media);
        } else if (1130 < media && media < 2260) {
          indice = calculateIndex(300, 400, 1130, 2260, media);
        } else if (2260 < media && media < 3000) {
          indice = calculateIndex(400, 500, 2260, 3000, media);
        } else if (3000 < media && media < 3750) {
          indice = calculateIndex(400, 500, 3000, 3750, media);
        }

        if(indice)
        if(0<=indice && indice<=200){
          color = "green"; description = "Não apresenta riscos a nenhum grupo."; quality = "Boa";
        }else
        if(200<indice && indice<=240){
          color = "yellow"; description = "Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar sintomas como tosse seca e cansaço. A população, em geral, não é afetada. "; 
          quality = "Moderada";
        }else
        if(240<indice && indice<=320){
          color = "orange"; description = "Toda a população pode apresentar sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta. Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar efeitos mais sérios na saúde. "; 
          quality = "Ruim";
        }else
        if(320<indice && indice<=1130){
          color = "red"; description = "Toda a população pode apresentar agravamento dos sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta e ainda falta de ar e respiração ofegante. Efeitos ainda mais graves à saúde de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas)."; 
          quality = "Muito Ruim";
        }else
        if(1130<indice){
          color = "purple"; description = "Toda a população pode apresentar sérios riscos de manifestações de doenças respiratórias e cardiovasculares. Aumento de mortes prematuras em pessoas de grupos sensíveis."; 
          quality = "Péssima";
        }
        break;

      case "air_quality_o3": //ozônio
      calcAverage(new Date(currentDate - 3600000));
        media = somaValue / count;
      
        if (0 <= media && media < 80) {
          indice = calculateIndex(0, 100, 0, 80, media);
        } else if (80 < media && media < 160) {
          indice = calculateIndex(100, 200, 80, 160, media);
        } else if (160 < media && media < 200) {
          indice = calculateIndex(200, 300, 160, 200, media);
        } else if (200 < media && media < 800) {
          indice = calculateIndex(300, 400, 200, 800, media);
        } else if (800 < media && media < 1000) {
          indice = calculateIndex(400, 500, 800, 1000, media);
        } else if (1000 < media) {
          indice = calculateIndex(400, 500, 1000, 1200, media);
        }

        if(indice)
        if(0<=indice && indice<=100){
          color = "green"; description = "Não apresenta riscos a nenhum grupo."; quality = "Boa";
        }else
        if(100<indice && indice<=130){
          color = "yellow"; description = "Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar sintomas como tosse seca e cansaço. A população, em geral, não é afetada. "; 
          quality = "Moderada";
        }else
        if(130<indice && indice<=160){
          color = "orange"; description = "Toda a população pode apresentar sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta. Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar efeitos mais sérios na saúde. "; 
          quality = "Ruim";
        }else
        if(160<indice && indice<=200){
          color = "red"; description = "Toda a população pode apresentar agravamento dos sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta e ainda falta de ar e respiração ofegante. Efeitos ainda mais graves à saúde de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas)."; 
          quality = "Muito Ruim";
        }else
        if(200<indice){
          color = "purple"; description = "Toda a população pode apresentar sérios riscos de manifestações de doenças respiratórias e cardiovasculares. Aumento de mortes prematuras em pessoas de grupos sensíveis."; 
          quality = "Péssima";
        }
        break;

        case "air_quality_so2": //dióxido de enxofre
        calcAverage(new Date(currentDate - 86400000));
      
        media = somaValue / count;
      
        if (0 < media && media < 80) {
          indice = calculateIndex(0, 100, 0, 80, media);
        } else if (80 < media && media < 365) {
          indice = calculateIndex(0, 100, 80, 365, media);
        } else if (365 < media && media < 800) {
          indice = calculateIndex(100, 200, 80, 365, media);;
        } else if (800 < media && media < 1600) {
          indice = calculateIndex(200, 300, 365, 800, media);
        } else if (1600 < media && media < 2100) {
          indice = calculateIndex(300, 400, 800, 1600, media);
        } else if (2100 < media) {
          indice = calculateIndex(400, 500, 2100, 2620, media);
        }

        if(indice)
        if(0<indice && indice<=20){
          color = "green"; description = "Não apresenta riscos a nenhum grupo."; quality = "Boa";
        }else
        if(20<indice && indice<=40){
          color = "yellow"; description = "Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar sintomas como tosse seca e cansaço. A população, em geral, não é afetada. "; 
          quality = "Moderada";
        }else
        if(40<indice && indice<=365){
          color = "orange"; description = "Toda a população pode apresentar sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta. Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar efeitos mais sérios na saúde. "; 
          quality = "Ruim";
        }else
        if(365<indice && indice<=800){
          color = "red"; description = "Toda a população pode apresentar agravamento dos sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta e ainda falta de ar e respiração ofegante. Efeitos ainda mais graves à saúde de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas)."; 
          quality = "Muito Ruim";
        }else
        if(800<indice){
          color = "purple"; description = "Toda a população pode apresentar sérios riscos de manifestações de doenças respiratórias e cardiovasculares. Aumento de mortes prematuras em pessoas de grupos sensíveis."; 
          quality = "Péssima";
        }
        break;

        case "temperature": //dióxido de enxofre
        indice = Number(sensorData[0].value);
        break;

        case "humidity": //dióxido de enxofre
        indice = Number(sensorData[0].value);
        break;
    }

    return {indice, color, description, quality};
}

function calculateIndex(indice_i: number, indice_f: number, conc_i: number, conc_f: number, conc_medida: number) {
  return indice_i + ((indice_f - indice_i) / (conc_f - conc_i)) * (conc_medida - conc_i);
}

function generateColor(indice: number){
  let color = '';
  let description = " ";

  if(indice)
        if(0<=indice && indice<=40){
          color = "green"; description = "Boa";
        }else
        if(41<=indice && indice<=80){
          color = "yellow"; 
          description = "Moderada";
        }else
        if(81<=indice && indice<=120){
          color = "orange"; 
          description = "Ruim";
        }else
        if(121<=indice && indice<=200){
          color = "red";
          description = "Muito Ruim";
        }else
        if(200<indice){
          color = "purple"; 
          description = "Péssima";
        }

  return {color, description};
}

function heatIndexWithColor(temperatureCelsius: number, humidityPercent: number): { heatIndex: number, color: string } {
  let temperatureFahrenheit = temperatureCelsius * 9 / 5 + 32;
  
  let heatIndex = 0.5 * (temperatureFahrenheit + 61.0 + ((temperatureFahrenheit - 68.0) * 1.2) + (humidityPercent * 0.094));
  
  if (heatIndex >= 80) {
    let heatIndexAdjustment = (temperatureFahrenheit - 68.0) * 0.2 + humidityPercent * 0.05 + 15;
    
    if (humidityPercent < 13 && 80 <= temperatureFahrenheit && temperatureFahrenheit <= 112) {
      heatIndexAdjustment -= ((13 - humidityPercent) / 4) * Math.sqrt((17 - Math.abs(temperatureFahrenheit - 95.0)) / 17);
    } else if (humidityPercent > 85 && 80 <= temperatureFahrenheit && temperatureFahrenheit <= 87) {
      heatIndexAdjustment += ((humidityPercent - 85) / 10) * ((87 - temperatureFahrenheit) / 5);
    }
    
    heatIndex = heatIndex + heatIndexAdjustment;
  }
  
  let color: string;
  
  if (heatIndex < 80) {
    color = "green";
  } else if (heatIndex >= 80 && heatIndex < 90) {
    color = "yellow";
  } else if (heatIndex >= 90 && heatIndex < 105) {
    color = "orange";
  } else if (heatIndex >= 105 && heatIndex < 130) {
    color = "red";
  } else {
    color = "purple";
  }
  
  return { heatIndex, color };
}



export { generateIndex, generateColor, heatIndexWithColor };

  