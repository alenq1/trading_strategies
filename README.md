# Mi App Bitcoin

Esta aplicación consulta el precio del Bitcoin en Binance cada cinco segundos y calcula la media móvil exponencial de 12 periodos y el índice de fuerza relativa (RSI). Cuando el precio del Bitcoin supera por encima o por debajo de la media móvil exponencial, la aplicación envía una alerta al escritorio.

## Instalación

Para instalar las dependencias necesarias para esta aplicación, ejecuta el siguiente comando en tu terminal:

```
npm install
```

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando en tu terminal:

```
npm start
```

La aplicación comenzará a consultar el precio del Bitcoin en Binance cada cinco segundos y a calcular la media móvil exponencial y el RSI. Cuando el precio del Bitcoin supera por encima o por debajo de la media móvil exponencial, la aplicación enviará una alerta al escritorio.

## Archivos

- `src/index.js`: Punto de entrada de la aplicación.
- `src/binanceAPI.js`: Interactúa con la API de Binance.
- `src/calculators/emaCalculator.js`: Calcula la media móvil exponencial de 12 periodos.
- `src/calculators/rsiCalculator.js`: Calcula el índice de fuerza relativa (RSI).
- `src/alert/desktopAlert.js`: Envía alertas al escritorio.
- `package.json`: Archivo de configuración para npm.