import { Order } from '../../../models/order.model';

export interface TimelineRow {
  index: number;
  orders: Order[];
}

export function calculateTimelineRows(orders: Order[]): TimelineRow[] {
  const rows: TimelineRow[] = [];
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  for (const order of sortedOrders) {
    let placed = false;
    let rowIndex = 0;

    while (!placed) {
      const currentRow = rows.find(r => r.index === rowIndex);
      
      if (!currentRow) {
        rows.push({ index: rowIndex, orders: [order] });
        placed = true;
        continue;
      }

      const canPlace = !currentRow.orders.some(existingOrder => 
        ordersOverlap(order, existingOrder)
      );

      if (canPlace) {
        currentRow.orders.push(order);
        placed = true;
      } else {
        rowIndex++;
      }
    }
  }

  return rows;
}

export function ordersOverlap(a: Order, b: Order): boolean {
  const aStart = new Date(a.startDate).getTime();
  const aEnd = new Date(a.endDate).getTime();
  const bStart = new Date(b.startDate).getTime();
  const bEnd = new Date(b.endDate).getTime();

  return !(aEnd <= bStart || aStart >= bEnd);
}

export function calculatePosition(date: Date, startDate: Date, endDate: Date): string {
  const time = date.getTime();
  const start = startDate.getTime();
  const end = endDate.getTime();
  const percentage = ((time - start) / (end - start)) * 100;
  return `${Math.max(0, Math.min(100, percentage))}%`;
}

export function calculateWidth(start: Date, end: Date, timelineStart: Date, timelineEnd: Date): string {
  const startPercentage = ((start.getTime() - timelineStart.getTime()) / 
    (timelineEnd.getTime() - timelineStart.getTime())) * 100;
  const endPercentage = ((end.getTime() - timelineStart.getTime()) / 
    (timelineEnd.getTime() - timelineStart.getTime())) * 100;
  return `${Math.max(0, Math.min(100, endPercentage - startPercentage))}%`;
}

export function formatTimeRange(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
