const mapping: Record<string, string> = {
  astrologers: 'astrologer',
  birthcharts: 'birthchart',
  chats: 'chat',
  companies: 'company',
  readings: 'reading',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
