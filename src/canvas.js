/* eslint-disable no-console */
import { v4 } from 'uuid';
import io from 'socket.io-client';
var socket = io.connect("http://localhost:4000");

function inserted(el) {
  const canvas = el;
  const ctx = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 800;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;

  let prevPos = { offsetX: 0, offsetY: 0 };
  let line = [];
  let isPainting = false;
  const userId = v4();
  const USER_STROKE = 'red';
  const GUEST_STROKE = 'greenyellow';

  function handleMouseDown(e) {
    const { offsetX, offsetY } = e;
    isPainting = true;
    prevPos = { offsetX, offsetY };
  }
  function endPaintEvent() {
    if (isPainting) {
      isPainting = false;
      sendPaintData();
    }
  }
  function handleMouseMove(e) {
    if (isPainting) {
      const { offsetX, offsetY } = e;
      const offSetData = { offsetX, offsetY };
      const positionInfo = {
        start: { ...prevPos },
        stop: { ...offSetData },
      };
      line = line.concat(positionInfo);
      paint(prevPos, offSetData, USER_STROKE);
    }
  }
  function sendPaintData() {
    const body = {
      line,
      userId,
    };
   socket.emit("draw", JSON.stringify(body));
    
  }
  function paint(prevPosition, currPosition, strokeStyle) {
    const { offsetX, offsetY } = currPosition;
    const { offsetX: x, offsetY: y } = prevPosition;
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(x, y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    prevPos = { offsetX, offsetY };
  }
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', endPaintEvent);
  canvas.addEventListener('mouseleave', endPaintEvent); 

    socket.on('painter', (data) => {
        console.log((data.line))
        
        const { userId: id, line } = data;
        if (userId !== id) {
          line.forEach((position) => {
            paint(position.start, position.stop, GUEST_STROKE);
          });
        }
    });
}
export default {
  inserted,
};