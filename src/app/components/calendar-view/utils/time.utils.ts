import { Order } from '../../../models/order.model';

export function calculateTimePosition(date: Date, startDate: Date, endDate: Date): number {
  const totalMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
  const elapsedMinutes = (date.getTime() - startDate.getTime()) / (1000 * 60);
  return (elapsedMinutes / totalMinutes) * 100;
}

export function calculateOrderPosition(order: Order, startDate: Date, endDate: Date): {
  left: string;
  width: string;
  isOvertime: boolean;
  overtimeWidth: string;
} {
  const orderStart = new Date(order.startDate);
  const orderEnd = new Date(order.endDate);
  const now = new Date();
  
  const left = calculateTimePosition(orderStart, startDate, endDate);
  let right = calculateTimePosition(orderEnd, startDate, endDate);
  let overtimeWidth = '0%';
  let isOvertime = false;

  if (order.status === 'Over Time' && now > orderEnd) {
    const currentPosition = calculateTimePosition(now, startDate, endDate);
    if (currentPosition > right) {
      isOvertime = true;
      overtimeWidth = `${currentPosition - right}%`;
      right = currentPosition;
    }
  }
  
  return {
    left: `${Math.max(0, Math.min(100, left))}%`,
    width: `${Math.max(0, Math.min(100, right - left))}%`,
    isOvertime,
    overtimeWidth
  };
}

export function formatTime(date: Date | string): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function calculateOvertime(endDate: Date | string): number {
  const end = new Date(endDate);
  const now = new Date();
  
  if (now <= end) {
    return 0;
  }

  const overtime = now.getTime() - end.getTime();
  return Math.ceil(overtime / (1000 * 60 * 60));
}

export function formatOvertime(hours: number): string {
  if (hours < 24) {
    return `${hours}h`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return remainingHours > 0 ? 
    `${days}d ${remainingHours}h` : 
    `${days}d`;
}
