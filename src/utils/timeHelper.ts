export const isTempleOpen = (temple: any) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const getMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const morningStart = getMinutes(temple.morning_start || '00:00');
  const morningEnd = getMinutes(temple.morning_end || '00:00');
  const eveningStart = getMinutes(temple.evening_start || '00:00');
  const eveningEnd = getMinutes(temple.evening_end || '00:00');

  return (
    (currentMinutes >= morningStart && currentMinutes <= morningEnd) ||
    (currentMinutes >= eveningStart && currentMinutes <= eveningEnd)
  );
};

export const formatTime = (time: string) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};