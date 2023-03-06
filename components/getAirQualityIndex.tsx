import { HEADERS } from '../config/index.json';
import { generateIndex, generateColor } from '../components/generateIndex';
import { useState } from 'react';

const offset = 100;
const limit = 50;

async function getAirQualityIndex(component: string, sensors: Sensor[]): Promise<ObjectFormat> {
  const object: ObjectFormat = {
    indice: -1,
    color: 'grey',
    description: 'not found',
    type: "no type",
    sensors: {} as Sensors
  };

  const matchingSensors = sensors.filter(sensor => sensor.component === component);
  let sumIndices = 0;

  await Promise.all(matchingSensors.map(async sensor => {
    try {
      const response = await fetch(`http://192.168.1.36:8081/data/testApi_provider/${sensor.sensor}/?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        headers: HEADERS,
      });
      const data = await response.json();

      // Armazene data no tipo SensorInfo
      const sensorData: SensorInfo[] = data.observations.map((item: SensorInfo) => ({
        value: item.value,
        timestamp: item.timestamp,
        time: Number(item.time)
      }));

      const { indice, color, description, quality } = generateIndex(sensorData, sensor.type);
      if (indice) sumIndices += indice;

      const sensorType: keyof Sensors = `${sensor.type}` as keyof Sensors;
      object.sensors[sensorType] = {
        SensorInfo: sensorData,
        indice,
        color,
        description,
        quality
      };
    } catch (error) {
      console.error(`Erro na requisição para ${sensor.type}:`, error);
    }
  }));

  object.indice = sumIndices / 4;
  const { color, description } = generateColor(object.indice);
  object.color = color;
  object.description = description;
  object.type = 'Qualidade do Ar(IQAr)';

  return object;
}

async function getWaterQualityIndex(component: string, sensors: Sensor[]): Promise<ObjectFormat> {
  const object: ObjectFormat = {
    indice: -1,
    color: '#ccc',
    description: 'not found',
    type: "Qualidade da Água(IQA)",
    sensors: {} as Sensors_Water
  };

  const matchingSensors = sensors.filter(sensor => sensor.component === component);
  let sumIndices = 0;

  await Promise.all(matchingSensors.map(async sensor => {
    try {
      const response = await fetch(`http://192.168.1.36:8081/data/testApi_provider/${sensor.sensor}/?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        headers: HEADERS,
      });
      const data = await response.json();

      // Armazene data no tipo SensorInfo
      const sensorData: SensorInfo[] = data.observations.map((item: SensorInfo) => ({
        value: item.value,
        timestamp: item.timestamp,
        time: Number(item.time)
      }));

      const sensorType: keyof Sensors_Water = `${sensor.type}` as keyof Sensors_Water;
      object.sensors[sensorType] = {
        SensorInfo: sensorData,
        indice: 10,
        color: 'black',
        description: 'not found',
        quality: 'not found'
        
      };
    } catch (error) {
      console.error(`Erro na requisição para ${sensor.type}:`, error);
    }
  }));
  

  return object;
}


export { getAirQualityIndex, getWaterQualityIndex };
